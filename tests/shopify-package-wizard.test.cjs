// Server-rendered gallery checks. No browser, provider or network calls.
require('./setup-next-image.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = function (module, filename) {
    module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename);
  };
}

require('./setup-next-dynamic.cjs');
const Studio = require('../src/elements/business/shopify/shopify-store-studio.tsx').default;
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');

test('first visit exposes business category and all design tiers while deferring package commitment and checkout', () => {
  const html = renderToStaticMarkup(React.createElement(Studio, {copy: studioCopy, plans: studioPlans}));
  const radios = [...html.matchAll(/<input\b[^>]*type="radio"[^>]*>/g)].map(match => match[0]);
  assert.equal(radios.length, 2);
  assert.ok(radios.every(radio => /name="[^"]+-business-type"/.test(radio)));
  assert.doesNotMatch(html, /<input\b[^>]*name="[^"]+-package"/);
  assert.match(html, /id="studio-reference-library"/);
  assert.match(html, /Choose a design as your reference/);
  assert.match(html, /Business category/);
  assert.doesNotMatch(html, /What do you need\?/);
  assert.match(html, /Compare Packages/);
  assert.doesNotMatch(html, /id="studio-customise"|name="email"|name="phone"|name="brand"/);
  assert.doesNotMatch(html, /id="shopify-card-number"|id="shopify-card-expiry"|name="postalCode"/);
  assert.doesNotMatch(html, /Shortlist|Discuss your project/);
  assert.equal((html.match(/aria-current="step"/g) || []).length, 1);
});

test('design discovery has no design prices and explains universal access', () => {
  const html = renderToStaticMarkup(React.createElement(Studio, {copy: studioCopy, plans: studioPlans}));
  assert.doesNotMatch(html, /From \$|package · one-time/);
  assert.match(html, /Available with every package/);
  const checked = [...html.matchAll(/<input\b[^>]*checked=""[^>]*>/g)].map(match => match[0]);
  assert.equal(checked.length, 1, 'Only the default business type should be selected');
  assert.match(checked[0], /name="[^"]+-business-type"/);
  assert.match(checked[0], /value="products"/);
  assert.doesNotMatch(html, /<input\b[^>]*name="[^"]+-package"/);
  assert.match(html, /Available with every package/);
  assert.match(html, /not your final store/);
});

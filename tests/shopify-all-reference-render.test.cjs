// Full catalogue smoke coverage: no provider or network calls.
require('./setup-next-image.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText, filename);
const { renderToStaticMarkup } = require('react-dom/server');
const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const { studioCopy } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { referencePreviewSettings } = require('../src/lib/shopify-reference-preview.ts');

test('every reference renders desktop and mobile with valid local images and no invalid values', () => {
  const ids = new Set();
  for (const reference of studioTemplates) {
    assert.ok(!ids.has(reference.id), `Duplicate reference: ${reference.id}`);
    ids.add(reference.id);
    for (const mobile of [false, true]) {
      const { values, plan } = referencePreviewSettings(reference);
      const html = renderToStaticMarkup(React.createElement(Preview, {
        copy: studioCopy, plan, values, images: reference.images, logo: '', layout: reference.layout,
        palette: reference.palette, mobile, expanded: true, referenceId: reference.id,
      }));
      assert.doesNotMatch(html, /src="undefined"|NaN/, `${reference.id}/${mobile}`);
      assert.match(html, /<button\b/, `${reference.id} must provide working controls`);
      for (const match of html.matchAll(/\bsrc="([^"]+)"/g)) {
        const src = match[1].replaceAll('&amp;', '&');
        if (src.startsWith('/') && !src.startsWith('//')) {
          assert.ok(fs.existsSync(path.join(root, 'public', src.split(/[?#]/)[0])), `${reference.id}: missing ${src}`);
        }
      }
    }
  }
});

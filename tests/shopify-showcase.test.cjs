// Premium showcase renders: every entry points at a real design, real files and on-image hotspots.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
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
const { shopifyShowcases, getShopifyShowcase } = require('../src/content/landing/shopify-showcase-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { getThemeMinimumPackage } = require('../src/lib/shopify-theme-access.ts');

test('every showcase belongs to a design and ships its images', () => {
  const entries = Object.entries(shopifyShowcases);
  assert.ok(entries.length > 0);
  for (const [id, showcase] of entries) {
    const reference = studioTemplates.find(item => item.id === id);
    assert.ok(reference, `${id} is a design reference`);
    assert.ok(['Beginner', 'Growth', 'Level Up', 'Pro', 'Executive', 'Top Tier'].includes(getThemeMinimumPackage(reference.layout)), `${id} has a package`);
    for (const src of [showcase.src, showcase.thumb]) assert.ok(fs.existsSync(path.join(root, 'public', src)), src);
    assert.ok(showcase.alt.length > 20);
    assert.ok(showcase.hotspots.length >= 4, `${id} has hotspots`);
    for (const spot of showcase.hotspots) {
      assert.ok(spot.x >= 0 && spot.x <= 100 && spot.y >= 0 && spot.y <= 100, `${id}: ${spot.title}`);
      assert.ok(spot.title && spot.detail);
    }
  }
  assert.equal(getShopifyShowcase('not-a-design'), null);
  assert.equal(getShopifyShowcase('toString'), null);
});

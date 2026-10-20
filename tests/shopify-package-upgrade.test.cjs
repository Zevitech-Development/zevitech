// Package upgrade state transitions only. No provider, browser or network calls.
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
require.extensions['.ts'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};

const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { packageFeatureNeeds } = require('../src/content/landing/shopify-package-recommendation-content.ts');
const { planShopifyNeedsChange } = require('../src/lib/shopify-package-upgrade.ts');
const { shopifyPackageMatchesNeeds } = require('../src/lib/shopify-package-recommendation.ts');

function selection(name, productCount = '10', featureIds = []) {
  const packageIndex = studioPlans.findIndex(plan => plan.name === name);
  assert.ok(packageIndex >= 0, `Missing package: ${name}`);
  return Object.freeze({ packageIndex, productCount, featureIds: Object.freeze([...featureIds]) });
}

test('adding an already included feature preserves the explicitly selected package and price', () => {
  const current = selection('Growth');
  const result = planShopifyNeedsChange(studioPlans, current, '10', ['custom-design']);
  assert.deepEqual(result.selection, { ...current, featureIds: ['custom-design'] });
  assert.equal(result.selection.packageIndex, current.packageIndex);
  assert.equal(studioPlans[result.selection.packageIndex].price, 599);
  assert.equal(result.pending, null);
  assert.equal(result.needsReview, false);
  assert.deepEqual(current.featureIds, []);
});

test('a higher product limit stages the exact package and price difference without changing current state', () => {
  const current = selection('Beginner');
  const before = structuredClone(current);
  const result = planShopifyNeedsChange(studioPlans, current, '50', []);
  assert.equal(result.selection, current);
  assert.deepEqual(current, before);
  assert.equal(result.needsReview, false);
  assert.equal(result.pending.previousPackageIndex, current.packageIndex);
  assert.equal(studioPlans[result.pending.previousPackageIndex].name, 'Beginner');
  assert.equal(studioPlans[result.pending.previousPackageIndex].price, 249);
  assert.equal(studioPlans[result.pending.packageIndex].name, 'Growth');
  assert.equal(studioPlans[result.pending.packageIndex].price, 599);
  assert.equal(result.pending.difference, 350);
  assert.equal(result.pending.productCount, '50');
  assert.deepEqual(result.pending.featureIds, []);
});

test('cancelling a staged feature upgrade leaves the committed needs and total unchanged', () => {
  const current = selection('Growth', '50', ['custom-design']);
  const requested = Object.freeze(['custom-design', 'unique-pages']);
  const result = planShopifyNeedsChange(studioPlans, current, '50', requested);
  assert.ok(result.pending);
  assert.equal(studioPlans[result.pending.packageIndex].name, 'Executive');
  assert.equal(result.pending.difference, 1900);
  // Cancelling discards the proposal and retains the returned committed selection.
  const afterCancel = result.selection;
  assert.equal(afterCancel, current);
  assert.deepEqual(afterCancel.featureIds, ['custom-design']);
  assert.equal(afterCancel.productCount, '50');
  assert.equal(studioPlans[afterCancel.packageIndex].price, 599);
  assert.deepEqual(requested, ['custom-design', 'unique-pages']);
});

test('explicit confirmation has one complete package, product and feature selection to commit', () => {
  const current = selection('Beginner');
  const result = planShopifyNeedsChange(studioPlans, current, '250', ['unique-pages', 'unique-pages']);
  assert.ok(result.pending);
  assert.equal(result.selection, current);
  const confirmed = {
    packageIndex: result.pending.packageIndex,
    productCount: result.pending.productCount,
    featureIds: result.pending.featureIds,
  };
  assert.deepEqual(confirmed, {
    packageIndex: studioPlans.findIndex(plan => plan.name === 'Executive'),
    productCount: '250',
    featureIds: ['unique-pages'],
  });
  assert.equal(result.pending.difference, 2250);
  assert.equal(shopifyPackageMatchesNeeds(studioPlans, confirmed.packageIndex, confirmed.productCount, confirmed.featureIds), true);
  assert.deepEqual(current, selection('Beginner'));
});

test('removing requirements or reducing product setup does not silently downgrade a chosen package', () => {
  const current = selection('Executive', '250', ['unique-pages', 'custom-design']);
  const result = planShopifyNeedsChange(studioPlans, current, '10', []);
  assert.deepEqual(result.selection, {
    packageIndex: current.packageIndex,
    productCount: '10',
    featureIds: [],
  });
  assert.equal(studioPlans[result.selection.packageIndex].price, 2499);
  assert.equal(result.pending, null);
  assert.equal(result.needsReview, false);
});

test('the complete Top Tier package needs no upgrade for any advertised feature', () => {
  const current = selection('Top Tier', '500');
  const allFeatureIds = packageFeatureNeeds.map(feature => feature.id);
  const result = planShopifyNeedsChange(studioPlans, current, '500', allFeatureIds);
  assert.deepEqual(result.selection, { ...current, featureIds: allFeatureIds });
  assert.equal(result.pending, null);
  assert.equal(result.needsReview, false);
});

test('excess product counts and unknown functionality preserve the package and require review without quoting an upgrade', () => {
  const current = selection('Growth', '50', ['custom-design']);
  for (const [productCount, featureIds] of [
    ['more', ['custom-design']],
    ['501', ['custom-design']],
    ['50', ['custom-design', 'unpriced-integration']],
  ]) {
    const result = planShopifyNeedsChange(studioPlans, current, productCount, featureIds);
    assert.equal(result.selection.packageIndex, current.packageIndex);
    assert.equal(studioPlans[result.selection.packageIndex].price, 599);
    assert.equal(result.selection.productCount, productCount);
    assert.deepEqual(result.selection.featureIds, featureIds);
    assert.equal(result.pending, null);
    assert.equal(result.needsReview, true);
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, result.selection.packageIndex, result.selection.productCount, result.selection.featureIds), false);
  }
});

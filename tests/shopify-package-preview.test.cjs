// Package preview scope checks. No provider, browser or network calls.
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
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
};

const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { packageFeatureNeeds } = require('../src/content/landing/shopify-package-recommendation-content.ts');
const { comparisonCopy } = require('../src/content/landing/shopify-studio-comparison.ts');
const { packagePreviewCapabilities, packagePreviewProfiles, packagePreviewCopy } = require('../src/content/landing/shopify-package-preview-content.ts');

test('every current package has one explicit preview profile and capability record', () => {
  const names = studioPlans.map((plan) => plan.name).sort();
  assert.equal(names.length, 6);
  assert.deepEqual(Object.keys(packagePreviewProfiles).sort(), names);
  assert.deepEqual(Object.keys(packagePreviewCapabilities).sort(), names);
  for (const plan of studioPlans) {
    const profile = packagePreviewProfiles[plan.name];
    assert.ok(profile.designTitle.trim());
    assert.ok(profile.designBody.trim());
    assert.ok(profile.delivery.length);
    const listedFeatures = plan.features.join(' ').toLowerCase();
    for (const inclusion of profile.delivery) {
      assert.ok(listedFeatures.includes(inclusion.toLowerCase()), `${plan.name} promises unlisted delivery: ${inclusion}`);
    }
  }
});

test('preview capabilities agree with the feature selector memberships', () => {
  const needToCapabilities = {
    search: ['search'],
    reviews: ['reviews', 'journal'],
    currencies: ['currency'],
    'storefront-filters': ['filters'],
    filters: ['custom'],
    newsletter: ['newsletter'],
    dashboard: ['account'],
  };
  for (const need of packageFeatureNeeds) {
    for (const capability of needToCapabilities[need.id] || []) {
      for (const plan of studioPlans) {
        assert.equal(packagePreviewCapabilities[plan.name][capability], need.plans.includes(plan.name), `${plan.name}: ${capability}`);
      }
    }
  }
});

test('cart variants and newsletter demos follow the actual package listing', () => {
  for (const plan of studioPlans) {
    const scope = plan.features.join(' ');
    const expectedCart = /Custom shopping cart/i.test(scope) ? 'custom'
      : /Mini shopping cart/i.test(scope) ? 'mini' : 'full';
    assert.match(scope, /shopping cart/i, `${plan.name} must include a working cart`);
    assert.equal(packagePreviewCapabilities[plan.name].cart, expectedCart, plan.name);
    assert.equal(packagePreviewCapabilities[plan.name].newsletter, /newsletter/i.test(scope), plan.name);
  }
});

test('every advertised feature demo is supported and every supported capability can be explored', () => {
  for (const plan of studioPlans) {
    const capabilities = packagePreviewCapabilities[plan.name];
    const demos = packagePreviewProfiles[plan.name].demos;
    const expected = ['design', ...Object.entries(capabilities)
      .filter(([key, value]) => key === 'cart' ? value !== 'none' : value === true)
      .map(([key]) => key)];
    const ids = demos.map((demo) => demo.id);
    assert.equal(new Set(ids).size, ids.length, `${plan.name} repeats a demo`);
    assert.deepEqual([...ids].sort(), expected.sort(), plan.name);
    for (const demo of demos) {
      assert.ok(demo.label.trim());
      assert.ok(demo.benefit.trim());
    }
  }
});

test('higher packages retain lower shopping capabilities and all tiers have working store essentials', () => {
  assert.deepEqual(packagePreviewProfiles.Beginner.demos.map((demo) => demo.id), ['design', 'cart', 'search']);
  assert.equal(packagePreviewCapabilities.Growth.cart, 'mini');
  for (let index = 0; index < studioPlans.length; index++) {
    const current = packagePreviewCapabilities[studioPlans[index].name];
    assert.notEqual(current.cart, 'none');
    assert.equal(current.search, true);
    if (index > 0) {
      const previous = packagePreviewCapabilities[studioPlans[index - 1].name];
      for (const [key, value] of Object.entries(previous)) {
        if (value === true) assert.equal(current[key], true, `${studioPlans[index].name} lost ${key}`);
      }
    }
  }
  assert.ok(Object.values(packagePreviewCapabilities['Top Tier']).every(value => value === true || value === 'custom'));
});

test('comparison matches inherited payment work while sample integrations remain disconnected', () => {
  const topTier = studioPlans.findIndex((plan) => plan.name === 'Top Tier');
  const paymentRow = comparisonCopy.rows.find((row) => row.label === 'Cart & payments');
  assert.equal(paymentRow.values[topTier], 'Custom cart & multiple payment integrations');
  assert.ok(packageFeatureNeeds.find((need) => need.id === 'payment').plans.includes('Top Tier'));
  assert.match(comparisonCopy.note, /Shopify subscriptions.*separate/);
  assert.match(comparisonCopy.note, /plan, provider, region and app compatibility/);
  assert.match(packagePreviewCopy.sampleNote, /sample data/i);
  assert.match(packagePreviewCopy.sampleNote, /only the listed package scope/i);
  assert.match(packagePreviewCopy.sampleNote, /not connected/i);
});

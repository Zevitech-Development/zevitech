// Local package-scope regression tests. No provider, browser or network calls.
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

const { findMatchingShopifyPackage, shopifyPackageMatchesNeeds, getShopifyPackageMatchCoverage } = require('../src/lib/shopify-package-recommendation.ts');
const { packageFeatureNeeds, packageFeatureNeedGroups } = require('../src/content/landing/shopify-package-recommendation-content.ts');
const { shopifyCapabilityStartingPackage } = require('../src/content/landing/shopify-package-catalog.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
function recommendation(count, featureIds = [], plans = studioPlans) {
  const selected = findMatchingShopifyPackage(plans, count, featureIds);
  return selected === null ? null : plans[selected].name;
}

test('product setup recommends the lowest-priced plan at each real package boundary', () => {
  for (const [count, expected] of [
    ['1', 'Beginner'], ['10', 'Beginner'], ['11', 'Growth'], ['50', 'Growth'],
    ['51', 'Level Up'], ['75', 'Level Up'], ['76', 'Pro'], ['125', 'Pro'],
    ['126', 'Executive'], ['250', 'Executive'], ['251', 'Top Tier'], ['500', 'Top Tier'],
  ]) {
    assert.equal(recommendation(count), expected, `Incorrect package for ${count} products`);
    const selected = findMatchingShopifyPackage(studioPlans, count, []);
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, selected, count, []), true);
  }
});

test('feature recommendations select the first tier that includes the cumulative capability', () => {
  for (const [features, expected] of [
    [['payment'], 'Beginner'], [['search'], 'Beginner'], [['reviews'], 'Pro'],
    [['currencies'], 'Executive'], [['filters'], 'Top Tier'], [['dashboard'], 'Top Tier'],
    [['payment', 'search', 'reviews'], 'Pro'], [['payment', 'reviews', 'currencies'], 'Executive'],
    [['filters', 'dashboard'], 'Top Tier'],
    [['marketing-automation'], 'Growth'], [['storefront-filters'], 'Level Up'],
    [['recommendations'], 'Level Up'], [['analytics'], 'Level Up'],
    [['workflow-automation'], 'Pro'], [['app-integration'], 'Pro'], [['bundles'], 'Pro'],
    [['advanced-integrations'], 'Executive'],
  ]) {
    assert.equal(recommendation('10', features), expected, features.join(', '));
  }
  for (const need of packageFeatureNeeds) {
    const first = studioPlans.findIndex(plan => plan.name === shopifyCapabilityStartingPackage[need.id]);
    for (let index = 0; index < studioPlans.length; index++) {
      assert.equal(shopifyPackageMatchesNeeds(studioPlans, index, '10', [need.id]), index >= first, `${studioPlans[index].name}: ${need.id}`);
    }
  }
});

test('feature needs and product setup must fit the same single package', () => {
  assert.equal(recommendation('75', ['reviews']), 'Pro');
  assert.equal(recommendation('250', ['reviews']), 'Executive');
  assert.equal(recommendation('500', ['filters']), 'Top Tier');
  assert.equal(recommendation('250', ['search']), 'Executive');
  assert.equal(recommendation('500', ['reviews']), 'Top Tier');
  for (const [combination, expected] of [
    [['reviews', 'filters'], 'Top Tier'], [['payment', 'filters'], 'Top Tier'],
    [['search', 'currencies'], 'Executive'], [['dashboard', 'reviews'], 'Top Tier'],
  ]) assert.equal(recommendation('10', combination), expected, combination.join(', '));
});

test('campaign, promotion and product-information needs start at their published package boundaries', () => {
  for (const [featureId, expectedPackage] of [
    ['campaign-page', 'Pro'],
    ['promotional-banners', 'Pro'],
    ['product-specifications', 'Executive'],
    ['product-comparison', 'Top Tier'],
  ]) {
    const first = studioPlans.findIndex(plan => plan.name === expectedPackage);
    assert.equal(recommendation('1', [featureId]), expectedPackage, featureId);
    assert.equal(shopifyCapabilityStartingPackage[featureId], expectedPackage, featureId);
    const need = packageFeatureNeeds.find(item => item.id === featureId);
    assert.ok(need, `Missing selectable need: ${featureId}`);
    assert.ok(!need.isThemeAccess, `${featureId} must remain a selectable feature`);
    assert.deepEqual(need.plans, studioPlans.slice(first).map(plan => plan.name));
    for (let index = 0; index < studioPlans.length; index++) {
      assert.equal(shopifyPackageMatchesNeeds(studioPlans, index, '1', [featureId]), index >= first, `${studioPlans[index].name}: ${featureId}`);
    }
  }
});

test('new feature choices share one package and still respect the selected design and product count', () => {
  for (const [productCount, features, expectedPackage, expectedPrice] of [
    ['10', ['campaign-page', 'promotional-banners'], 'Pro', 1499],
    ['10', ['reviews', 'campaign-page', 'promotional-banners', 'newsletter'], 'Pro', 1499],
    ['250', ['campaign-page', 'promotional-banners'], 'Executive', 2499],
    ['10', ['campaign-page', 'theme-executive'], 'Executive', 2499],
    ['10', ['product-specifications', 'theme-top-tier'], 'Top Tier', 4999],
    ['500', ['product-specifications'], 'Top Tier', 4999],
    ['10', ['campaign-page', 'promotional-banners', 'product-specifications', 'product-comparison'], 'Top Tier', 4999],
  ]) {
    const index = findMatchingShopifyPackage(studioPlans, productCount, features);
    assert.notEqual(index, null, features.join(', '));
    assert.equal(studioPlans[index].name, expectedPackage);
    assert.equal(studioPlans[index].price, expectedPrice);
  }
  assert.equal(recommendation('more', ['campaign-page']), null);
  assert.equal(recommendation('10', ['product-comparison', 'unpriced-request']), null);
});

test('a small catalogue still receives the package required for design and team needs', () => {
  for (const [features, expected] of [
    [['custom-design'], 'Growth'],
    [['unique-pages'], 'Executive'],
    [['custom-code'], 'Top Tier'],
    [['custom-logos'], 'Executive'],
    [['project-manager'], 'Executive'],
    [['languages'], 'Executive'],
    [['newsletter'], 'Growth'],
    [['custom-design', 'payment', 'reviews'], 'Pro'],
    [['custom-design', 'unique-pages', 'custom-logos', 'project-manager'], 'Executive'],
    [['custom-design', 'custom-code', 'languages', 'dashboard', 'newsletter'], 'Top Tier'],
  ]) {
    assert.equal(recommendation('1', features), expected, features.join(', '));
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, 0, '1', features), false);
  }
  assert.equal(recommendation('50', ['custom-design']), 'Growth');
  assert.equal(recommendation('51', ['custom-design']), 'Level Up');
  assert.equal(recommendation('500', ['custom-design']), 'Top Tier');
  assert.equal(recommendation('251', ['newsletter']), 'Top Tier');
});

test('design and advanced selections combine through cumulative scope', () => {
  for (const [features, expected] of [
    [['unique-pages', 'custom-code'], 'Top Tier'], [['custom-logos', 'languages'], 'Executive'],
    [['project-manager', 'dashboard'], 'Top Tier'], [['currencies', 'languages'], 'Executive'],
    [['search', 'newsletter'], 'Growth'],
  ]) assert.equal(recommendation('10', features), expected, features.join(', '));
  for (const id of ['unique-pages', 'custom-logos', 'project-manager']) {
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, 5, '10', [id]), true);
    assert.equal(recommendation('251', [id]), 'Top Tier');
  }
  assert.equal(recommendation('10', ['custom-design', 'unknown']), null);
});

test('the catalog preserves prices and product limits with cumulative capabilities and non-additive setup totals', () => {
  assert.deepEqual(studioPlans.map(plan => plan.price), [249, 599, 999, 1499, 2499, 4999]);
  assert.deepEqual(studioPlans.map(plan => plan.products), [10, 50, 75, 125, 250, 500]);
  assert.deepEqual(studioPlans.map(plan => plan.setupLimits.flowWorkflows), [0, 0, 0, 2, 3, 5]);
  assert.deepEqual(studioPlans.map(plan => plan.setupLimits.appIntegrations), [0, 0, 0, 1, 2, 3]);
  for (let index = 0; index < studioPlans.length; index++) {
    const plan = studioPlans[index];
    assert.equal(plan.inheritedFrom, index === 0 ? null : studioPlans[index - 1].name);
    assert.ok(plan.additions.length);
    assert.ok(plan.features.includes('Unlimited revisions'));
    assert.ok(plan.features.some(feature => /Responsive/.test(feature)));
    assert.equal(plan.features.filter(feature => /shopping cart/i.test(feature)).length, 1);
    assert.equal(plan.features.filter(feature => /Shopify Flow workflows/.test(feature)).length, plan.setupLimits.flowWorkflows > 0 ? 1 : 0);
    assert.equal(plan.features.filter(feature => /third-party app integration/.test(feature)).length, plan.setupLimits.appIntegrations > 0 ? 1 : 0);
    assert.equal(plan.features.filter(feature => /Multiple languages/.test(feature)).length, plan.setupLimits.additionalLanguages > 0 ? 1 : 0);
    assert.equal(plan.features.filter(feature => /email automation/.test(feature)).length, plan.setupLimits.emailAutomations > 0 ? 1 : 0);
    if (index > 0) {
      for (const id of studioPlans[index - 1].capabilityIds) assert.ok(plan.capabilityIds.includes(id), `${plan.name} lost ${id}`);
      for (const [key, value] of Object.entries(studioPlans[index - 1].setupLimits)) assert.ok(plan.setupLimits[key] >= value, `${plan.name} reduced ${key}`);
    }
  }
  assert.equal(recommendation('500', packageFeatureNeeds.map(need => need.id)), 'Top Tier');
});

test('requirement choices stay grouped, bounded and tied to published package features', () => {
  assert.equal(packageFeatureNeeds.length, Object.keys(shopifyCapabilityStartingPackage).length);
  assert.ok(packageFeatureNeeds.length <= 31);
  assert.equal(new Set(packageFeatureNeeds.map(item => item.id)).size, packageFeatureNeeds.length);
  const groups = new Set(packageFeatureNeedGroups.map(group => group.id));
  for (const need of packageFeatureNeeds) {
    assert.ok(groups.has(need.group), `Unknown group for ${need.id}`);
    assert.ok(need.hint.trim(), `Missing hint for ${need.id}`);
    assert.ok(need.plans.every(name => studioPlans.some(plan => plan.name === name)), need.id);
  }
  for (const group of groups) assert.ok(packageFeatureNeeds.some(need => need.group === group));

  const scopeEvidence = {
    'custom-design': /Customised design|unique designs|Custom design/,
    'unique-pages': /Unlimited pages with unique designs/,
    'custom-code': /Custom code/,
    'logo-design': /Custom logo design: \d+ concepts? for one final logo/,
    'custom-logos': /Custom logo design: [56] concepts for one final logo/,
    'project-manager': /project manager/,
    languages: /Multiple languages/,
    newsletter: /newsletter/i,
    'campaign-page': /1 campaign landing-page setup/,
    'promotional-banners': /5 promotional banners|Unlimited banners/,
    'product-specifications': /Metafield setup for up to 5 reusable product attributes/,
    'product-comparison': /1 custom product comparison or enquiry flow scoped before build/,
  };
  for (const [id, evidence] of Object.entries(scopeEvidence)) {
    const need = packageFeatureNeeds.find(item => item.id === id);
    const publishedPlans = studioPlans.filter(plan => plan.features.some(feature => evidence.test(feature))).map(plan => plan.name);
    assert.deepEqual([...need.plans], publishedPlans, `${id} differs from published scope`);
  }
});

test('all six packages include increasing logo concept allowances without changing prices or legacy scope', () => {
  assert.deepEqual(studioPlans.map(plan => plan.price), [249, 599, 999, 1499, 2499, 4999]);
  assert.deepEqual(studioPlans.map(plan => plan.logoConcepts), [1, 2, 3, 4, 5, 6]);
  for (const [index, plan] of studioPlans.entries()) {
    const concepts = plan.features.filter(feature => feature.startsWith('Custom logo design:'));
    assert.deepEqual(concepts, [`Custom logo design: ${index + 1} ${index === 0 ? 'concept' : 'concepts'} for one final logo`]);
    assert.ok(plan.features.includes('One chosen final logo delivered in PNG and SVG'));
    assert.ok(plan.features.includes('Unlimited revisions'));
    assert.ok(plan.features.includes('Unlimited revisions within the agreed logo direction and launch scope'));
    assert.ok(plan.capabilityIds.includes('logo-design'));
  }
  assert.equal(recommendation('10', ['logo-design']), 'Beginner');
  assert.equal(recommendation('10', ['custom-logos']), 'Executive');
  assert.equal(recommendation('10', ['logo-design', 'custom-logos']), 'Executive');
});

test('theme access is explicit, cumulative and distinct from ordinary feature upgrades', () => {
  const themeNeeds = packageFeatureNeeds.filter(need => need.isThemeAccess);
  assert.deepEqual(themeNeeds.map(need => need.id), [
    'theme-growth', 'theme-level-up', 'theme-pro', 'theme-executive', 'theme-top-tier',
  ]);
  for (const [offset, need] of themeNeeds.entries()) {
    assert.equal(need.group, 'design');
    assert.equal(recommendation('10', [need.id]), studioPlans[offset + 1].name);
    assert.deepEqual(need.plans, studioPlans.slice(offset + 1).map(plan => plan.name));
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, offset, '10', [need.id]), false);
  }
  assert.ok(!packageFeatureNeeds.find(need => need.id === 'custom-design').isThemeAccess);
});

test('coverage explains matching, missing and unknown needs without double counting', () => {
  assert.deepEqual(getShopifyPackageMatchCoverage(studioPlans, 1, '10', ['custom-design', 'custom-design', 'unique-pages', 'unknown']), {
    matches: false,
    productsMatch: true,
    matchedFeatureIds: ['custom-design'],
    unmatchedFeatureIds: ['unique-pages'],
    unknownFeatureIds: ['unknown'],
  });
  const insufficientProducts = getShopifyPackageMatchCoverage(studioPlans, 1, '75', ['custom-design']);
  assert.equal(insufficientProducts.productsMatch, false);
  assert.deepEqual(insufficientProducts.matchedFeatureIds, ['custom-design']);
  assert.equal(insufficientProducts.matches, false);
  assert.equal(getShopifyPackageMatchCoverage(studioPlans, 4, '10', ['unique-pages', 'project-manager']).matches, true);
  assert.deepEqual(getShopifyPackageMatchCoverage(studioPlans, -1, '10', ['custom-design']), {
    matches: false,
    productsMatch: false,
    matchedFeatureIds: [],
    unmatchedFeatureIds: ['custom-design'],
    unknownFeatureIds: [],
  });
});

test('recommendation compares prices and retains correct feature scope after reordering cards', () => {
  const reversed = structuredClone(studioPlans).reverse();
  assert.equal(recommendation('10', [], reversed), 'Beginner');
  assert.equal(recommendation('50', [], reversed), 'Growth');
  assert.equal(recommendation('75', ['payment', 'search'], reversed), 'Level Up');
  assert.equal(recommendation('10', ['reviews'], reversed), 'Pro');
  assert.equal(recommendation('10', ['filters'], reversed), 'Top Tier');
  const changedPrices = structuredClone(studioPlans);
  changedPrices[1].price = 200;
  assert.equal(recommendation('10', [], changedPrices), 'Growth');
});

test('invalid counts cannot match a package through number coercion', () => {
  for (const count of ['', ' ', '0', '-1', 'NaN', 'Infinity', '-Infinity', '1.5', '1e2', '0x10', '9007199254740992', undefined, null]) {
    assert.equal(findMatchingShopifyPackage(studioPlans, count, []), null, `Accepted ${String(count)}`);
    for (let index = 0; index < studioPlans.length; index++) {
      assert.equal(shopifyPackageMatchesNeeds(studioPlans, index, count, []), false, `Accepted ${String(count)} for ${index}`);
    }
  }
  assert.equal(recommendation(' 50 '), 'Growth');
});

test('custom scope, unknown feature IDs and excessive catalogue sizes require review', () => {
  for (const count of ['more', '501', 'unknown']) assert.equal(recommendation(count), null);
  for (const features of [['unknown'], ['custom-integration'], ['payment', 'unknown'], ['']]) {
    assert.equal(recommendation('10', features), null);
    assert.equal(studioPlans.some((_, index) => shopifyPackageMatchesNeeds(studioPlans, index, '10', features)), false);
  }
  assert.equal(recommendation('10', ['reviews', 'reviews']), 'Pro');
});

test('selected package validation rejects invalid indices and malformed plan records', () => {
  for (const index of [-1, 0.5, studioPlans.length, NaN, Infinity]) {
    assert.equal(shopifyPackageMatchesNeeds(studioPlans, index, '10', []), false);
  }
  assert.equal(findMatchingShopifyPackage([], '10', []), null);
  for (const patch of [{ name: 'Unlisted plan' }, { price: 0 }, { price: -1 }, { price: NaN }, { price: Infinity }, { products: 0 }, { products: NaN }, { products: Infinity }, { products: 10.5 }]) {
    const malformed = [{ ...studioPlans[0], ...patch }];
    assert.equal(findMatchingShopifyPackage(malformed, '10', []), null);
    assert.equal(shopifyPackageMatchesNeeds(malformed, 0, '10', []), false);
  }
});

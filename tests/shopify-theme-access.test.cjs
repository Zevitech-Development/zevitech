// Theme catalogue and package access checks. No browser or network calls.
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
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};

const { studioTemplates, templateCopy } = require('../src/content/landing/shopify-studio-templates.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { shopifyProductCategories, shopifyServiceCategories } = require('../src/content/landing/shopify-business-categories.ts');
const { themeTiers } = require('../src/content/landing/shopify-theme-tier-content.ts');
const { getThemeMinimumPackage, canUseThemeLayout, getThemeTierByPackage, getThemeLayoutFromLabel } = require('../src/lib/shopify-theme-access.ts');

test('every category offers eight distinct theme directions with preserved original reference IDs', () => {
  const originalCategoryIds = ['atelier', 'ritual', 'pulse', 'haven', 'form', 'market', 'aurelia', 'pantry', 'companion'];
  const originalIds = [
    ['editorial', 'spotlight', 'boutique'],
    ['dimensional', 'parallax'],
    ['campaign', 'cinematic', 'commerce-studio'],
  ].flatMap(styles => originalCategoryIds.flatMap(id => styles.map(style => `${id}-${style}`)));
  const expectedCategories = [...shopifyProductCategories, ...shopifyServiceCategories];
  assert.equal(studioTemplates.length, expectedCategories.length * 8 + 5);
  assert.deepEqual(studioTemplates.slice(0, originalIds.length).map(template => template.id), originalIds);
  assert.equal(new Set(studioTemplates.map(template => template.id)).size, studioTemplates.length);
  const categories = [...new Set(studioTemplates.map(template => template.category))];
  assert.deepEqual(categories, expectedCategories);
  for (const category of categories) {
    const templates = studioTemplates.filter(template => template.category === category && !template.conceptImage && !template.signatureTheme);
    assert.equal(templates.length, 8, category);
    assert.equal(new Set(templates.map(template => template.description)).size, 8, category);
    assert.deepEqual(templates.map(template => template.layout).sort((left, right) => left - right), [0, 2, 3, 4, 6, 7, 8, 9]);
    for (const template of templates) {
      assert.match(template.id, /^[a-z]+(?:-[a-z]+)+$/);
      assert.equal(template.minPackage, getThemeMinimumPackage(template.layout), template.id);
      assert.equal(canUseThemeLayout(template.minPackage, template.layout), true, template.id);
      assert.ok(template.images.length > 0, template.id);
    }
  }
});

test('minimum theme packages cover every supported layout, including saved fallback layouts', () => {
  const minimumByLayout = [
    'Beginner', 'Beginner', 'Growth', 'Level Up', 'Pro',
    'Level Up', 'Executive', 'Executive', 'Top Tier', 'Top Tier',
  ];
  assert.equal(templateCopy.layoutNames.length, minimumByLayout.length);
  assert.equal(templateCopy.layoutNames[8], 'Cinematic experience');
  assert.equal(templateCopy.layoutNames[9], 'Commerce Studio');
  for (let layout = 0; layout < minimumByLayout.length; layout++) {
    assert.equal(getThemeMinimumPackage(layout), minimumByLayout[layout], `Layout ${layout}`);
    const minimumIndex = themeTiers.findIndex(tier => tier.packageName === minimumByLayout[layout]);
    for (let index = 0; index < themeTiers.length; index++) {
      assert.equal(canUseThemeLayout(themeTiers[index].packageName, layout), index >= minimumIndex, `${themeTiers[index].packageName}: layout ${layout}`);
    }
  }
});

test('theme tiers follow existing ascending package prices and retain stable requirement IDs', () => {
  const orderedPlans = [...studioPlans].sort((left, right) => left.price - right.price);
  assert.deepEqual(themeTiers.map(tier => tier.packageName), orderedPlans.map(plan => plan.name));
  assert.deepEqual(themeTiers.map(tier => tier.requirementId), [
    null, 'theme-growth', 'theme-level-up', 'theme-pro', 'theme-executive', 'theme-top-tier',
  ]);
  for (const tier of themeTiers) {
    assert.equal(getThemeTierByPackage(tier.packageName), tier);
    assert.equal(new Set(tier.layouts).size, tier.layouts.length);
    assert.ok(tier.label && tier.description && tier.customization);
  }
});

test('customisation starts with a fixed layout and adds cumulative capabilities at each package', () => {
  const beginner = getThemeTierByPackage('Beginner').capabilities;
  assert.deepEqual(Object.entries(beginner).filter(([, enabled]) => enabled).map(([key]) => key).sort(), ['logo', 'presetPalette', 'productImages']);
  assert.equal(beginner.layoutSelection, false);
  assert.equal(beginner.customPalette, false);
  assert.equal(getThemeTierByPackage('Growth').capabilities.customPalette, true);
  assert.equal(getThemeTierByPackage('Level Up').capabilities.layoutSelection, true);
  assert.equal(getThemeTierByPackage('Pro').capabilities.customSections, true);
  assert.equal(getThemeTierByPackage('Executive').capabilities.motionControls, true);
  assert.equal(getThemeTierByPackage('Top Tier').capabilities.advancedCommerce, true);
  for (let index = 1; index < themeTiers.length; index++) {
    const previous = themeTiers[index - 1];
    const current = themeTiers[index];
    for (const layout of previous.layouts) assert.ok(current.layouts.includes(layout));
    for (const [capability, enabled] of Object.entries(previous.capabilities)) {
      if (enabled) assert.equal(current.capabilities[capability], true, `${current.packageName} lost ${capability}`);
    }
    assert.ok(Object.keys(current.capabilities).some(key => current.capabilities[key] && !previous.capabilities[key]), `${current.packageName} adds no customisation`);
  }
});

test('invalid layouts and unrecognized packages never receive theme access', () => {
  for (const layout of [-1, 0.5, 10, 99, NaN, Infinity, -Infinity, '0', null, undefined]) {
    assert.equal(getThemeMinimumPackage(layout), '', String(layout));
    for (const tier of themeTiers) assert.equal(canUseThemeLayout(tier.packageName, layout), false);
  }
  for (const packageName of ['', 'beginner', 'Unknown', 'Top Tier ', null, undefined]) {
    assert.equal(getThemeTierByPackage(packageName), null);
    for (let layout = 0; layout < templateCopy.layoutNames.length; layout++) {
      assert.equal(canUseThemeLayout(packageName, layout), false);
    }
  }
});

test('the two original portfolio concepts retain stable indices and require Top Tier access', () => {
  const concepts = studioTemplates.filter(reference => reference.conceptImage);
  assert.deepEqual(concepts.map(reference => reference.id), ['clotya-fashion-premium', 'ecolife-organic-premium']);
  const coreCount = [...shopifyProductCategories, ...shopifyServiceCategories].length * 8;
  assert.deepEqual(studioTemplates.slice(coreCount, coreCount + 2), concepts);
  assert.deepEqual(concepts.map(reference => reference.category), ['Fashion', 'Food & drink']);
  for (const reference of concepts) {
    assert.equal(reference.minPackage, 'Top Tier');
    assert.equal(getThemeMinimumPackage(reference.layout), 'Top Tier');
    assert.equal(getThemeLayoutFromLabel(reference.name), reference.layout);
    assert.equal(getThemeLayoutFromLabel(reference.id), reference.layout);
    assert.ok(reference.conceptImage.width > 0 && reference.conceptImage.height > reference.conceptImage.width);
    assert.ok(reference.images.every(src => src !== reference.conceptImage.src), 'Artwork must never be used as a product photo');
    for (const plan of studioPlans) {
      assert.equal(canUseThemeLayout(plan.name, reference.layout), plan.name === 'Top Tier', `${plan.name}: ${reference.id}`);
    }
  }
  assert.deepEqual(studioPlans.map(plan => plan.price), [249, 599, 999, 1499, 2499, 4999]);
});

test('beauty, living and technology signatures are appended exclusively to the $4,999 Top Tier', () => {
  const exclusive = studioTemplates.slice(-3);
  assert.deepEqual(exclusive.map(reference => reference.id), ['ritual-beauty-premium', 'forme-living-premium', 'pulse-audio-premium']);
  assert.deepEqual(exclusive.map(reference => reference.category), ['Beauty', 'Home', 'Technology']);
  for (const reference of exclusive) {
    assert.equal(reference.minPackage, 'Top Tier');
    assert.equal(reference.layout, 8);
    assert.equal(getThemeMinimumPackage(reference.layout), 'Top Tier');
    assert.equal(getThemeLayoutFromLabel(reference.name), 8);
    assert.equal(getThemeLayoutFromLabel(reference.id), 8);
    assert.ok(reference.signatureTheme);
    assert.ok(reference.images.length >= 6);
    for (const plan of studioPlans) assert.equal(canUseThemeLayout(plan.name, reference.layout), plan.name === 'Top Tier', `${plan.name}: ${reference.id}`);
  }
  assert.equal(studioPlans.find(plan => plan.name === 'Top Tier').price, 4999);
});

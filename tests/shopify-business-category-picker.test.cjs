// Controlled category selection, local reference coverage, and accessible SSR.
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

const Picker = require('../src/elements/business/shopify/shopify-business-category-picker.tsx').default;
const StudioSelect = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const {
  SHOPIFY_CUSTOM_CATEGORY, shopifyBusinessTypeOptions, shopifyProductCategories,
  shopifyServiceCategories, getShopifyBusinessCategoryOptions, resolveCategoryReference,
} = require('../src/content/landing/shopify-business-categories.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');

function harness(initial = {}) {
  const calls = [];
  const props = {
    businessType: 'products', category: 'Fashion', customCategory: '',
    onChange: (businessType, category, customCategory) => {
      calls.push({ businessType, category, customCategory });
      Object.assign(props, { businessType, category, customCategory });
    },
    ...initial,
  };
  const tree = () => {
    const original = React.useId;
    React.useId = () => 'category-test';
    try { return Picker(props); } finally { React.useId = original; }
  };
  const nodes = value => Array.isArray(value) ? value.flatMap(nodes)
    : React.isValidElement(value) ? [value, ...nodes(value.props.children)] : [];
  const find = predicate => {
    const node = nodes(tree()).find(predicate);
    assert.ok(node, 'expected picker control');
    return node;
  };
  return {
    calls, props,
    markup: () => renderToStaticMarkup(tree()),
    businessType: value => find(n => n.type === 'input' && n.props.type === 'radio' && n.props.value === value).props.onChange(),
    category: value => find(n => n.type === StudioSelect).props.onChange({ target: { value } }),
    custom: value => find(n => n.type === 'input' && n.props.type === 'text').props.onChange({ target: { value } }),
  };
}

test('category options resolve to eight core references and complete premium catalogues', () => {
  assert.deepEqual(shopifyBusinessTypeOptions.map(option => option.value), ['products', 'services', 'both']);
  assert.ok(shopifyProductCategories.length >= 12);
  assert.ok(shopifyServiceCategories.length >= 6);
  for (const businessType of ['products', 'services', 'both']) {
    const options = getShopifyBusinessCategoryOptions(businessType);
    assert.equal(options.at(-1), SHOPIFY_CUSTOM_CATEGORY);
    assert.equal(new Set(options).size, options.length);
    for (const category of options) {
      const resolved = resolveCategoryReference(category, businessType);
      const references = studioTemplates.filter(reference => reference.category === resolved);
      assert.equal(references.filter(reference => !reference.conceptImage && !reference.signatureTheme).length, 8, `${businessType}: ${category}`);
      for (const reference of references) {
        assert.equal(reference.businessType, shopifyServiceCategories.includes(resolved) ? 'services' : 'products');
        if (reference.conceptImage || reference.signatureTheme) assert.ok(reference.images.length >= 6, 'Premium references retain a complete product catalogue');
        else assert.equal(reference.images.length, 3);
        for (const image of reference.images) assert.ok(fs.existsSync(path.join(root, 'public', image)), image);
      }
    }
  }
  assert.equal(resolveCategoryReference(SHOPIFY_CUSTOM_CATEGORY, 'products'), 'General');
  assert.equal(resolveCategoryReference(SHOPIFY_CUSTOM_CATEGORY, 'both'), 'General');
  assert.equal(resolveCategoryReference(SHOPIFY_CUSTOM_CATEGORY, 'services'), 'Services');
  assert.equal(resolveCategoryReference('Fashion', 'services'), 'Services');
  assert.equal(resolveCategoryReference('Professional services', 'products'), 'General');
});

test('picker renders labeled native controls and does not commit choices on render', () => {
  const picker = harness();
  const html = picker.markup();
  assert.equal(picker.calls.length, 0);
  assert.equal((html.match(/type="radio"/g) || []).length, 3);
  assert.match(html, /<fieldset><legend/);
  assert.match(html, /Product business/);
  assert.match(html, /Service business/);
  assert.match(html, /<label[^>]*for="category-test-category"/);
  assert.match(html, /<select[^>]*aria-describedby="category-test-category-hint"/);
  assert.doesNotMatch(html, /type="text"/);
  assert.doesNotMatch(html, /<option[^>]*>Professional services/);
});

test('requested service industries are selectable with category-specific offers and all package reference tiers', () => {
  const { getShopifyServiceCategory } = require('../src/content/landing/shopify-service-preview-content.ts');
  const requested = {
    Spas: 'Massage treatments',
    Salons: 'Cut & finish',
    Plumbing: 'Leak & fixture repairs',
    'Home cleaning': 'Regular home cleaning',
    'Truck dispatching': 'Owner-operator dispatch',
    'Expert & consulting services': 'Expert consultation',
    HVAC: 'Air conditioning service',
  };
  const picker = harness({ businessType: 'services', category: 'Services' });
  for (const [category, offer] of Object.entries(requested)) {
    picker.category(category);
    assert.equal(picker.props.category, category);
    assert.equal(resolveCategoryReference(category, 'services'), category);
    assert.ok(getShopifyServiceCategory(category).offers.some(item => item.title === offer));
    const refs = studioTemplates.filter(item => item.category === category);
    assert.equal(refs.length, 8);
    assert.deepEqual(refs.map(item => item.layout).sort((a, b) => a - b), [0, 2, 3, 4, 6, 7, 8, 9]);
  }
});

test('switching business type preserves compatible categories and selects a valid category otherwise', () => {
  const picker = harness();
  picker.businessType('services');
  assert.equal(picker.props.category, shopifyServiceCategories[0]);
  picker.category('Fitness services');
  picker.businessType('both');
  assert.equal(picker.props.category, 'Fitness services');
  picker.category('Accessories');
  picker.businessType('products');
  assert.equal(picker.props.category, 'Accessories');
  assert.equal(picker.calls.length, 5);
  assert.doesNotMatch(picker.markup(), /<option[^>]*>Fitness services/);
});

test('custom category stays controlled, keeps text across category switches, and caps input at eighty characters', () => {
  const picker = harness();
  picker.category(SHOPIFY_CUSTOM_CATEGORY);
  const html = picker.markup();
  assert.match(html, /<label[^>]*for="category-test-custom-category"/);
  assert.match(html, /<input[^>]*maxLength="80"[^>]*required=""/);
  picker.custom('Mobile pet grooming');
  assert.equal(picker.props.customCategory, 'Mobile pet grooming');
  picker.category('Pets');
  assert.doesNotMatch(picker.markup(), /type="text"/);
  picker.category(SHOPIFY_CUSTOM_CATEGORY);
  assert.match(picker.markup(), /value="Mobile pet grooming"/);
  picker.businessType('services');
  assert.equal(picker.props.category, SHOPIFY_CUSTOM_CATEGORY);
  assert.equal(picker.props.customCategory, 'Mobile pet grooming');
  assert.equal(resolveCategoryReference(picker.props.category, picker.props.businessType), 'Services');
  picker.custom('x'.repeat(100));
  assert.equal(picker.props.customCategory.length, 80);
});

// Optional upgrade presentation and real selection handler. No browser or network.
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

const NextTier = require('../src/elements/business/shopify/shopify-package-next-tier.tsx').default;
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');

function props(overrides = {}) {
  return {
    plans: studioPlans,
    packageIndex: 0,
    productCount: '10',
    featureIds: [],
    onSelect: () => assert.fail('Rendering an optional upgrade must not choose it'),
    ...overrides,
  };
}

function render(overrides = {}) {
  return renderToStaticMarkup(React.createElement(NextTier, props(overrides)));
}

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!React.isValidElement(value)) return [];
  return [value, ...nodes(value.props.children)];
}

test('each eligible tier offers one adjacent upgrade with full total, exact difference, three benefits and delivery', () => {
  for (const [packageIndex, nextName, total, difference, delivery] of [
    [0, 'Growth', '$599', '$350', '3–7 working days'],
    [1, 'Level Up', '$999', '$400', '3–7 working days'],
    [2, 'Pro', '$1,499', '$500', '3–7 working days'],
    [3, 'Executive', '$2,499', '$1,000', '7 working days'],
    [4, 'Top Tier', '$4,999', '$2,500', 'Up to 2 working weeks'],
  ]) {
    const current = studioPlans[packageIndex];
    const markup = render({ packageIndex });
    assert.ok(markup.includes(`aria-label="Optional upgrade: ${nextName}"`), current.name);
    assert.ok(markup.includes(`Everything in ${current.name}, plus:`), current.name);
    assert.match(markup, /New package total · USD/);
    assert.ok(markup.includes(`>${total}</p>`), `${nextName} total`);
    assert.ok(markup.includes(`${difference} more than ${current.name} in the full package price`), `${nextName} difference`);
    assert.ok(markup.includes(`Choose ${nextName}`), `${nextName} action`);
    assert.equal((markup.match(/<button\b/g) ?? []).length, 1);
    assert.equal((markup.match(/<li\b/g) ?? []).length, 3);
    assert.ok(markup.includes(delivery), `${nextName} delivery`);
    assert.match(markup, /Your current package already covers your selections/);
    assert.doesNotMatch(markup, /name="email"|name="phone"|role="dialog"|type="radio"/);
  }
});

test('rendering an upgrade preserves the current selection and only the choose action requests the next package', () => {
  const selections = [];
  const featureIds = Object.freeze(['campaign-page', 'promotional-banners', 'reviews']);
  const input = Object.freeze(props({
    packageIndex: 3,
    productCount: '125',
    featureIds,
    onSelect: index => selections.push(index),
  }));
  const before = structuredClone(input.plans);
  const element = NextTier(input);
  assert.ok(element);
  renderToStaticMarkup(element);
  assert.deepEqual(selections, []);
  const buttons = nodes(element).filter(node => node.type === 'button');
  assert.equal(buttons.length, 1);
  buttons[0].props.onClick();
  assert.deepEqual(selections, [4]);
  assert.equal(input.packageIndex, 3);
  assert.deepEqual(input.featureIds, ['campaign-page', 'promotional-banners', 'reviews']);
  assert.deepEqual(input.plans, before);
});

test('canonical tier order and callback indices remain correct when the supplied package array is reordered', () => {
  const reordered = [...studioPlans].reverse();
  const currentIndex = reordered.findIndex(plan => plan.name === 'Pro');
  const expectedIndex = reordered.findIndex(plan => plan.name === 'Executive');
  const selections = [];
  const element = NextTier(props({
    plans: reordered,
    packageIndex: currentIndex,
    productCount: '125',
    featureIds: ['campaign-page'],
    onSelect: index => selections.push(index),
  }));
  assert.ok(element);
  const markup = renderToStaticMarkup(element);
  assert.match(markup, /Optional upgrade: Executive/);
  assert.match(markup, /Choose Executive/);
  const action = nodes(element).find(node => node.type === 'button');
  action.props.onClick();
  assert.deepEqual(selections, [expectedIndex]);
});

test('Top Tier and invalid current packages never produce an optional upgrade', () => {
  for (const packageIndex of [5, -1, 0.5, studioPlans.length, NaN, Infinity]) {
    assert.equal(render({ packageIndex }), '', String(packageIndex));
  }
  assert.equal(render({ plans: [] }), '');
  for (const patch of [
    { name: 'Unlisted plan' },
    { price: 0 },
    { price: NaN },
    { price: Infinity },
    { products: 0 },
  ]) {
    const plans = studioPlans.map(plan => ({ ...plan }));
    Object.assign(plans[0], patch);
    assert.equal(render({ plans }), '', JSON.stringify(patch));
  }
});

test('scope that does not fit the current package requires review instead of being framed as an optional upgrade', () => {
  for (const overrides of [
    { packageIndex: 0, productCount: '50' },
    { packageIndex: 0, featureIds: ['theme-growth'] },
    { packageIndex: 2, featureIds: ['campaign-page'] },
    { packageIndex: 3, productCount: '250' },
    { packageIndex: 3, featureIds: ['product-specifications'] },
    { packageIndex: 4, featureIds: ['product-comparison'] },
    { packageIndex: 4, featureIds: ['theme-top-tier'] },
    { packageIndex: 4, productCount: 'more' },
    { packageIndex: 4, featureIds: ['unknown-requirement'] },
    { packageIndex: 0, productCount: '' },
  ]) assert.equal(render(overrides), '', JSON.stringify(overrides));
});

test('a missing, insufficient or non-increasing immediate tier is hidden without skipping to another package', () => {
  const withoutGrowth = studioPlans.filter(plan => plan.name !== 'Growth');
  assert.equal(render({ plans: withoutGrowth, packageIndex: 0 }), '');
  for (const patch of [
    { products: 9 },
    { price: 249 },
    { price: 200 },
    { price: NaN },
    { price: Infinity },
  ]) {
    const plans = studioPlans.map(plan => ({ ...plan }));
    Object.assign(plans[1], patch);
    assert.equal(render({ plans }), '', JSON.stringify(patch));
  }
});

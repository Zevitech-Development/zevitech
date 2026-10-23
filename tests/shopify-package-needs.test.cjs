// Requirements discovery and its actual handlers, without provider or network calls.
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

const Needs = require('../src/elements/business/shopify/shopify-package-needs.tsx').default;
const StudioSelect = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { packageFeatureNeeds, packageRecommendationCopy } = require('../src/content/landing/shopify-package-recommendation-content.ts');
const { shopifyCapabilityStartingPackage } = require('../src/content/landing/shopify-package-catalog.ts');
const { shopifyDesignFeaturedNeeds } = require('../src/content/landing/shopify-design-needs-content.ts');

function props(overrides = {}) {
  return {
    discovery: true,
    plans: studioPlans,
    packageIndex: 0,
    productCount: '10',
    featureIds: [],
    pending: null,
    notice: '',
    onChange: () => {},
    onConfirm: () => assert.fail('Discovery must not confirm a package'),
    onCancel: () => assert.fail('Discovery must not use an upgrade dialog'),
    onCompare: () => assert.fail('Discovery must not require package selection'),
    ...overrides,
  };
}

function tree(input) {
  const originalId = React.useId;
  React.useId = () => 'needs-test';
  try { return Needs(input); }
  finally { React.useId = originalId; }
}

function nodes(value, withinDetails = false) {
  if (Array.isArray(value)) return value.flatMap(child => nodes(child, withinDetails));
  if (!React.isValidElement(value)) return [];
  return [
    { node: value, withinDetails },
    ...nodes(value.props.children, withinDetails || value.type === 'details'),
  ];
}

function inputNode(input, featureId) {
  const result = nodes(tree(input)).find(({ node }) => node.type === 'input' && node.props.value === featureId)?.node;
  assert.ok(result, `Missing choice ${featureId}`);
  return result;
}

function renderDiscovery(overrides = {}) {
  return renderToStaticMarkup(React.createElement(Needs, props(overrides)));
}

const paymentAmounts = {
  '$249': ['$249', '$24.90', '$224.10'],
  '$599': ['$599', '$59.90', '$539.10'],
  '$999': ['$999', '$99.90', '$899.10'],
  '$1,499': ['$1,499', '$149.90', '$1,349.10'],
  '$2,499': ['$2,499', '$249.90', '$2,249.10'],
  '$4,999': ['$4,999', '$499.90', '$4,499.10'],
};

function quotedAmounts(markup) {
  return markup.match(/\$[0-9][0-9,]*(?:\.[0-9]{2})?/g) ?? [];
}

test('discovery offers every non-theme feature once and keeps six common choices visible initially', () => {
  const choices = nodes(tree(props())).filter(({ node }) => node.type === 'input' && node.props.type === 'checkbox');
  const visible = choices.filter(({ withinDetails }) => !withinDetails).map(({ node }) => node.props.value);
  const allExpected = packageFeatureNeeds.filter(feature => !feature.isThemeAccess).map(feature => feature.id);
  assert.deepEqual(choices.map(({ node }) => node.props.value).sort(), allExpected.sort());
  assert.equal(new Set(choices.map(({ node }) => node.props.value)).size, choices.length);
  assert.ok(visible.length >= 4 && visible.length <= 6);
  assert.deepEqual(visible.sort(), [...shopifyDesignFeaturedNeeds].sort());
  for (const { node } of choices) {
    const feature = packageFeatureNeeds.find(feature => feature.id === node.props.value);
    assert.equal(node.props.checked, feature.plans.includes('Beginner'));
    assert.equal(node.props.disabled, feature.plans.includes('Beginner'));
    assert.ok(node.props['aria-labelledby']);
    assert.ok(node.props['aria-describedby']);
  }
});

test('feature cards name their included tier without presenting separate feature prices', () => {
  const alteredPlans = studioPlans.map(plan => ({ ...plan, price: 1 }));
  const labels = nodes(tree(props({ plans: alteredPlans, packageIndex: 5, productCount: '10' })))
    .filter(({ node }) => node.type === 'label').map(({ node }) => node);
  for (const feature of packageFeatureNeeds.filter(feature => !feature.isThemeAccess)) {
    const label = labels.find(label => nodes(label).some(({ node }) => node.type === 'input' && node.props.value === feature.id));
    assert.ok(label, feature.id);
    const canonical = studioPlans.find(plan => plan.name === shopifyCapabilityStartingPackage[feature.id]);
    const inclusion = canonical.name === 'Beginner'
      ? 'Included in this Beginner package'
      : canonical.name === 'Top Tier' ? 'Included in Top Tier' : `Included in ${canonical.name} and above`;
    const markup = renderToStaticMarkup(label);
    assert.ok(markup.includes(inclusion), feature.id);
    assert.deepEqual(quotedAmounts(markup), [], `${feature.id} must not look like a separately priced item`);
    assert.match(inputNode(props(), feature.id).props['aria-describedby'], /-inclusion$/);
  }
  assert.deepEqual(quotedAmounts(renderDiscovery({ plans: alteredPlans, packageIndex: 0, productCount: '500' })), paymentAmounts['$4,999']);
});

test('discovery derives bundled inclusions without confirming a package or persisting those ticks as requirements', () => {
  const original = Object.freeze(['theme-growth']);
  const changes = [];
  const input = props({ featureIds: original, onChange: (...args) => changes.push(args) });
  inputNode(input, 'newsletter').props.onChange({ target: { checked: false } });
  assert.deepEqual(changes, [], 'An included feature cannot be removed from the package');
  inputNode(input, 'reviews').props.onChange({ target: { checked: true } });
  assert.deepEqual(changes, [['10', ['theme-growth', 'reviews']]]);
  assert.deepEqual(original, ['theme-growth']);
  assert.equal(input.packageIndex, 0);
  const updated = { ...input, featureIds: changes[0][1] };
  assert.equal(inputNode(updated, 'reviews').props.checked, true);
  assert.equal(inputNode(updated, 'reviews').props.disabled, true);
  assert.equal(inputNode(updated, 'app-integration').props.checked, true);
  const markup = renderDiscovery(updated);
  assert.match(markup, /Your package match[\s\S]*Pro package/);
  assert.match(markup, /Included in this Pro package/);
  assert.deepEqual(quotedAmounts(markup), paymentAmounts['$1,499']);
});

test('product setup keeps scope choices and accepts the review-only count without selecting a package', () => {
  const featureIds = Object.freeze(['theme-executive', 'analytics']);
  const changes = [];
  const input = props({ featureIds, onChange: (...args) => changes.push(args) });
  const select = nodes(tree(input)).find(({ node }) => node.type === StudioSelect).node;
  select.props.onChange({ target: { value: 'more' } });
  assert.deepEqual(changes, [['more', ['theme-executive', 'analytics']]]);
  const markup = renderToStaticMarkup(select);
  for (const option of packageRecommendationCopy.productCounts) assert.ok(markup.includes(`value="${option.value}"`));
  assert.doesNotMatch(markup, /Included/);
});

test('clear feature selections preserves theme and unrecognized scope requirements', () => {
  const changes = [];
  const input = props({
    featureIds: Object.freeze(['theme-pro', 'reviews', 'custom-code', 'unpriced-request']),
    onChange: (...args) => changes.push(args),
  });
  const button = nodes(tree(input)).find(({ node }) => node.type === 'button' && node.props.children === 'Clear feature selections').node;
  assert.equal(button.props.disabled, false);
  button.props.onClick();
  assert.deepEqual(changes, [['10', ['theme-pro', 'unpriced-request']]]);
  input.featureIds = changes[0][1];
  assert.equal(nodes(tree(input)).find(({ node }) => node.type === 'button').node.props.disabled, true);
});

test('discovery explains deferred package confirmation and never displays a staged upgrade', () => {
  const markup = renderToStaticMarkup(React.createElement(Needs, props({
    pending: { previousPackageIndex: 0, packageIndex: 5, difference: 4750, productCount: '500', featureIds: ['custom-code'] },
  })));
  assert.match(markup, /No additional features selected/);
  assert.match(markup, /review and confirm your package after this step/);
  assert.match(markup, /Features are bundled into this package price, not charged individually/);
  assert.doesNotMatch(markup, /Your selected package|Review your package upgrade|Confirm upgrade|Current package|role="dialog"/);
});

test('omitting discovery preserves the selected-package upgrade interface', () => {
  const input = props();
  delete input.discovery;
  const markup = renderToStaticMarkup(React.createElement(Needs, input));
  assert.match(markup, /Your selected package/);
  assert.match(markup, /Beginner · \$249/);
  assert.match(markup, /Add feature/);
  assert.doesNotMatch(markup, /type="checkbox"|Clear feature selections/);
});

test('reviews and newsletter share one Pro package total instead of adding feature prices', () => {
  const markup = renderDiscovery({ productCount: '10', featureIds: ['reviews', 'newsletter'] });
  assert.deepEqual(quotedAmounts(markup), paymentAmounts['$1,499']);
  assert.doesNotMatch(markup, /\$2,098/);
  assert.match(markup, /Your package match[\s\S]*Pro package/);
  assert.match(markup, /One-time package total · USD/);
});

test('several features in the same tier keep one unchanged package total', () => {
  for (const featureIds of [
    ['reviews'],
    ['reviews', 'app-integration'],
    ['reviews', 'app-integration', 'workflow-automation', 'bundles'],
    ['reviews', 'reviews', 'app-integration', 'workflow-automation', 'bundles', 'newsletter'],
  ]) {
    const markup = renderDiscovery({ productCount: '10', featureIds });
    assert.deepEqual(quotedAmounts(markup), paymentAmounts['$1,499'], featureIds.join(', '));
  }
});

test('the one total includes product setup and hidden design requirements as well as functionality', () => {
  for (const [productCount, featureIds, expected] of [
    ['250', ['reviews', 'newsletter'], '$2,499'],
    ['10', ['reviews', 'newsletter', 'theme-top-tier'], '$4,999'],
    ['500', ['reviews', 'theme-executive'], '$4,999'],
    ['10', ['theme-growth'], '$599'],
    ['10', [], '$249'],
  ]) {
    assert.deepEqual(quotedAmounts(renderDiscovery({ productCount, featureIds })), paymentAmounts[expected], `${productCount}: ${featureIds.join(', ')}`);
  }
});

test('unmatched requirements show scope review without fabricating or retaining a total', () => {
  for (const [productCount, featureIds] of [
    ['more', ['reviews', 'newsletter']],
    ['501', ['reviews']],
    ['10', ['reviews', 'unpriced-request']],
  ]) {
    const markup = renderDiscovery({ productCount, featureIds, packageIndex: 5 });
    assert.deepEqual(quotedAmounts(markup), [], `${productCount}: ${featureIds.join(', ')}`);
    assert.match(markup, /scope review/i);
  }
});

test('selected Growth, Pro and Top Tier derive bundled ticks without creating explicit requests', () => {
  for (const name of ['Growth', 'Pro', 'Top Tier']) {
    const packageIndex = studioPlans.findIndex(plan => plan.name === name);
    const featureIds = Object.freeze([]);
    const input = props({ packageSelected: true, packageIndex, featureIds });
    const choices = nodes(tree(input)).filter(({ node }) => node.type === 'input' && node.props.type === 'checkbox');
    for (const { node } of choices) {
      const feature = packageFeatureNeeds.find(item => item.id === node.props.value);
      const included = feature.plans.includes(name);
      assert.equal(node.props.checked, included, `${name}: ${feature.id}`);
      assert.equal(node.props.disabled, included, `${name}: ${feature.id}`);
      const label = nodes(tree(input)).find(({ node: parent }) => parent.type === 'label' && nodes(parent).some(({ node: child }) => child.type === 'input' && child.props.value === feature.id)).node;
      const markup = renderToStaticMarkup(label);
      assert.ok(markup.includes(included ? `Included in your ${name} package` : `Not included in ${name}`), feature.id);
      assert.deepEqual(quotedAmounts(markup), [], 'Feature cards must not quote per-feature money');
    }
    assert.deepEqual(featureIds, []);
    assert.match(renderDiscovery(input), /included features are selected automatically/);
  }
});

test('included bundle ticks cannot be unchecked and excluded changes submit only explicit requirements', () => {
  const featureIds = Object.freeze(['theme-growth']);
  const changes = [];
  const input = props({
    packageSelected: true, packageIndex: 1, featureIds,
    onChange: (...args) => changes.push(args),
  });
  inputNode(input, 'newsletter').props.onChange({ target: { checked: false } });
  inputNode(input, 'payment').props.onChange({ target: { checked: false } });
  assert.deepEqual(changes, []);
  inputNode(input, 'reviews').props.onChange({ target: { checked: true } });
  assert.deepEqual(changes, [['10', ['theme-growth', 'reviews']]]);
  assert.deepEqual(featureIds, ['theme-growth']);
  const updated = { ...input, featureIds: ['theme-growth', 'reviews'] };
  inputNode(updated, 'reviews').props.onChange({ target: { checked: false } });
  assert.deepEqual(changes.at(-1), ['10', ['theme-growth', 'reviews']]);
});

test('the current selected higher package keeps its exact total when it covers the requirements', () => {
  for (const [name, expected] of [['Growth', '$599'], ['Pro', '$1,499'], ['Top Tier', '$4,999']]) {
    const packageIndex = studioPlans.findIndex(plan => plan.name === name);
    const markup = renderDiscovery({ packageSelected: true, packageIndex, productCount: '10', featureIds: [] });
    assert.deepEqual(quotedAmounts(markup), paymentAmounts[expected]);
    assert.match(markup, /Your selected package/);
    assert.ok(markup.includes(`${name} package`));
    assert.doesNotMatch(markup, /Recommended package for your needs/);
  }
});

test('the displayed matching package controls included ticks and upgrade labels', () => {
  for (const [productCount, featureIds, displayed, reviewsIncluded] of [
    ['10', ['theme-executive'], 'Executive', true],
    ['500', ['theme-growth'], 'Top Tier', true],
    ['10', ['theme-growth', 'custom-code'], 'Top Tier', true],
    ['10', ['theme-growth'], 'Growth', false],
  ]) {
    const input = props({ packageSelected: true, packageIndex: 1, productCount, featureIds });
    const label = nodes(tree(input)).find(({ node }) => node.type === 'label' && nodes(node).some(({ node: child }) => child.type === 'input' && child.props.value === 'reviews')).node;
    const markup = renderToStaticMarkup(label);
    assert.ok(markup.includes(reviewsIncluded ? `Included in your ${displayed} package` : `Not included in ${displayed}`));
    assert.equal(inputNode(input, 'reviews').props.checked, reviewsIncluded);
    if (!reviewsIncluded) {
      assert.match(markup, /Included in Pro and above/);
      assert.match(markup, /Select to upgrade to Pro/);
    }
    assert.deepEqual(quotedAmounts(markup), []);
  }
});

test('incompatible active packages show a clearly recommended combined package with one total', () => {
  const markup = renderDiscovery({
    packageSelected: true, packageIndex: 1, productCount: '250',
    featureIds: ['theme-executive', 'reviews'],
  });
  assert.deepEqual(quotedAmounts(markup), paymentAmounts['$2,499']);
  assert.match(markup, /Recommended package for your needs/);
  assert.match(markup, /Executive package/);
  assert.match(markup, /Growth does not cover every selection/);
  assert.match(markup, /Included in your Executive package/);
  assert.equal(inputNode(props({ packageSelected: true, packageIndex: 1, featureIds: ['reviews'] }), 'reviews').props.checked, true);
  assert.equal(inputNode(props({ packageSelected: true, packageIndex: 1, featureIds: ['reviews'] }), 'reviews').props.disabled, true);
});

test('unmatched selected-package requirements show scope review without retaining a valid total', () => {
  for (const input of [
    { productCount: 'more', featureIds: ['reviews'] },
    { productCount: '501', featureIds: [] },
    { productCount: '10', featureIds: ['unpriced-request'] },
  ]) {
    const markup = renderDiscovery({ packageSelected: true, packageIndex: 5, ...input });
    assert.deepEqual(quotedAmounts(markup), []);
    assert.match(markup, /Custom scope review/);
    assert.doesNotMatch(markup, /Your selected package|Recommended package for your needs/);
  }
});

test('clearing explicit requests preserves design constraints and every tick from the selected package', () => {
  const changes = [];
  const input = props({
    packageSelected: true, packageIndex: 3,
    featureIds: Object.freeze(['theme-pro', 'newsletter', 'reviews']),
    onChange: (...args) => changes.push(args),
  });
  const clear = nodes(tree(input)).find(({ node }) => node.type === 'button' && node.props.children === 'Clear feature selections').node;
  clear.props.onClick();
  assert.deepEqual(changes, [['10', ['theme-pro']]]);
  input.featureIds = changes[0][1];
  assert.equal(inputNode(input, 'newsletter').props.checked, true);
  assert.equal(inputNode(input, 'reviews').props.checked, true);
  assert.equal(inputNode(input, 'workflow-automation').props.checked, true);
  assert.equal(nodes(tree(input)).find(({ node }) => node.type === 'button' && node.props.children === 'Clear feature selections').node.props.disabled, true);
  assert.match(renderDiscovery(input), /Clearing feature requests keeps your current package and its included features/);
});

test('selected package names and combined targets remain correct when passed plans are reordered', () => {
  const plans = [studioPlans[5], studioPlans[2], studioPlans[4], studioPlans[0], studioPlans[3], studioPlans[1]];
  const growthIndex = plans.findIndex(plan => plan.name === 'Growth');
  const input = props({ plans, packageSelected: true, packageIndex: growthIndex, productCount: '10', featureIds: [] });
  assert.equal(inputNode(input, 'newsletter').props.checked, true);
  assert.equal(inputNode(input, 'reviews').props.checked, false);
  assert.deepEqual(quotedAmounts(renderDiscovery(input)), paymentAmounts['$599']);
  const label = nodes(tree(input)).find(({ node }) => node.type === 'label' && nodes(node).some(({ node: child }) => child.type === 'input' && child.props.value === 'reviews')).node;
  assert.match(renderToStaticMarkup(label), /Select to upgrade to Pro/);
  assert.deepEqual(quotedAmounts(renderDiscovery({ ...input, featureIds: ['reviews'] })), paymentAmounts['$1,499']);
});

test('an invalid selected-package index does not create bundle inclusions or a stale selected total', () => {
  const input = props({ packageSelected: true, packageIndex: 999 });
  const choices = nodes(tree(input)).filter(({ node }) => node.type === 'input');
  for (const { node } of choices) {
    const bundled = packageFeatureNeeds.find(feature => feature.id === node.props.value)?.plans.includes('Beginner');
    assert.equal(node.props.checked, bundled);
    assert.equal(node.props.disabled, bundled);
  }
  const markup = renderDiscovery(input);
  assert.match(markup, /Your package match/);
  assert.doesNotMatch(markup, /Included in your|Your selected package/);
});

test('custom logo design is auto-included with the displayed tier count while five-concept requests stay an upgrade', () => {
  for (const [packageIndex, plan] of studioPlans.entries()) {
    const input = props({ packageSelected: true, packageIndex, productCount: '10' });
    const choice = inputNode(input, 'logo-design');
    assert.equal(choice.props.checked, true, plan.name);
    assert.equal(choice.props.disabled, true, plan.name);
    const label = nodes(tree(input)).find(({ node }) => node.type === 'label' && nodes(node).some(({ node: child }) => child.type === 'input' && child.props.value === 'logo-design')).node;
    const markup = renderToStaticMarkup(label);
    assert.ok(markup.includes(`Custom logo design: ${packageIndex + 1} ${packageIndex === 0 ? 'concept' : 'concepts'} for one final logo`), plan.name);
    assert.match(markup, /PNG and SVG/);
    assert.equal(inputNode(input, 'custom-logos').props.checked, packageIndex >= 4, plan.name);
  }
  const changes = [];
  const input = props({ featureIds: ['theme-growth'], onChange: (...args) => changes.push(args) });
  inputNode(input, 'custom-logos').props.onChange({ target: { checked: true } });
  assert.deepEqual(changes, [['10', ['theme-growth', 'custom-logos']]]);
  const markup = renderDiscovery({ featureIds: changes[0][1] });
  assert.match(markup, /Executive package/);
  assert.deepEqual(quotedAmounts(markup), paymentAmounts['$2,499']);
});

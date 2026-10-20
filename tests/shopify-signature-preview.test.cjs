// Exercise the signature storefront through the actual preview state and handlers.
// No browser, network, checkout provider, or real order is used.
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

const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const ClotyaHome = require('../src/elements/business/shopify/shopify-clotya-home.tsx').default;
const EcolifeHome = require('../src/elements/business/shopify/shopify-ecolife-home.tsx').default;
const BeautyHome = require('../src/elements/business/shopify/shopify-beauty-home.tsx').default;
const LivingHome = require('../src/elements/business/shopify/shopify-home-living-home.tsx').default;
const TechHome = require('../src/elements/business/shopify/shopify-tech-home.tsx').default;
const Select = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const { signatureCatalog } = require('../src/content/landing/shopify-signature-catalog.ts');
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { signaturePreviewCopy } = require('../src/content/landing/shopify-signature-preview-content.ts');
const { shopifyPreviewEnhancements: detail } = require('../src/content/landing/shopify-preview-enhancements.ts');
const cases = [
  { theme: 'clotya', Home: ClotyaHome, minPackage: 'Executive' },
  { theme: 'ecolife', Home: EcolifeHome, minPackage: 'Executive' },
  { theme: 'beauty', Home: BeautyHome, minPackage: 'Top Tier' },
  { theme: 'living', Home: LivingHome, minPackage: 'Top Tier' },
  { theme: 'tech', Home: TechHome, minPackage: 'Top Tier' },
].map(item => ({ ...item, id: signatureCatalog[item.theme].id, products: signatureCatalog[item.theme].products }));
const money = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!React.isValidElement(value)) return [];
  return [value, ...nodes(value.props.children)];
}
function text(value) {
  if (Array.isArray(value)) return value.map(text).join('');
  if (React.isValidElement(value)) return text(value.props.children);
  return value == null || typeof value === 'boolean' ? '' : String(value);
}
function propsFor(item, packageName = item.minPackage, overrides = {}) {
  const reference = studioTemplates.find(reference => reference.id === item.id);
  return {
    copy: studioCopy, plan: studioPlans.findIndex(plan => plan.name === packageName),
    packageName, scopeMode: 'package', compactScope: true,
    referenceId: item.id, layout: reference.layout, palette: reference.palette,
    images: reference.images, logo: '', mobile: false, expanded: false,
    values: {
      businessType: 'products', brand: '', headline: '', brief: '',
      product: item.products[0].name, price: String(item.products[0].price),
      customAccent: '', customInk: '', customSurface: '', customSoft: '',
    },
    ...overrides,
  };
}
function harness(input) {
  const states = [], refs = [];
  return {
    tree() {
      let stateCursor = 0, refCursor = 0;
      const original = { useState: React.useState, useId: React.useId, useRef: React.useRef, useEffect: React.useEffect, useCallback: React.useCallback };
      React.useState = initial => {
        const index = stateCursor++;
        if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
        return [states[index], next => { states[index] = typeof next === 'function' ? next(states[index]) : next; }];
      };
      React.useId = () => 'signature-test';
      React.useRef = initial => {
        const index = refCursor++;
        return refs[index] || (refs[index] = { current: initial });
      };
      React.useEffect = () => {};
      React.useCallback = callback => callback;
      try { return Preview(input); }
      finally { Object.assign(React, original); }
    },
  };
}
function find(instance, predicate, message = 'Expected interactive control') {
  const node = nodes(instance.tree()).find(predicate);
  assert.ok(node, message);
  return node;
}
function button(instance, label) {
  return find(instance, node => node.type === 'button' && (node.props['aria-label'] === label || text(node) === label), `Button: ${label}`);
}
function home(instance, item) {
  return find(instance, node => node.type === item.Home, `${item.theme} dedicated homepage`);
}
function collectionNames(instance) {
  return nodes(instance.tree()).filter(node => node.type === 'article').map(article => {
    const open = nodes(article).find(node => node.type === 'button' && node.props['aria-label']?.startsWith(`${detail.viewProduct}: `));
    assert.ok(open, 'Each collection product opens a real product detail');
    return open.props['aria-label'].slice(`${detail.viewProduct}: `.length);
  });
}
function subtotal(instance) {
  const summary = nodes(instance.tree()).find(node => node.type === 'aside' && text(node).includes(detail.orderSummary));
  assert.ok(summary, 'Cart order summary');
  const pair = nodes(summary).find(node => node.type === 'div' && nodes(node).some(child => child.type === 'dt' && text(child) === studioCopy.preview.total));
  return text(nodes(pair).find(node => node.type === 'dd'));
}
function openBag(instance) {
  const bag = find(instance, node => node.type === 'button'
    && node.props['aria-label']?.startsWith(`${studioCopy.preview.cart} (`)
    && typeof node.props.onClick === 'function');
  bag.props.onClick();
}

test('all five signature references render complete interactive homepages only in their eligible packages', () => {
  for (const item of cases) {
    for (const packageName of item.minPackage === 'Executive' ? ['Executive', 'Top Tier'] : ['Top Tier']) {
      for (const mobile of [false, true]) {
        const input = propsFor(item, packageName, { mobile });
        const instance = harness(input);
        const dedicated = home(instance, item);
        assert.equal(dedicated.props.products.length, item.products.length);
        for (const callback of ['onBrowse', 'onProduct', 'onAddToBag', 'onViewBag']) {
          assert.equal(typeof dedicated.props[callback], 'function', `${item.theme}: ${callback}`);
        }
        const markup = renderToStaticMarkup(React.createElement(Preview, input));
        assert.match(markup, new RegExp(`data-signature-theme="${item.theme}"`));
        assert.doesNotMatch(markup, /(?:clotya|ecolife)-refined\.webp|Full design reference|Try package features/);
        assert.ok((markup.match(/<button\b/g) || []).length > 10, 'The page contains actual shopping controls');
      }
    }
  }
});

test('passing a premium reference to a cheaper package cannot unlock its signature homepage', () => {
  for (const item of cases) {
    const minimumIndex = studioPlans.findIndex(plan => plan.name === item.minPackage);
    for (const { name: packageName } of studioPlans.slice(0, minimumIndex)) {
      const input = propsFor(item, packageName);
      const instance = harness(input);
      assert.ok(!nodes(instance.tree()).some(node => cases.some(candidate => node.type === candidate.Home)), `${packageName}: ${item.theme}`);
      const markup = renderToStaticMarkup(React.createElement(Preview, input));
      assert.doesNotMatch(markup, /data-signature-theme=/);
      assert.doesNotMatch(markup, /(?:clotya|ecolife)-refined\.webp/);
    }
  }
});

test('each dedicated home routes its category and product controls into its own real catalogue', () => {
  for (const item of cases) {
    const instance = harness(propsFor(item));
    const category = item.products[0].collection;
    home(instance, item).props.onBrowse(category);
    assert.deepEqual(collectionNames(instance), item.products.filter(product => product.collection === category).map(product => product.name));
    button(instance, `${detail.viewProduct}: ${item.products[0].name}`).props.onClick();
    const markup = renderToStaticMarkup(instance.tree());
    assert.ok(markup.includes(item.products[0].name));
    assert.ok(markup.includes(money(item.products[0].price)));
    assert.ok(nodes(instance.tree()).some(node => node.type === 'button' && text(node) === studioCopy.preview.add));
    if (item.theme === 'clotya') {
      for (const size of signaturePreviewCopy.sizes) assert.ok(button(instance, size));
    } else {
      assert.doesNotMatch(markup, /Choose your size|Sample sizing/);
    }
  }
});

test('Clotya sizes stay separate cart lines and quantity/removal affect only the selected variant', () => {
  const item = cases[0];
  const instance = harness(propsFor(item));
  const product = item.products[0];
  home(instance, item).props.onAddToBag(0);
  assert.ok(button(instance, 'S'), 'Home quick-add opens size selection');
  assert.equal(nodes(instance.tree()).some(node => node.type === 'button' && node.props['aria-label'] === `${studioCopy.preview.cart} (0)`), true);
  button(instance, 'S').props.onClick();
  button(instance, studioCopy.preview.add).props.onClick();
  button(instance, 'M').props.onClick();
  button(instance, studioCopy.preview.add).props.onClick();
  openBag(instance);
  assert.ok(button(instance, `${studioCopy.preview.remove}: ${product.name} (S)`));
  assert.ok(button(instance, `${studioCopy.preview.remove}: ${product.name} (M)`));
  assert.equal(subtotal(instance), money(product.price * 2));
  button(instance, `${detail.increase}: ${product.name} (S)`).props.onClick();
  assert.equal(subtotal(instance), money(product.price * 3));
  button(instance, `${studioCopy.preview.remove}: ${product.name} (S)`).props.onClick();
  assert.equal(subtotal(instance), money(product.price));
  assert.ok(!nodes(instance.tree()).some(node => node.type === 'button' && node.props['aria-label'] === `${studioCopy.preview.remove}: ${product.name} (S)`));
  assert.ok(button(instance, `${studioCopy.preview.remove}: ${product.name} (M)`));
  button(instance, `${detail.increase}: ${product.name} (M)`).props.onClick();
  assert.equal(subtotal(instance), money(product.price * 2));
  button(instance, `${detail.decrease}: ${product.name} (M)`).props.onClick();
  assert.equal(subtotal(instance), money(product.price));
});

test('food, beauty, living and technology quick-add merge identical products with correct quantities and totals', () => {
  for (const item of cases.filter(item => item.theme !== 'clotya')) {
    const instance = harness(propsFor(item));
    home(instance, item).props.onAddToBag(0);
    home(instance, item).props.onAddToBag(0);
    home(instance, item).props.onAddToBag(1);
    home(instance, item).props.onViewBag();
    const removals = nodes(instance.tree()).filter(node => node.type === 'button' && node.props['aria-label']?.startsWith(`${studioCopy.preview.remove}: `));
    assert.equal(removals.length, 2, item.theme);
    assert.equal(subtotal(instance), money(item.products[0].price * 2 + item.products[1].price), item.theme);
    assert.doesNotMatch(renderToStaticMarkup(instance.tree()), /Choose your size|Sample sizing/);
    button(instance, `${detail.increase}: ${item.products[1].name}`).props.onClick();
    assert.equal(subtotal(instance), money(item.products[0].price * 2 + item.products[1].price * 2), item.theme);
    button(instance, `${detail.decrease}: ${item.products[1].name}`).props.onClick();
    assert.equal(subtotal(instance), money(item.products[0].price * 2 + item.products[1].price), item.theme);
    button(instance, `${studioCopy.preview.remove}: ${item.products[0].name}`).props.onClick();
    assert.equal(subtotal(instance), money(item.products[1].price), item.theme);
  }
});

test('each signature owns a distinct local catalogue and retains its exact ID and package threshold', () => {
  assert.deepEqual(cases.map(item => item.id), ['clotya-fashion-premium', 'ecolife-organic-premium', 'ritual-beauty-premium', 'forme-living-premium', 'pulse-audio-premium']);
  for (const item of cases) {
    const reference = studioTemplates.find(reference => reference.id === item.id);
    assert.equal(reference.minPackage, item.minPackage);
    assert.equal(reference.signatureTheme, item.theme);
    assert.ok(item.products.length >= 6, item.theme);
    assert.equal(new Set(item.products.map(product => product.name)).size, item.products.length);
    assert.equal(new Set(item.products.map(product => product.src)).size, item.products.length, `${item.theme} must not repeat the same product photograph`);
    assert.ok(new Set(item.products.map(product => product.collection)).size >= 2);
    for (const product of item.products) {
      assert.ok(Number.isFinite(product.price) && product.price > 0);
      assert.ok(product.description.trim());
      assert.ok(fs.existsSync(path.join(root, 'public', product.src)), product.src);
    }
  }
});

test('search and collection filters operate on each signature catalogue instead of generic sample products', () => {
  for (const item of cases) {
    const instance = harness(propsFor(item));
    home(instance, item).props.onBrowse();
    assert.deepEqual(collectionNames(instance), item.products.map(product => product.name));
    const target = item.products[1];
    find(instance, node => node.type === 'input' && node.props.type === 'search').props.onChange({ target: { value: `  ${target.name.toUpperCase()}  ` } });
    assert.deepEqual(collectionNames(instance), [target.name]);
    find(instance, node => node.type === 'input' && node.props.type === 'search').props.onChange({ target: { value: '' } });
    const filter = find(instance, node => node.type === Select && nodes(node).some(option => option.type === 'option' && option.props.value === target.collection));
    filter.props.onChange({ target: { value: target.collection } });
    assert.deepEqual(collectionNames(instance), item.products.filter(product => product.collection === target.collection).map(product => product.name));
    find(instance, node => node.type === 'input' && node.props.type === 'search').props.onChange({ target: { value: 'no matching sample product' } });
    assert.deepEqual(collectionNames(instance), []);
    assert.ok(nodes(instance.tree()).some(node => node.type === 'button' && text(node) === detail.clear));
    button(instance, detail.clear).props.onClick();
    assert.deepEqual(collectionNames(instance), item.products.map(product => product.name));
  }
});

test('signature product sorting uses real prices and preserves the active collection filter', () => {
  for (const item of cases) {
    const instance = harness(propsFor(item));
    home(instance, item).props.onBrowse();
    const sort = () => find(instance, node => node.type === Select
      && nodes(node).some(option => option.type === 'option' && option.props.value === 'price-asc'));
    assert.ok(new Set(item.products.map(product => product.price)).size > 1, 'A varied catalogue exercises numeric price sorting');
    sort().props.onChange({ target: { value: 'price-asc' } });
    assert.deepEqual(collectionNames(instance), [...item.products].sort((a, b) => a.price - b.price).map(product => product.name));
    sort().props.onChange({ target: { value: 'price-desc' } });
    assert.deepEqual(collectionNames(instance), [...item.products].sort((a, b) => b.price - a.price).map(product => product.name));
    const category = item.products[0].collection;
    const filter = find(instance, node => node.type === Select
      && nodes(node).some(option => option.type === 'option' && option.props.value === category));
    filter.props.onChange({ target: { value: category } });
    assert.deepEqual(collectionNames(instance), item.products.filter(product => product.collection === category)
      .sort((a, b) => b.price - a.price).map(product => product.name));
  }
});

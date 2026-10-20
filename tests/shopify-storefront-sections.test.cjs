// Storefront composition and real callback checks, without a browser or network.
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

const Sections = require('../src/elements/business/shopify/shopify-storefront-sections.tsx').default;
const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const Select = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const { packageStorefrontProfiles, packageStorefrontCopy: copy } = require('../src/content/landing/shopify-package-preview-content.ts');
const { shopifyPackagesForCapability } = require('../src/content/landing/shopify-package-catalog.ts');
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const source = studioTemplates[0];
const products = source.images.map((src, index) => ({
  id: index, src, name: ['Cedar', 'Amber', 'Birch'][index],
  collection: ['Everyday', 'Signature', 'Everyday'][index], priceLabel: '$49.00',
}));
const props = mode => ({
  mode, brand: 'Sample Brand', brief: '', products, mobile: false,
  onCollection() {}, onProduct() {}, onAddProduct() {},
});
function nodes(element) {
  if (Array.isArray(element)) return element.flatMap(nodes);
  if (!React.isValidElement(element)) return [];
  return [element, ...nodes(element.props.children)];
}
function textOf(element) {
  if (Array.isArray(element)) return element.map(textOf).join('');
  return React.isValidElement(element) ? textOf(element.props.children) : element == null ? '' : String(element);
}
function productGridCards(tree) {
  const grid = nodes(tree).find(node => node.props['data-product-grid']);
  assert.ok(grid, 'the main product grid is present');
  return nodes(grid).filter(node => node.type === 'article');
}
function harness(Component, input) {
  const state = [];
  return {
    tree() {
      let cursor = 0;
      const original = { useState: React.useState, useId: React.useId, useRef: React.useRef, useEffect: React.useEffect, useCallback: React.useCallback };
      React.useState = initial => {
        const index = cursor++;
        if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
        return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
      };
      React.useId = () => 'storefront-test';
      React.useRef = initial => ({ current: initial });
      React.useEffect = () => {};
      React.useCallback = callback => callback;
      try { return Component(input); }
      finally { Object.assign(React, original); }
    },
  };
}
function previewProps(index) {
  return {
    copy: studioCopy, plan: index, packageName: studioPlans[index].name,
    scopeMode: 'package', compactScope: true, images: source.images,
    logo: '', layout: [0, 2, 3, 4, 6, 8][index], palette: 0, mobile: false,
    values: { brand: 'Sample Brand', headline: source.headline, brief: '', product: 'Sample product', price: '49', customAccent: '', customInk: '', customSurface: '', customSoft: '' },
  };
}

test('the package catalogue governs richer merchandising and related-product scope', () => {
  assert.equal(packageStorefrontProfiles.Beginner.layout, 'essential');
  assert.equal(packageStorefrontProfiles.Growth.layout, 'brand');
  for (const plan of studioPlans) {
    const profile = packageStorefrontProfiles[plan.name];
    assert.equal(profile.recommendations, shopifyPackagesForCapability('recommendations').includes(plan.name), plan.name);
    assert.equal(profile.layout === 'discovery', shopifyPackagesForCapability('storefront-filters').includes(plan.name), plan.name);
  }
});

test('the first three complete homepages have distinct sections without borrowing higher-tier features', () => {
  const html = [0, 1, 2].map(index => renderToStaticMarkup(React.createElement(Preview, previewProps(index))));
  assert.match(html[0], /data-storefront-section="essential-collection"/);
  assert.match(html[0], /data-storefront-section="essential-story"/);
  assert.doesNotMatch(html[0], /data-storefront-section="brand-story"|type="email"|Choose a sample collection|aria-label="Add to sample bag/);
  assert.match(html[1], /data-storefront-section="brand-collection"/);
  assert.match(html[1], /data-storefront-section="brand-story"/);
  assert.match(html[1], /data-storefront-section="brand-products"/);
  assert.match(html[1], /data-storefront-section="brand-details"/);
  assert.match(html[1], /data-storefront-section="brand-perspective"/);
  assert.match(html[1], /type="email" required=""/);
  assert.equal((html[1].match(/type="email"/g) || []).length, 1, 'the parent newsletter is not duplicated');
  assert.match(html[1], /aria-label="Add to sample bag/);
  assert.doesNotMatch(html[1], /Choose a sample collection|discovery-spotlight/);
  assert.match(html[2], /data-storefront-section="discovery-collection"/);
  assert.match(html[2], /data-storefront-section="discovery-spotlight"/);
  assert.match(html[2], /data-storefront-section="discovery-categories"/);
  assert.match(html[2], /data-storefront-section="discovery-context"/);
  assert.match(html[2], /data-storefront-section="discovery-recommendations"/);
  assert.match(html[2], /data-storefront-section="discovery-explore"/);
  assert.equal((html[2].match(/type="email"/g) || []).length, 1);
  assert.doesNotMatch(html[2], /data-storefront-section="brand-story"/);
  assert.match(html[2], /Choose a sample collection/);
  for (const markup of html) {
    assert.doesNotMatch(markup, /Stories from your brand|Your customer dashboard|Preview currency|5-star|verified reviews/i);
    for (const src of source.images) assert.ok(markup.includes(src));
  }
});

test('discovery collection chips and sorting change the actual displayed products', () => {
  const instance = harness(Sections, props('discovery'));
  const find = predicate => nodes(instance.tree()).find(predicate);
  find(node => node.type === 'button' && node.props['aria-controls'] && textOf(node) === 'Signature').props.onClick();
  let cards = productGridCards(instance.tree());
  assert.equal(cards.length, 1);
  assert.match(renderToStaticMarkup(cards[0]), /Amber/);
  assert.match(renderToStaticMarkup(instance.tree()), />1 sample product</);
  assert.doesNotMatch(renderToStaticMarkup(instance.tree()), />1 sample products</);
  find(node => node.type === 'button' && textOf(node) === copy.allCollections).props.onClick();
  find(node => node.type === Select).props.onChange({ target: { value: 'name-asc' } });
  cards = productGridCards(instance.tree());
  assert.deepEqual(cards.map(card => nodes(card).find(node => node.type === 'button' && ['Amber', 'Birch', 'Cedar'].includes(textOf(node))).props.children), ['Amber', 'Birch', 'Cedar']);
  find(node => node.type === Select).props.onChange({ target: { value: 'name-desc' } });
  cards = productGridCards(instance.tree());
  assert.match(renderToStaticMarkup(cards[0]), /Cedar/);
});

test('a removed collection falls back to all current products and updates the selected chip', () => {
  const input = props('discovery');
  const instance = harness(Sections, input);
  nodes(instance.tree()).find(node => node.type === 'button' && node.props['aria-controls'] && textOf(node) === 'Signature').props.onClick();
  input.products = products.filter(product => product.collection !== 'Signature');
  const tree = instance.tree();
  assert.equal(productGridCards(tree).length, 2);
  assert.equal(nodes(tree).find(node => node.type === 'button' && textOf(node) === copy.allCollections).props['aria-pressed'], true);
  assert.match(renderToStaticMarkup(tree), />2 sample products</);
});

test('collection browsing, product details and quick-add preserve the selected product identity', () => {
  const calls = [];
  const instance = harness(Sections, {
    ...props('brand'),
    onCollection: value => calls.push(['collection', value]),
    onProduct: value => calls.push(['product', value]),
    onAddProduct: value => calls.push(['add', value]),
  });
  const find = predicate => nodes(instance.tree()).find(predicate);
  find(node => node.type === 'button' && textOf(node) === 'Signature').props.onClick();
  find(node => node.props['aria-label'] === 'View product: Amber').props.onClick();
  find(node => node.props['aria-label'] === 'Add to sample bag: Amber').props.onClick();
  assert.deepEqual(calls, [['collection', 'Signature'], ['product', 1], ['add', 1]]);
  assert.match(renderToStaticMarkup(instance.tree()), /role="status"[^>]*>Added to sample bag/);
});

test('Growth editorial sections use different supplied images and their detail actions open real products', () => {
  const calls = [];
  const instance = harness(Sections, { ...props('brand'), onProduct: id => calls.push(id) });
  const tree = instance.tree();
  const section = name => nodes(tree).find(node => node.props['data-storefront-section'] === name);
  const imagesIn = element => nodes(element).filter(node => node.props.src).map(node => node.props.src);
  assert.deepEqual(imagesIn(section('brand-collection')), [products[0].src, products[1].src]);
  assert.deepEqual(imagesIn(section('brand-story')), [products[2].src]);
  assert.deepEqual(imagesIn(section('brand-perspective')), [products[1].src]);
  const details = nodes(section('brand-details')).filter(node => node.type === 'button');
  assert.equal(details.length, 3);
  details.forEach(button => button.props.onClick());
  assert.deepEqual(calls, [0, 1, 2]);
  assert.doesNotMatch(renderToStaticMarkup(tree), /5-star|guarantee|verified reviews|discovery-recommendations/i);
});

test('Level Up spotlight selection updates the featured image, product actions and related recommendations', () => {
  const calls = [];
  const instance = harness(Sections, {
    ...props('discovery'),
    onProduct: id => calls.push(['product', id]),
    onAddProduct: id => calls.push(['add', id]),
    onCollection: collection => calls.push(['collection', collection]),
  });
  const section = name => nodes(instance.tree()).find(node => node.props['data-storefront-section'] === name);
  let featured = section('discovery-spotlight');
  assert.equal(nodes(featured).find(node => node.props['aria-label'] === `${copy.spotlightPrice}: Amber`).props['aria-pressed'], true);
  nodes(featured).find(node => node.props['aria-label'] === `${copy.spotlightPrice}: Birch`).props.onClick();
  featured = section('discovery-spotlight');
  assert.equal(nodes(featured).find(node => node.props['aria-label'] === `${copy.spotlightPrice}: Birch`).props['aria-pressed'], true);
  assert.equal(nodes(featured).find(node => node.props.src).props.src, products[2].src);
  nodes(featured).find(node => node.props['aria-label'] === `${copy.viewProduct}: Birch`).props.onClick();
  nodes(featured).find(node => node.props['aria-label'] === `${copy.spotlightAdd}: Birch`).props.onClick();
  const related = nodes(section('discovery-recommendations')).filter(node => node.type === 'article');
  assert.deepEqual(related.map(node => node.props['data-product-id']), [0, 1]);
  nodes(related[1]).find(node => node.props['aria-label'] === `${copy.quickAdd}: Amber`).props.onClick();
  nodes(section('discovery-categories')).find(node => node.props['aria-label'] === `${copy.collectionAction}: Signature`).props.onClick();
  assert.deepEqual(calls, [['product', 2], ['add', 2], ['add', 1], ['collection', 'Signature']]);
});

test('repeated supplied images do not duplicate spotlight choices, and a single product needs no related row', () => {
  const duplicate = { ...products[1], src: products[0].src };
  const instance = harness(Sections, { ...props('discovery'), products: [products[0], duplicate, products[2]] });
  const group = nodes(instance.tree()).find(node => node.props['aria-label'] === copy.spotlightChoose);
  const choices = nodes(group).filter(node => node.type === 'button');
  assert.equal(choices.length, 2);
  assert.equal(choices.filter(node => node.props['aria-pressed']).length, 1);
  const single = renderToStaticMarkup(React.createElement(Sections, { ...props('discovery'), products: [products[0]] }));
  assert.doesNotMatch(single, /data-storefront-section="discovery-recommendations"/);
  assert.doesNotMatch(single, /Choose a featured product/);
});

test('Growth quick-add opens its mini cart and Level Up recommendations exclude the viewed product', () => {
  const originalDocument = global.document;
  const originalHTMLElement = global.HTMLElement;
  global.document = { activeElement: null };
  global.HTMLElement = class {};
  try {
    const growth = harness(Preview, previewProps(1));
    nodes(growth.tree()).find(node => node.type === Sections).props.onAddProduct(1);
    const growthMarkup = renderToStaticMarkup(growth.tree());
    assert.match(growthMarkup, /Close mini cart/);
    assert.match(growthMarkup, /Sample selection 02/);
    for (const index of [0, 1, 2]) {
      const instance = harness(Preview, previewProps(index));
      nodes(instance.tree()).find(node => node.type === Sections).props.onProduct(0);
      const tree = instance.tree();
      const related = nodes(tree).find(node => node.props['data-storefront-section'] === 'related-products');
      if (index < 2) assert.equal(related, undefined);
      else {
        assert.ok(related);
        const cards = nodes(related).filter(node => node.type === 'article');
        assert.equal(cards.length, 2);
        assert.ok(cards.every(card => !renderToStaticMarkup(card).includes('Explore this piece: Sample product')));
      }
    }
  } finally {
    if (originalDocument === undefined) delete global.document; else global.document = originalDocument;
    if (originalHTMLElement === undefined) delete global.HTMLElement; else global.HTMLElement = originalHTMLElement;
  }
});

test('premium homepage compositions are preserved', () => {
  for (const index of [4, 5]) {
    const markup = renderToStaticMarkup(React.createElement(Preview, previewProps(index)));
    assert.doesNotMatch(markup, /data-storefront-section="(?:essential|brand|discovery)-/);
    assert.ok(markup.includes(source.images[0]));
  }
});

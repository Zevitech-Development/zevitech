// Service preview scope and local interactions. No browser, provider or network.
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
const Preview = require('../src/elements/business/shopify/shopify-service-preview.tsx').default;
const { shopifyServiceCategories: categories, getShopifyServiceCategory, shopifyServicePreviewCopy: copy } = require('../src/content/landing/shopify-service-preview-content.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { packagePreviewCapabilities, packageStorefrontProfiles } = require('../src/content/landing/shopify-package-preview-content.ts');
function props(overrides = {}) {
  return {
    plan: 0, packageName: 'Beginner', mobile: false, layout: 0, palette: 0,
    images: ['/store-studio/fashion.jpg'], logo: '',
    values: { businessCategory: 'Professional services', customCategory: '', brand: 'Sample Service Brand', brief: '', headline: 'Apparel headline should not leak', product: 'Apparel product should not leak', price: '49', customAccent: '#1557b0', customInk: '#10243b', customSurface: '#ffffff', customSoft: '#eaf2fb' },
    ...overrides,
  };
}
function nodes(element) {
  if (Array.isArray(element)) return element.flatMap(nodes);
  if (!React.isValidElement(element)) return [];
  return [element, ...nodes(element.props.children)];
}
function textOf(element) {
  if (Array.isArray(element)) return element.map(textOf).join('');
  return React.isValidElement(element) ? textOf(element.props.children) : element == null ? '' : String(element);
}
function harness(input) {
  const state = [];
  return {
    tree() {
      let cursor = 0;
      const original = { useState: React.useState, useId: React.useId, useRef: React.useRef, useEffect: React.useEffect };
      React.useState = initial => {
        const index = cursor++;
        if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
        return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
      };
      React.useId = () => 'service-test';
      React.useRef = initial => ({ current: initial });
      React.useEffect = () => {};
      try { return Preview(input); }
      finally { Object.assign(React, original); }
    },
  };
}
const findButton = (instance, text) => nodes(instance.tree()).find(node => node.type === 'button' && textOf(node) === text);

test('every service category resolves by label and id and presents its own credible offers', () => {
  assert.equal(categories.length, 14);
  for (const category of categories) {
    assert.equal(getShopifyServiceCategory(category.id), category);
    assert.equal(getShopifyServiceCategory(category.label), category);
    const input = props();
    input.values.businessCategory = category.label;
    const markup = renderToStaticMarkup(React.createElement(Preview, input));
    assert.ok(markup.includes(category.headline));
    assert.equal((markup.match(/<article\b/g) || []).length, 3);
    for (const offer of category.offers) assert.ok(markup.includes(offer.title.replaceAll('&', '&amp;')));
    assert.doesNotMatch(markup, /Apparel|fashion\.jpg|Add to cart|shipping|size chart|verified reviews|5-star|guaranteed/i);
  }
  assert.equal(getShopifyServiceCategory('Unknown service category').id, 'services');
});

test('basic, richer and discovery service sections follow the selected package scope', () => {
  for (const [index, plan] of studioPlans.entries()) {
    const markup = renderToStaticMarkup(React.createElement(Preview, props({ plan: index, packageName: plan.name })));
    assert.equal(markup.includes('data-service-section="story"'), packageStorefrontProfiles[plan.name].layout !== 'essential', plan.name);
    assert.equal(markup.includes('data-service-section="filters"'), packagePreviewCapabilities[plan.name].filters, plan.name);
    assert.match(markup, /data-service-section="process"/);
    assert.match(markup, /data-service-section="faq"/);
    assert.match(markup, /Live availability, appointment booking and payment tools require a separately confirmed setup/);
    assert.doesNotMatch(markup, /type="date"|type="datetime-local"|<iframe|<script/);
  }
});

test('service filters change the offers shown and reset safely for a different business category', () => {
  const input = props({ plan: 2, packageName: 'Level Up' });
  const instance = harness(input);
  findButton(instance, 'Projects').props.onClick();
  let markup = renderToStaticMarkup(instance.tree());
  assert.equal((markup.match(/<article\b/g) || []).length, 1);
  assert.match(markup, /1 service to explore/);
  assert.match(markup, /Project roadmap/);
  input.values.businessCategory = 'Beauty services';
  markup = renderToStaticMarkup(instance.tree());
  assert.equal((markup.match(/<article\b/g) || []).length, 3);
  assert.equal(findButton(instance, copy.allServices).props['aria-pressed'], true);
  assert.match(markup, /Signature appointment/);
});

test('service detail and enquiry are local, explicit and never reserve an appointment', () => {
  const instance = harness(props());
  nodes(instance.tree()).find(node => node.props['aria-label'] === 'View service: Project roadmap').props.onClick();
  let tree = instance.tree();
  assert.ok(nodes(tree).some(node => node.type === 'h3' && textOf(node) === 'Project roadmap'));
  assert.ok(textOf(tree).includes('A staged action plan'));
  assert.ok(textOf(tree).includes(copy.demoNote));
  assert.equal(nodes(tree).find(node => node.type === 'form'), undefined);
  findButton(instance, copy.request).props.onClick();
  tree = instance.tree();
  const form = nodes(tree).find(node => node.type === 'form');
  const textarea = nodes(tree).find(node => node.type === 'textarea');
  assert.equal(textarea.props.required, true);
  assert.equal(textarea.props.maxLength, 600);
  assert.equal(form.props.action, undefined);
  let prevented = false;
  form.props.onSubmit({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.ok(textOf(instance.tree()).includes(copy.sent));
  findButton(instance, copy.back).props.onClick();
  assert.match(renderToStaticMarkup(instance.tree()), /data-service-section="offers"/);
  assert.ok(!textOf(instance.tree()).includes(copy.sent));
});

test('Level Up related services exclude the open offer; lower packages do not imply this feature', () => {
  for (const [index, name] of ['Beginner', 'Growth', 'Level Up'].entries()) {
    const instance = harness(props({ plan: index, packageName: name }));
    nodes(instance.tree()).find(node => node.props['aria-label'] === 'View service: Discovery consultation').props.onClick();
    const related = nodes(instance.tree()).find(node => node.props['data-service-section'] === 'related');
    if (index < 2) assert.equal(related, undefined);
    else {
      assert.ok(related);
      assert.equal(nodes(related).filter(node => node.type === 'button').length, 2);
      assert.ok(!textOf(related).includes('Discovery consultation'));
      nodes(related).find(node => node.type === 'button' && textOf(node).includes('Project roadmap')).props.onClick();
      assert.ok(nodes(instance.tree()).some(node => node.type === 'h3' && textOf(node) === 'Project roadmap'));
    }
  }
});

test('custom categories, supplied service imagery and compact previews retain their identity', () => {
  const input = props({ images: ['/store-studio/services/team.jpg'], mobile: true });
  input.values.businessCategory = 'Other';
  input.values.customCategory = 'Event planning';
  let markup = renderToStaticMarkup(React.createElement(Preview, input));
  assert.match(markup, /Event planning/);
  assert.match(markup, /store-studio\/services\/team\.jpg/);
  assert.match(markup, /studio-storeframe[^"]*max-w-sm/);
  assert.match(markup, /--primary:#1557b0/);
  input.values.businessCategory = 'Fitness services';
  markup = renderToStaticMarkup(React.createElement(Preview, input));
  assert.match(markup, /Fitness services/);
  assert.doesNotMatch(markup, /Event planning/);
});

test('Creative & digital renders its catalog service photo while unrelated fashion imagery stays excluded', () => {
  const template = studioTemplates.find(item => item.businessType === 'services' && item.category === 'Creative & digital');
  assert.ok(template);
  const input = props({ images: ['/store-studio/fashion.jpg', ...template.images] });
  input.values.businessCategory = template.category;
  let markup = renderToStaticMarkup(React.createElement(Preview, input));
  assert.ok(markup.includes(`src="${template.images[0]}"`));
  assert.doesNotMatch(markup, /fashion\.jpg/);
  input.images = ['/store-studio/fashion.jpg'];
  markup = renderToStaticMarkup(React.createElement(Preview, input));
  assert.doesNotMatch(markup, /fashion\.jpg/);
});

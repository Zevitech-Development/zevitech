// Render-only checkout checks. Effects are disabled; no provider or network calls.
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

const Checkout = require('../src/elements/business/shopify/shopify-package-checkout.tsx').default;
const Preview = require('../src/elements/business/shopify/shopify-checkout-preview.tsx').default;
const Summary = require('../src/elements/business/shopify/shopify-order-summary.tsx').default;
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');

function brief(packageName) {
  return {
    version: 2,
    package: { name: packageName },
    business: {
      name: 'Example Customer', email: 'customer@example.com', phone: '+1 (202) 555-0123',
      brand: 'Example', brief: 'Example store', projectType: 'New store', requirements: '',
    },
    design: { template: 'Atelier Editorial', layout: 'Editorial', palette: 'Ocean' },
    imageFilenames: [], logoFilename: '', priorities: [],
    needs: { productCount: '10', featureIds: [], scopeConfirmed: true },
  };
}

function renderOrder(packageName, amount, localPackage, orderChanges = {}) {
  const original = {
    useState: React.useState, useEffect: React.useEffect,
    useRef: React.useRef, useCallback: React.useCallback,
  };
  let cursor = 0;
  const suppliedState = [
    { available: true, mode: 'sandbox' },
    { id: 'test-order', packageName, amount, currency: 'USD', mode: 'sandbox', status: 'paid', briefFingerprint: 'confirmed-order', transactionId: 'test-transaction', ...orderChanges },
    false, false, true, '', 'confirmed-order',
  ];
  React.useState = initial => {
    const index = cursor++;
    return [index < suppliedState.length ? suppliedState[index] : initial, () => {}];
  };
  React.useEffect = () => {};
  React.useRef = initial => ({ current: initial });
  React.useCallback = callback => callback;
  let tree;
  try { tree = Checkout({ brief: brief(localPackage) }); }
  finally { Object.assign(React, original); }
  return renderToStaticMarkup(tree);
}

test('checkout delivery follows the confirmed order when local selections differ', () => {
  const premiumOrder = renderOrder('Top Tier', 4999, 'Beginner');
  assert.match(premiumOrder, /Top Tier · \$4,999\.00 USD/);
  assert.match(premiumOrder, /Estimated delivery/);
  assert.match(premiumOrder, /Up to 2 working weeks/);
  assert.doesNotMatch(premiumOrder, /3–7 working days/);

  const standardOrder = renderOrder('Beginner', 249, 'Top Tier');
  assert.match(standardOrder, /Beginner · \$249\.00 USD/);
  assert.match(standardOrder, /3–7 working days/);
  assert.doesNotMatch(standardOrder, /Up to 2 working weeks/);
});

test('all six checkout previews show canonical package totals, 40% due today, and the remaining 60%', () => {
  const expected = [
    ['Beginner', '$249 USD', '$99.60', '$149.40'],
    ['Growth', '$599 USD', '$239.60', '$359.40'],
    ['Level Up', '$999 USD', '$399.60', '$599.40'],
    ['Pro', '$1,499 USD', '$599.60', '$899.40'],
    ['Executive', '$2,499 USD', '$999.60', '$1,499.40'],
    ['Top Tier', '$4,999 USD', '$1,999.60', '$2,999.40'],
  ];
  for (const [name, total, upfront, balance] of expected) {
    const input = brief(name);
    input.package.price = 1;
    const markup = renderToStaticMarkup(React.createElement(Preview, { brief: input, onEdit: () => {} }));
    assert.ok(markup.includes(total), `${name}: total`);
    assert.ok(markup.includes(`${upfront} USD`), `${name}: upfront`);
    assert.ok(markup.includes(`${balance} USD`), `${name}: balance`);
    assert.ok(markup.includes(`Pay 40% upfront · ${upfront} USD`), `${name}: payment button`);
    assert.match(markup, /Due today · 40% upfront/);
    assert.match(markup, /After delivery · 60% balance/);
    assert.match(markup, /Preview only\. Payments are not enabled/);
    assert.doesNotMatch(markup, /<iframe|<script|type="submit"/);
  }
});

test('order summary makes total, upfront payment and after-delivery balance distinct', () => {
  const markup = renderToStaticMarkup(React.createElement(Summary, {
    plan: studioPlans.find(plan => plan.name === 'Growth'),
    onChangePackage: () => {},
  }));
  assert.match(markup, /Total package price/);
  assert.match(markup, /\$599\.00/);
  assert.match(markup, /Due today · 40% upfront/);
  assert.match(markup, /\$239\.60/);
  assert.match(markup, /After delivery · 60% balance/);
  assert.match(markup, /\$359\.40/);
});

test('an approved upfront payment preserves the full package price and outstanding balance', () => {
  const markup = renderOrder('Growth', 239.6, 'Beginner', {
    paymentStage: 'upfront', paymentVersion: 'upfront-40-v1',
    totalAmount: 599, upfrontAmount: 239.6, balanceAmount: 359.4, amountPaid: 239.6,
  });
  assert.match(markup, /Growth · \$599\.00 USD/);
  assert.match(markup, /Upfront payment received · 40%/);
  assert.match(markup, /\$239\.60 USD/);
  assert.match(markup, /After delivery · 60% balance/);
  assert.match(markup, /\$359\.40 USD/);
  assert.match(markup, /Test upfront payment confirmed/);
  assert.doesNotMatch(markup, /fully paid|Pay 40% upfront/);
});

test('a legacy full payment is not relabelled as an upfront payment', () => {
  const markup = renderOrder('Growth', 599, 'Growth', {
    paymentStage: 'full', paymentVersion: 'legacy-full-v1',
    totalAmount: 599, upfrontAmount: 0, balanceAmount: 0, amountPaid: 599,
  });
  assert.match(markup, /Growth · \$599\.00 USD/);
  assert.match(markup, /Test payment confirmed/);
  assert.doesNotMatch(markup, /Upfront payment received|60% balance|remaining 60%/);
});

test('an uncharged legacy checkout cannot show card inputs or a full-price pay button', () => {
  const markup = renderOrder('Growth', 599, 'Growth', {
    paymentStage: 'full', paymentVersion: 'legacy-full-v1', status: 'created',
    totalAmount: 599, upfrontAmount: 0, balanceAmount: 0, amountPaid: 0,
  });
  assert.match(markup, /previous payment terms/);
  assert.match(markup, /Update checkout with this brief/);
  assert.doesNotMatch(markup, /shopify-card-number|type="submit"/);
});

test('a new checkout payment button charges the deposit amount only', () => {
  const markup = renderOrder('Growth', 239.6, 'Growth', {
    paymentStage: 'upfront', paymentVersion: 'upfront-40-v1', status: 'created',
    totalAmount: 599, upfrontAmount: 239.6, balanceAmount: 359.4, amountPaid: 0,
  });
  assert.match(markup, /Pay 40% upfront · \$239\.60 USD/);
  assert.doesNotMatch(markup, />Pay[^<]*\$599\.00 USD/);
});

test('checkout preview shows the selected canonical package estimate without accepting a client price', () => {
  const input = brief('Executive');
  input.package.price = 1;
  const markup = renderToStaticMarkup(React.createElement(Preview, { brief: input, onEdit: () => {} }));
  assert.match(markup, /\$2,499 USD/);
  assert.match(markup, /Estimated delivery/);
  assert.match(markup, />7 working days</);
  assert.match(markup, /Timing starts once we receive your brief and required assets/);
  assert.doesNotMatch(markup, /\$1 USD|3–7 working days|Up to 2 working weeks/);
});

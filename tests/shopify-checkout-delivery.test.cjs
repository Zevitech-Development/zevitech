// Render-only checkout checks. Effects are disabled; no provider or network calls.
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

test('all six checkout previews show canonical package totals, 10% due today, and the remaining 90%', () => {
  const expected = [
    ['Beginner', '$249 USD', '$24.90', '$224.10'],
    ['Growth', '$599 USD', '$59.90', '$539.10'],
    ['Level Up', '$999 USD', '$99.90', '$899.10'],
    ['Pro', '$1,499 USD', '$149.90', '$1,349.10'],
    ['Executive', '$2,499 USD', '$249.90', '$2,249.10'],
    ['Top Tier', '$4,999 USD', '$499.90', '$4,499.10'],
  ];
  for (const [name, total, upfront, balance] of expected) {
    const input = brief(name);
    input.package.price = 1;
    const markup = renderToStaticMarkup(React.createElement(Preview, { brief: input, onEdit: () => {} }));
    assert.ok(markup.includes(total), `${name}: total`);
    assert.ok(markup.includes(`${upfront} USD`), `${name}: upfront`);
    assert.ok(markup.includes(`${balance} USD`), `${name}: balance`);
    assert.ok(markup.includes(`Pay 10% upfront · ${upfront} USD`), `${name}: payment button`);
    assert.match(markup, /Due today · 10% upfront/);
    assert.match(markup, /After delivery · 90% balance/);
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
  assert.match(markup, /Due today · 10% upfront/);
  assert.match(markup, /\$59\.90/);
  assert.match(markup, /After delivery · 90% balance/);
  assert.match(markup, /\$539\.10/);
});

test('an approved upfront payment preserves the full package price and outstanding balance', () => {
  const markup = renderOrder('Growth', 59.9, 'Beginner', {
    paymentStage: 'upfront', paymentVersion: 'upfront-10-v2',
    totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1, amountPaid: 59.9,
  });
  assert.match(markup, /Growth · \$599\.00 USD/);
  assert.match(markup, /Upfront payment received · 10%/);
  assert.match(markup, /\$59\.90 USD/);
  assert.match(markup, /After your approval · 90% balance/);
  assert.match(markup, /\$539\.10 USD/);
  assert.match(markup, /Test upfront payment confirmed/);
  assert.doesNotMatch(markup, /fully paid|Pay 10% upfront/);
});

test('a legacy full payment is not relabelled as an upfront payment', () => {
  const markup = renderOrder('Growth', 599, 'Growth', {
    paymentStage: 'full', paymentVersion: 'legacy-full-v1',
    totalAmount: 599, upfrontAmount: 0, balanceAmount: 0, amountPaid: 599,
  });
  assert.match(markup, /Growth · \$599\.00 USD/);
  assert.match(markup, /Test payment confirmed/);
  assert.doesNotMatch(markup, /Upfront payment received|90% balance|remaining 90%/);
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
  const markup = renderOrder('Growth', 59.9, 'Growth', {
    paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', status: 'created',
    totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1, amountPaid: 0,
  });
  assert.match(markup, /Pay 10% upfront · \$59\.90 USD/);
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

test('historical deposit UI retains original 40% terms and blocks an unpaid old session', () => {
  const old = { paymentStage: 'upfront', paymentVersion: 'upfront-40-v1', totalAmount: 599, upfrontAmount: 239.6, balanceAmount: 359.4, amountPaid: 239.6 };
  const paid = renderOrder('Growth', 239.6, 'Growth', old);
  assert.match(paid, /Upfront payment received · 40%/);
  assert.match(paid, /After delivery · 60% balance/);
  assert.doesNotMatch(paid, /10% upfront|90% balance/);
  const unpaid = renderOrder('Growth', 239.6, 'Growth', { ...old, status: 'created', amountPaid: 0 });
  assert.match(unpaid, /Update checkout with this brief/);
  assert.doesNotMatch(unpaid, /Pay 40% upfront ·/);
});

test('one Continue saves the lead then opens payment, blocks failed saves and coalesces double clicks', async () => {
  const client = require('../src/lib/shopify-checkout-client.ts');
  const originals = { request: client.requestShopifyCheckout, session: client.createCheckoutSession };
  const hooks = [];
  const refs = [];
  const calls = [];
  let allowSave = false;
  let tree;
  const input = brief('Growth');
  function all(value) {
    if (Array.isArray(value)) return value.flatMap(all);
    if (!React.isValidElement(value)) return [];
    return [value, ...all(value.props.children)];
  }
  function label(value) {
    if (Array.isArray(value)) return value.map(label).join('');
    if (React.isValidElement(value)) return label(value.props.children);
    return typeof value === 'string' ? value : '';
  }
  function render() {
    const saved = { useState: React.useState, useRef: React.useRef, useEffect: React.useEffect, useCallback: React.useCallback };
    let state = 0, ref = 0;
    React.useState = initial => {
      const index = state++;
      if (!(index in hooks)) hooks[index] = index === 0 ? { available: true, mode: 'sandbox' } : index === 6 ? 'same-brief' : initial;
      return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }];
    };
    React.useRef = initial => refs[ref++] ??= { current: initial };
    React.useEffect = () => {};
    React.useCallback = callback => callback;
    try { tree = Checkout({ brief: input, onValidate: async () => { calls.push('save-lead'); return allowSave; } }); }
    finally { Object.assign(React, saved); }
  }
  const continueButton = () => all(tree).find(node => node.type === 'button' && label(node) === 'Continue to checkout');
  client.createCheckoutSession = () => ({ requestId: 'example', orderId: 'example', accessToken: 'example' });
  client.requestShopifyCheckout = async action => {
    calls.push(action);
    return { id: 'example', status: 'created', packageName: 'Growth', amount: 59.9, totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1, paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', briefFingerprint: 'same-brief' };
  };
  try {
    render();
    assert.equal(continueButton().props.disabled, true, 'Terms are never auto-accepted');
    all(tree).find(node => node.type === 'input' && node.props.type === 'checkbox').props.onChange({ target: { checked: true } });
    render();
    await continueButton().props.onClick();
    render();
    assert.deepEqual(calls, ['save-lead'], 'A failed lead save cannot create a payment order');
    assert.ok(continueButton(), 'A failed save can be retried');
    allowSave = true;
    const action = continueButton().props.onClick;
    await Promise.all([action(), action()]);
    render();
    assert.deepEqual(calls, ['save-lead', 'save-lead', 'create']);
    assert.equal(continueButton(), undefined, 'No second Continue action after the lead saves');
    assert.ok(all(tree).some(node => node.type === 'form'));
    assert.ok(all(tree).some(node => node.props.id === 'shopify-card-number'));
    assert.ok(all(tree).some(node => node.type === 'button' && label(node).includes('Pay 10% upfront')));
    assert.equal(calls.includes('pay'), false, 'Opening checkout never charges the customer');
  } finally { client.requestShopifyCheckout = originals.request; client.createCheckoutSession = originals.session; }
});


test('a gateway rejection shows a retryable card form rather than the pending screen', () => {
  const markup = renderOrder('Growth', 59.9, 'Growth', {
    status: 'declined', declineCode: '300', retryAllowed: true,
    paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1,
  });
  assert.match(markup, /gateway rejected/);
  assert.match(markup, /Try payment again · \$59\.90 USD/);
  assert.match(markup, /shopify-card-number/);
  assert.doesNotMatch(markup, /Check payment status/);
});

test('exhausted payment attempts offer support instead of a dead retry button', () => {
  const markup = renderOrder('Growth', 59.9, 'Growth', {
    status: 'declined', declineCode: '225', retryAllowed: false,
    paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1,
  });
  assert.match(markup, /contact your project manager to continue/);
  assert.match(markup, /type="submit"[^>]*disabled/);
});

function paymentHarness(status) {
  const states = [], refs = [], effects = [];
  let tree;
  function nodes(value) {
    if (Array.isArray(value)) return value.flatMap(nodes);
    return React.isValidElement(value) ? [value, ...nodes(value.props.children)] : [];
  }
  function render() {
    let state = 0, ref = 0;
    effects.length = 0;
    const saved = { useState: React.useState, useRef: React.useRef, useEffect: React.useEffect, useCallback: React.useCallback };
    React.useState = initial => {
      const index = state++;
      if (!(index in states)) states[index] = index === 0 ? { available: true, mode: 'sandbox', tokenizationKey: 'test', scriptUrl: 'https://example.test/Collect.js' }
        : index === 1 ? { id: 'example', packageName: 'Growth', status, amount: 59.9, totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1, paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', briefFingerprint: 'same' }
        : index === 6 ? 'same' : initial;
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    };
    React.useRef = initial => refs[ref++] ??= { current: initial };
    React.useCallback = callback => callback;
    React.useEffect = callback => effects.push(callback);
    try { tree = Checkout({ brief: brief('Growth') }); } finally { Object.assign(React, saved); }
  }
  render();
  return { render, states, refs, effects, nodes: () => nodes(tree), markup: () => renderToStaticMarkup(tree) };
}

test('pending checkout verifies automatically, restores declined form, and has no manual status button', () => {
  const verifier = require('../src/lib/shopify-payment-verification.ts');
  const original = verifier.verifyShopifyPayment;
  const h = paymentHarness('pending');
  h.refs[4].current = { orderId: 'example', accessToken: 'test' };
  let resolved, unresolved, cancelled = false;
  verifier.verifyShopifyPayment = (read, done, delayed) => { resolved = done; unresolved = delayed; return () => { cancelled = true; }; };
  try {
    const cleanup = h.effects[6]();
    assert.equal(typeof resolved, 'function');
    assert.match(h.markup(), /Confirming your payment automatically/);
    assert.doesNotMatch(h.markup(), /Check payment status|type="submit"/);
    unresolved(); h.render();
    assert.match(h.markup(), /taking longer than expected/);
    assert.doesNotMatch(h.markup(), /animate-spin|Try payment again/);
    resolved({ ...h.states[1], status: 'declined', declineCode: '225' }); h.render();
    assert.match(h.markup(), /security code on your card/);
    assert.match(h.markup(), /Try payment again/);
    assert.doesNotMatch(h.markup(), /Confirming your payment automatically/);
    cleanup(); assert.equal(cancelled, true);
  } finally { verifier.verifyShopifyPayment = original; }
});

test('Collect.js invalid fields and tokenization timeouts show card-specific errors without a payment request', () => {
  const h = paymentHarness('created');
  const previous = { window: global.window, document: global.document };
  let options;
  global.window = { CollectJS: { configure: value => { options = value; } } };
  global.document = { getElementById: () => ({ removeEventListener() {} }), querySelector: () => ({}) };
  let cleanup;
  try {
    cleanup = h.effects[5]();
    options.validationCallback('ccnumber', false); h.render();
    assert.match(h.markup(), /Enter a valid card number/);
    assert.match(h.markup(), /No payment has been submitted/);
    assert.doesNotMatch(h.markup(), /Check payment status/);
    options.validationCallback('ccnumber', true); h.render();
    assert.doesNotMatch(h.markup(), /Enter a valid card number/);
    options.validationCallback('ccexp', false); options.validationCallback('cvv', false); h.render();
    assert.match(h.markup(), /unexpired date/); assert.match(h.markup(), /3- or 4-digit security code/);
    options.timeoutCallback(); h.render();
    assert.match(h.markup(), /couldn’t verify your card details/);
    assert.doesNotMatch(h.markup(), /Check payment status/);
  } finally { cleanup?.(); global.window = previous.window; global.document = previous.document; }
});

// Exercise the signature storefront through the actual preview state and handlers.
// No browser, network, checkout provider, or real order is used.
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

const Confirmation = require('../src/elements/business/shopify/shopify-order-confirmation.tsx').default;
const { shopifyCheckoutEvents } = require('../src/lib/shopify-checkout-analytics.ts');
function renderOrder(order) {
  const original = { useState: React.useState, useEffect: React.useEffect, useCallback: React.useCallback };
  let cursor = 0;
  React.useState = () => [[order, false, ''][cursor++], () => {}];
  React.useEffect = () => {};
  React.useCallback = callback => callback;
  try { return renderToStaticMarkup(React.createElement(Confirmation)); }
  finally { Object.assign(React, original); }
}
const order = {
  id: 'ZVT-' + 'a'.repeat(32), status: 'paid', packageName: 'Top Tier', amount: 499.9,
  totalAmount: 4999, upfrontAmount: 499.9, balanceAmount: 4499.1, amountPaid: 499.9,
  paymentStage: 'upfront', paymentVersion: 'upfront-10-v3', currency: 'USD', mode: 'live',
  transactionId: '123456', briefFingerprint: 'b'.repeat(64),
};
test('verified payment confirmation displays actual deposit, balance and next steps', () => {
  const html = renderOrder(order);
  for (const text of ['Thank you. Your project starts here.', '$499.90', '$4,499.10', '$4,999.00', 'What happens next', 'Up to 2 working weeks', 'Save / print confirmation']) assert.ok(html.includes(text), text);
  const purchases = shopifyCheckoutEvents(order).filter(event => event.name === 'purchase');
  assert.equal(purchases.length, 1);
  assert.equal(purchases[0].params.value, 499.9);
});
test('missing, declined and pending orders never show a successful confirmation or purchase event', () => {
  for (const current of [null, { ...order, status: 'created' }, { ...order, status: 'declined', declineCode: '223', amountPaid: 0 }, { ...order, status: 'pending', amountPaid: 0 }]) {
    const html = renderOrder(current);
    assert.ok(!html.includes('Thank you. Your project starts here.'));
    assert.ok(!html.includes('Save / print confirmation'));
    assert.ok(!html.includes('Check status'));
    assert.ok(html.includes('Talk to your project manager'));
    if (current) assert.equal(shopifyCheckoutEvents(current).filter(event => event.name === 'purchase').length, 0);
  }
  assert.ok(renderOrder({ ...order, status: 'declined', declineCode: '223' }).includes('This card has expired'));
});

test('current receipts use after-delivery terms while historical receipts retain approval terms', () => {
  assert.match(renderOrder(order), /Balance after delivery/);
  assert.doesNotMatch(renderOrder(order), /after your approval/);
  assert.match(renderOrder({ ...order, paymentVersion: 'upfront-10-v2' }), /Balance after your approval/);
});

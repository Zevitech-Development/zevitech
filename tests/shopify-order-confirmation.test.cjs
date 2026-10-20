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
  id: 'ZVT-' + 'a'.repeat(32), status: 'paid', packageName: 'Top Tier', amount: 1999.6,
  totalAmount: 4999, upfrontAmount: 1999.6, balanceAmount: 2999.4, amountPaid: 1999.6,
  paymentStage: 'upfront', paymentVersion: 'upfront-40-v1', currency: 'USD', mode: 'live',
  transactionId: '123456', briefFingerprint: 'b'.repeat(64),
};
test('verified payment confirmation displays actual deposit, balance and next steps', () => {
  const html = renderOrder(order);
  for (const text of ['Thank you. Your project starts here.', '$1,999.60', '$2,999.40', '$4,999.00', 'What happens next', 'Up to 2 working weeks', 'Save / print confirmation']) assert.ok(html.includes(text), text);
  const purchases = shopifyCheckoutEvents(order).filter(event => event.name === 'purchase');
  assert.equal(purchases.length, 1);
  assert.equal(purchases[0].params.value, 1999.6);
});
test('missing, declined and pending orders never show a successful confirmation or purchase event', () => {
  for (const current of [null, { ...order, status: 'created' }, { ...order, status: 'declined', declineCode: '223', amountPaid: 0 }, { ...order, status: 'pending', amountPaid: 0 }]) {
    const html = renderOrder(current);
    assert.ok(!html.includes('Thank you. Your project starts here.'));
    assert.ok(!html.includes('Save / print confirmation'));
    assert.ok(html.includes('Check status'));
    if (current) assert.equal(shopifyCheckoutEvents(current).filter(event => event.name === 'purchase').length, 0);
  }
  assert.ok(renderOrder({ ...order, status: 'declined', declineCode: '223' }).includes('This card has expired'));
});

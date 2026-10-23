// Isolated Ads conversion dispatch checks; no Google requests or payment attempts.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
require.extensions['.ts'] = function (module, filename) {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
};
const { createShopifyAdsConfigurator, shopifyAdsDestination } = require('../src/lib/shopify-ads-analytics.ts');
const { createShopifySavedLeadTracker, trackShopifySavedLead } = require('../src/lib/shopify-lead-analytics.ts');
const ADS = 'AW-18498620302/test_lead';
const LEAD = 'lead-12345678-1234-1234-1234-123456789abc';
function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}
function processedRecorder(calls) {
  return (command, name, params) => {
    const { event_callback, ...payload } = params;
    calls.push([command, name, payload]);
    event_callback?.();
  };
}

test('the Shopify Ads base is derived from valid action destinations and configured once per account', () => {
  const configure = createShopifyAdsConfigurator();
  const calls = [];
  const send = (...args) => calls.push(args);
  assert.equal(configure(undefined, [ADS]), false);
  assert.equal(configure(send, [ADS, 'AW-18498620302/test_purchase']), true);
  configure(send, [ADS]);
  assert.deepEqual(calls, [['config', 'AW-18498620302', { send_page_view: false }]]);
  configure(send, ['AW-17789624484/another_action']);
  assert.equal(calls.length, 2);
  for (const invalid of [undefined, '', 'G-1234', 'AW-18498620302', 'AW-abc/lead', 'AW-18498620302/has spaces', 'AW-18498620302/lead?email=private@example.com']) {
    assert.equal(shopifyAdsDestination(invalid), undefined);
    assert.equal(configure(undefined, [invalid]), true);
  }
});

test('failed tag configuration is retryable and does not mark its destination as sent', () => {
  const configure = createShopifyAdsConfigurator();
  let fail = true; let calls = 0;
  const send = () => { calls++; if (fail) throw Error('Not ready'); };
  assert.equal(configure(send, [ADS]), false);
  fail = false;
  assert.equal(configure(send, [ADS]), true);
  configure(send, [ADS]);
  assert.equal(calls, 2);
});

test('durably accepted checkout and quote receipts each send one lead and one secondary action, never purchase value or PII', () => {
  for (const intent of ['checkout', 'quote']) {
    const track = createShopifySavedLeadTracker(); const calls = []; const saved = storage();
    const send = processedRecorder(calls);
    assert.equal(track(LEAD, intent, undefined, saved, ADS), false);
    assert.equal(saved.values.size, 0);
    assert.equal(track(LEAD, intent, send, saved, ADS), true);
    track(LEAD, intent, send, saved, ADS);
    createShopifySavedLeadTracker()(LEAD, intent, send, saved, ADS);
    assert.deepEqual(calls, [
      ['event', 'generate_lead', { lead_source: intent === 'quote' ? 'shopify_quote' : 'shopify_store_checkout', event_id: LEAD, send_to: 'G-4V3XW7Q5EG' }],
      ['event', 'conversion', { transaction_id: LEAD, send_to: ADS }],
    ]);
    for (const invalid of ['customer@example.com', 'lead-' + '-'.repeat(36), '', 'ZVT-' + 'a'.repeat(32)]) {
      assert.equal(track(invalid, intent, send, saved, ADS), false);
    }
    assert.equal(calls.length, 2);
  }
});

test('a dedicated Ads lead action can be added later without resending GA4 and failures remain retryable', () => {
  const track = createShopifySavedLeadTracker(); const saved = storage(); const calls = [];
  let failAds = true;
  const send = (...args) => { if (args[1] === 'conversion' && failAds) throw Error('Unavailable'); calls.push(args); };
  assert.equal(track(LEAD, 'checkout', send, saved), true);
  assert.equal(track(LEAD, 'checkout', send, saved, ADS), false);
  assert.equal(calls.length, 1);
  failAds = false;
  assert.equal(track(LEAD, 'checkout', send, saved, ADS), true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1][1], 'conversion');
  const legacy = storage(); legacy.setItem(`zevitech-shopify-quote-v1:${LEAD}`, 'sent');
  const migrated = [];
  createShopifySavedLeadTracker()(LEAD, 'quote', (...args) => migrated.push(args), legacy, ADS);
  assert.deepEqual(migrated.map(call => call[1]), ['conversion']);
});

test('storage failure still permits memory-deduplicated saved-lead conversion', () => {
  const blocked = { getItem() { throw Error('Blocked'); }, setItem() { throw Error('Blocked'); } };
  const track = createShopifySavedLeadTracker(); const calls = [];
  const send = processedRecorder(calls);
  assert.equal(track(LEAD, 'checkout', send, blocked, ADS), true);
  track(LEAD, 'checkout', send, blocked, ADS);
  assert.equal(calls.length, 2);
});

test('saved-form queue acceptance does not suppress a retry after reload and each tag callback persists independently', () => {
  const track = createShopifySavedLeadTracker(); const saved = storage(); const queued = [];
  const enqueue = (...args) => queued.push(args);
  assert.equal(track(LEAD, 'checkout', enqueue, saved, ADS), true);
  assert.equal(queued.length, 2);
  assert.equal(saved.values.size, 0, 'queue acceptance is not a Google tag callback');
  track(LEAD, 'checkout', enqueue, saved, ADS);
  assert.equal(queued.length, 2, 'same-page repeats do not enqueue duplicate lead events');

  // GA4 processes its event, but navigation interrupts the Ads action.
  queued.find(call => call[1] === 'generate_lead')[2].event_callback();
  assert.equal(saved.values.size, 1);
  const reloaded = [];
  createShopifySavedLeadTracker()(LEAD, 'checkout', processedRecorder(reloaded), saved, ADS);
  assert.deepEqual(reloaded, [['event', 'conversion', { transaction_id: LEAD, send_to: ADS }]]);
  assert.equal(saved.values.size, 2);
  createShopifySavedLeadTracker()(LEAD, 'checkout', processedRecorder(reloaded), saved, ADS);
  assert.equal(reloaded.length, 1, 'tag-callback markers prevent later replays');
});

test('a late Google tag is retried on production only, configured before the saved-form conversion', () => {
  const oldWindow = globalThis.window; const oldTimer = globalThis.setTimeout;
  const oldMode = process.env.NODE_ENV; const oldLead = process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO;
  const callbacks = []; const calls = [];
  try {
    process.env.NODE_ENV = 'production'; process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO = ADS;
    globalThis.setTimeout = callback => { callbacks.push(callback); return 1; };
    globalThis.window = { location: { hostname: 'preview.vercel.app' }, localStorage: storage() };
    trackShopifySavedLead(LEAD, 'checkout');
    assert.equal(callbacks.length, 0);
    globalThis.window.location.hostname = 'www.zevitech.com';
    trackShopifySavedLead(LEAD, 'checkout');
    assert.equal(callbacks.length, 1);
    globalThis.window.gtag = (...args) => calls.push(args);
    callbacks.shift()();
    assert.deepEqual(calls.map(call => call[0] === 'config' ? 'config' : call[1]), ['config', 'generate_lead', 'conversion']);
    trackShopifySavedLead(LEAD, 'checkout');
    assert.equal(calls.length, 3);
  } finally {
    globalThis.setTimeout = oldTimer;
    if (oldWindow === undefined) delete globalThis.window; else globalThis.window = oldWindow;
    if (oldMode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = oldMode;
    if (oldLead === undefined) delete process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO; else process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO = oldLead;
  }
});

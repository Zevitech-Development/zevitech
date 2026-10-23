// Isolated analytics regression tests. No browser, provider or network requests.
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
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
};

const { shopifyCheckoutEvents, createShopifyCheckoutTracker, startShopifyCheckoutTracking } = require('../src/lib/shopify-checkout-analytics.ts');
const { readShopifyCheckoutAttribution, captureShopifyCheckoutAttribution } = require('../src/lib/shopify-checkout-attribution-client.ts');
const { ShopifyStudioSchema, ShopifyStudioCheckoutDetailsSchema } = require('../src/schemas/shopify-studio-schema.ts');
const GA4 = 'G-4V3XW7Q5EG';
const ADS_PURCHASE = 'AW-17789624484/test-purchase_action';
const order = (patch = {}) => ({
  id: 'ZVT-' + 'a'.repeat(32), status: 'created', packageName: 'Beginner',
  amount: 249, currency: 'USD', mode: 'live', briefFingerprint: 'b'.repeat(64), ...patch,
});
const paidOrder = (patch = {}) => order({ status: 'paid', transactionId: 'gateway-sale_123', ...patch });
function markerStorage() {
  const values = new Map();
  return {
    values,
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}
function recorder() {
  const calls = [];
  return { calls, send: (command, name, params) => {
    const { event_callback, ...payload } = params;
    calls.push([command, name, payload]);
    event_callback?.();
  } };
}

test('sandbox, cancelled and invalid public orders produce no analytics or markers', () => {
  const invalid = [
    { mode: 'sandbox' }, { status: 'cancelled' }, { id: 'customer@example.com' },
    { id: 'ZVT-' + 'a'.repeat(31) }, { currency: 'PKR' },
    ...[0, -1, NaN, Infinity, -Infinity, '249', null, undefined].map(amount => ({ amount })),
  ];
  const dispatch = createShopifyCheckoutTracker();
  const storage = markerStorage();
  const { calls, send } = recorder();
  for (const patch of invalid) {
    assert.deepEqual(shopifyCheckoutEvents(paidOrder(patch), ADS_PURCHASE), [], JSON.stringify(patch));
    assert.equal(dispatch(paidOrder(patch), send, storage, ADS_PURCHASE), true);
  }
  assert.deepEqual(calls, []);
  assert.equal(storage.values.size, 0);
});

test('created, processing, pending and declined orders cannot report purchase revenue', () => {
  for (const status of ['created', 'processing', 'pending', 'declined']) {
    const events = shopifyCheckoutEvents(order({ status, transactionId: 'not-a-confirmed-sale' }), ADS_PURCHASE);
    assert.deepEqual(events.map(event => event.name), ['begin_checkout']);
    assert.equal(events.some(event => event.name === 'purchase' || event.name === 'conversion'), false);
    assert.equal(events.some(event => event.name === 'generate_lead'), false);
  }
});

test('a paid status still requires a nonempty valid gateway transaction before purchase', () => {
  for (const transactionId of [undefined, null, '', 'has spaces', 'name@example.com', 'x'.repeat(101)]) {
    const events = shopifyCheckoutEvents(paidOrder({ transactionId }), ADS_PURCHASE);
    assert.deepEqual(events.map(event => event.name), ['begin_checkout']);
  }
});

test('confirmed live purchases use the stable server order ID and exact server amount', () => {
  const confirmed = paidOrder({ packageName: 'Advanced', amount: 2099 });
  const events = shopifyCheckoutEvents(confirmed);
  assert.deepEqual(events.map(event => event.name), ['begin_checkout', 'purchase']);
  const purchase = events.find(event => event.name === 'purchase');
  assert.deepEqual(purchase, {
    name: 'purchase', destination: GA4,
    params: {
      currency: 'USD', value: 2099, transaction_id: confirmed.id,
      items: [{ item_id: 'shopify-advanced', item_name: 'Advanced Shopify development', price: 2099, quantity: 1 }],
    },
  });
  assert.notEqual(purchase.params.transaction_id, confirmed.transactionId);
  assert.deepEqual(events[0].params.items, purchase.params.items);
  assert.equal(events[0].params.value, confirmed.amount);
});

test('deposit purchases and Ads conversions report only collected money, not the full package value', () => {
  const deposit = paidOrder({
    amount: 24.9, totalAmount: 249, upfrontAmount: 24.9, balanceAmount: 224.1,
    amountPaid: 24.9, paymentStage: 'upfront', paymentVersion: 'upfront-10-v2',
  });
  const events = shopifyCheckoutEvents(deposit, ADS_PURCHASE);
  assert.deepEqual(events.map(event => event.name), ['begin_checkout', 'purchase', 'conversion']);
  for (const event of events) {
    assert.equal(event.params.value, 24.9);
    assert.notEqual(event.params.value, deposit.totalAmount);
  }
  const purchase = events.find(event => event.name === 'purchase');
  assert.equal(purchase.params.items[0].price, 24.9);
  assert.match(purchase.params.items[0].item_name, /10% upfront/);
  assert.equal(purchase.params.payment_stage, 'upfront');
  assert.equal(purchase.params.transaction_id, deposit.id);
  for (const patch of [
    { amount: 249 }, { amountPaid: 249 }, { amountPaid: 0 },
    { totalAmount: 1 }, { balanceAmount: 0 }, { upfrontAmount: 249 }, { paymentVersion: 'legacy-full-v1' },
  ]) assert.deepEqual(shopifyCheckoutEvents({ ...deposit, ...patch }, ADS_PURCHASE), []);
});

test('a recovered legacy full-payment receipt still reports its original collected amount', () => {
  const legacy = paidOrder({
    amount: 249, totalAmount: 249, upfrontAmount: 0, balanceAmount: 0,
    amountPaid: 249, paymentStage: 'full', paymentVersion: 'legacy-full-v1',
  });
  const purchase = shopifyCheckoutEvents(legacy).find(event => event.name === 'purchase');
  assert.equal(purchase.params.value, 249);
  assert.equal(purchase.params.items[0].price, 249);
  assert.equal(purchase.params.items[0].item_name.includes('upfront'), false);
});

test('extraneous private order properties never enter event payloads or marker storage', () => {
  const publicOrder = paidOrder();
  const withPrivateData = {
    ...publicOrder,
    email: 'private@example.com', phone: '+1 (202) 555-0199', name: 'Private Customer',
    brand: 'Private Brand', brief: { business: { email: 'private@example.com', phone: '+1 (202) 555-0199', brief: 'Private business plans' } },
    billing: { address: 'Private Street' }, accessToken: 'private-access-token',
    paymentToken: 'private-payment-token', attribution: { gclid: 'private-click-id' },
  };
  assert.deepEqual(shopifyCheckoutEvents(withPrivateData, ADS_PURCHASE), shopifyCheckoutEvents(publicOrder, ADS_PURCHASE));
  const storage = markerStorage();
  const { calls, send } = recorder();
  assert.equal(createShopifyCheckoutTracker()(withPrivateData, send, storage, ADS_PURCHASE), true);
  const serialized = JSON.stringify({ calls, markers: [...storage.values] });
  for (const forbidden of ['private@example.com', '+1 (202) 555-0199', 'Private Customer', 'Private Brand', 'Private business plans', 'Private Street', 'private-access-token', 'private-payment-token', 'private-click-id', publicOrder.briefFingerprint, publicOrder.transactionId]) {
    assert.equal(serialized.includes(forbidden), false, `Private value leaked: ${forbidden}`);
  }
  for (const [command, , params] of calls) {
    assert.equal(command, 'event');
    assert.equal(Object.hasOwn(params, 'brief'), false);
    assert.equal(Object.hasOwn(params, 'email'), false);
    assert.equal(Object.hasOwn(params, 'phone'), false);
  }
});

test('persistent dedupe survives repeat calls and a new tracker after page reload', () => {
  const storage = markerStorage();
  const { calls, send } = recorder();
  const dispatch = createShopifyCheckoutTracker();
  const confirmed = paidOrder();
  assert.equal(dispatch(confirmed, send, storage, ADS_PURCHASE), true);
  assert.equal(calls.length, 3);
  assert.equal(storage.values.size, 3);
  assert.equal(dispatch(confirmed, send, storage, ADS_PURCHASE), true);
  assert.equal(createShopifyCheckoutTracker()(confirmed, send, storage, ADS_PURCHASE), true);
  assert.equal(calls.length, 3);
  // Another actual server order must not be suppressed by the first order's markers.
  dispatch(paidOrder({ id: 'ZVT-' + 'c'.repeat(32) }), send, storage, ADS_PURCHASE);
  assert.equal(calls.length, 6);
});

test('gtag loading late does not consume markers before a sender is available', () => {
  const dispatch = createShopifyCheckoutTracker();
  const storage = markerStorage();
  const { calls, send } = recorder();
  assert.equal(dispatch(paidOrder(), undefined, storage, ADS_PURCHASE), false);
  assert.equal(storage.values.size, 0);
  assert.equal(dispatch(paidOrder(), send, storage, ADS_PURCHASE), true);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout', 'purchase', 'conversion']);
  assert.equal(storage.values.size, 3);
});

test('unavailable browser storage does not interrupt events or in-memory dedupe', () => {
  const storage = {
    getItem() { throw new Error('Storage access blocked'); },
    setItem() { throw new Error('Storage quota exceeded'); },
  };
  const { calls, send } = recorder();
  const dispatch = createShopifyCheckoutTracker();
  assert.equal(dispatch(paidOrder(), send, storage, ADS_PURCHASE), true);
  assert.equal(dispatch(paidOrder(), send, storage, ADS_PURCHASE), true);
  assert.equal(calls.length, 3);
});

test('pending payment recovery adds only purchase when the same order becomes paid', () => {
  const storage = markerStorage();
  const { calls, send } = recorder();
  assert.equal(createShopifyCheckoutTracker()(order({ status: 'pending' }), send, storage), true);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout']);
  // Recovery can happen in a fresh component or on a later visit.
  const recovered = createShopifyCheckoutTracker();
  assert.equal(recovered(paidOrder(), send, storage), true);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout', 'purchase']);
  recovered(paidOrder(), send, storage);
  assert.equal(calls.length, 2);
});

test('sender failures remain retryable while successful events are not repeated', () => {
  const storage = markerStorage();
  const dispatch = createShopifyCheckoutTracker();
  const accepted = [];
  let failPurchase = true;
  const sender = (command, name, params) => {
    if (name === 'purchase' && failPurchase) throw new Error('gtag unavailable');
    accepted.push([command, name, params]);
    params.event_callback?.();
  };
  assert.equal(dispatch(paidOrder(), sender, storage), false);
  assert.deepEqual(accepted.map(call => call[1]), ['begin_checkout']);
  assert.equal(storage.values.size, 1);
  failPurchase = false;
  assert.equal(dispatch(paidOrder(), sender, storage), true);
  assert.deepEqual(accepted.map(call => call[1]), ['begin_checkout', 'purchase']);
  assert.equal(storage.values.size, 2);
});

test('optional Ads purchase action is separate from GA4 and can be added after GA4 succeeds', () => {
  const storage = markerStorage();
  const dispatch = createShopifyCheckoutTracker();
  const { calls, send } = recorder();
  const confirmed = paidOrder();
  dispatch(confirmed, send, storage);
  assert.equal(calls.length, 2);
  assert.equal(calls.every(call => call[2].send_to === GA4), true);
  dispatch(confirmed, send, storage, ADS_PURCHASE);
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[2], ['event', 'conversion', {
    currency: 'USD', value: confirmed.amount, transaction_id: confirmed.id, send_to: ADS_PURCHASE,
  }]);
  createShopifyCheckoutTracker()(confirmed, send, storage, ADS_PURCHASE);
  assert.equal(calls.length, 3);
  assert.equal(calls.filter(call => call[1] === 'purchase').length, 1);
});

test('missing or malformed Ads destinations cannot reuse an arbitrary conversion action', () => {
  for (const destination of [undefined, '', GA4, 'AW-17789624484', 'AW-17789624484/', 'AW-example/purchase', 'AW-17789624484/with spaces', 'AW-17789624484/purchase?email=private@example.com', 'https://example.com/conversion']) {
    const events = shopifyCheckoutEvents(paidOrder(), destination);
    assert.deepEqual(events.map(event => event.name), ['begin_checkout', 'purchase']);
    assert.equal(events.every(event => event.destination === GA4), true);
  }
});

test('a queued but unprocessed purchase is not permanently suppressed after full-page navigation', () => {
  const saved = markerStorage();
  const firstDocument = createShopifyCheckoutTracker();
  const queued = [];
  const enqueue = (...args) => queued.push(args);
  assert.equal(firstDocument(paidOrder(), enqueue, saved, ADS_PURCHASE), true);
  assert.equal(queued.length, 3);
  assert.equal(saved.values.size, 0, 'gtag queue acceptance is not dispatch confirmation');
  firstDocument(paidOrder(), enqueue, saved, ADS_PURCHASE);
  assert.equal(queued.length, 3, 'rerenders do not enqueue immediate duplicate events');

  // The first document unloads before the external Google library drains it.
  const nextDocument = createShopifyCheckoutTracker();
  const { calls, send } = recorder();
  assert.equal(nextDocument(paidOrder(), send, saved, ADS_PURCHASE), true);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout', 'purchase', 'conversion']);
  assert.equal(saved.values.size, 3);
  createShopifyCheckoutTracker()(paidOrder(), send, saved, ADS_PURCHASE);
  assert.equal(calls.length, 3, 'an acknowledged conversion survives subsequent reloads');
});

test('callbacks acknowledge destinations independently so a lost Ads dispatch can recover without repeating GA4 purchase', () => {
  const saved = markerStorage(); const queued = [];
  createShopifyCheckoutTracker()(paidOrder(), (...args) => queued.push(args), saved, ADS_PURCHASE);
  queued.find(call => call[1] === 'begin_checkout')[2].event_callback();
  queued.find(call => call[1] === 'purchase')[2].event_callback();
  assert.equal(saved.values.size, 2);
  const { calls, send } = recorder();
  createShopifyCheckoutTracker()(paidOrder(), send, saved, ADS_PURCHASE);
  assert.deepEqual(calls.map(call => call[1]), ['conversion']);
  assert.equal(calls[0][2].transaction_id, paidOrder().id);
  assert.equal(calls[0][2].value, paidOrder().amount);
});

test('checkout retains begin_checkout but defers paid events until the confirmed thank-you page', () => {
  const saved = markerStorage(); const dispatch = createShopifyCheckoutTracker();
  const { calls, send } = recorder();
  const tracker = value => dispatch(value, send, saved, ADS_PURCHASE);
  startShopifyCheckoutTracking(order(), 'checkout', tracker);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout']);
  startShopifyCheckoutTracking(paidOrder(), 'checkout', tracker);
  assert.equal(calls.length, 1, 'the page about to redirect does not queue purchase');
  startShopifyCheckoutTracking(order({ status: 'pending' }), 'confirmation', tracker);
  startShopifyCheckoutTracking(order({ status: 'declined' }), 'confirmation', tracker);
  assert.equal(calls.length, 1);
  startShopifyCheckoutTracking(paidOrder(), 'confirmation', tracker);
  assert.deepEqual(calls.map(call => call[1]), ['begin_checkout', 'purchase', 'conversion']);
});

test('confirmed receipt tracking starts immediately and tolerates a tag arriving after twenty seconds', () => {
  const oldSet = globalThis.setTimeout; const oldClear = globalThis.clearTimeout;
  const jobs = new Map(); let id = 0; let available = false; let attempts = 0;
  try {
    globalThis.setTimeout = callback => { jobs.set(++id, callback); return id; };
    globalThis.clearTimeout = handle => jobs.delete(handle);
    const stop = startShopifyCheckoutTracking(paidOrder(), 'confirmation', () => { attempts++; return available; });
    assert.equal(attempts, 1, 'no extra one-second delay on the thank-you page');
    for (let tick = 0; tick < 25; tick++) {
      const [handle, job] = jobs.entries().next().value; jobs.delete(handle); job();
    }
    assert.equal(attempts, 26);
    available = true;
    const [handle, job] = jobs.entries().next().value; jobs.delete(handle); job();
    assert.equal(attempts, 27);
    assert.equal(jobs.size, 0);
    stop();
    const cancel = startShopifyCheckoutTracking(paidOrder(), 'confirmation', () => false);
    assert.equal(jobs.size, 1);
    cancel();
    assert.equal(jobs.size, 0, 'unmounted receipt cancels its retries');
  } finally { globalThis.setTimeout = oldSet; globalThis.clearTimeout = oldClear; }
});

const ATTRIBUTION_KEY = 'zevitech-shopify-attribution-v2';
const LEGACY_ATTRIBUTION_KEY = 'zevitech-google-ads-attribution';
function withFakeWindow(fake, run) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  try {
    Object.defineProperty(globalThis, 'window', { configurable: true, writable: true, value: fake });
    return run();
  } finally {
    if (previous) Object.defineProperty(globalThis, 'window', previous);
    else delete globalThis.window;
  }
}
function browserWithQuery(query = '', storage = markerStorage(), localStorage = markerStorage()) {
  return { sessionStorage: storage, localStorage, location: { search: query, pathname: '/landing-pages/shopify-development' } };
}

test('attribution helpers are safe without a browser and leave globals restored', () => {
  withFakeWindow(undefined, () => {
    assert.equal(readShopifyCheckoutAttribution(), undefined);
    assert.doesNotThrow(() => captureShopifyCheckoutAttribution());
  });
});

test('a new explicit ad click replaces previous attribution including Google braid IDs and utm_id', () => {
  const expected = { gclid: 'google_click-1', gbraid: 'google_braid-2', wbraid: 'web_braid-3', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'Shopify Development', utm_id: 'campaign_123' };
  const browser = browserWithQuery('?' + new URLSearchParams(expected));
  withFakeWindow(browser, () => {
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(browser.sessionStorage.getItem(ATTRIBUTION_KEY)).attribution, expected);
    browser.location.search = '?gclid=second-click&utm_source=other-source&utm_id=second-campaign';
    const second = { gclid: 'second-click', utm_source: 'other-source', utm_id: 'second-campaign' };
    assert.deepEqual(readShopifyCheckoutAttribution(), second);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(browser.sessionStorage.getItem(ATTRIBUTION_KEY)).attribution, second);
  });
});

test('only sanitized attribution fields are persisted, with no raw URL or contact details', () => {
  const query = new URLSearchParams({
    gclid: 'click_123', utm_source: 'google', utm_id: 'campaign_123',
    name: 'Private Customer', email: 'private@example.com', phone: '+12025550199',
    landingPage: 'https://example.com/?email=private@example.com', redirect: 'https://example.com/private',
  });
  const browser = browserWithQuery('?' + query);
  withFakeWindow(browser, () => {
    captureShopifyCheckoutAttribution();
    assert.deepEqual([...browser.sessionStorage.values.keys()], [ATTRIBUTION_KEY]);
    assert.deepEqual(JSON.parse(browser.sessionStorage.getItem(ATTRIBUTION_KEY)).attribution, { gclid: 'click_123', utm_source: 'google', utm_id: 'campaign_123' });
    const serialized = browser.sessionStorage.getItem(ATTRIBUTION_KEY);
    for (const forbidden of ['private@example.com', '+12025550199', 'Private Customer', 'landingPage', 'https:', '/landing-pages/', 'redirect']) {
      assert.equal(serialized.includes(forbidden), false, `Unexpected browser attribution data: ${forbidden}`);
    }
  });
});

test('invalid query fields are dropped while valid campaign fields remain usable', () => {
  const browser = browserWithQuery('?' + new URLSearchParams({
    gclid: 'x'.repeat(241), gbraid: 'contains spaces', wbraid: 'private@example.com',
    utm_campaign: 'https://example.com/private', utm_term: 'private@example.com',
    utm_content: 'contains\nnewline', utm_medium: '', utm_source: 'google', utm_id: 'campaign-456',
  }));
  withFakeWindow(browser, () => {
    const expected = { utm_source: 'google', utm_id: 'campaign-456' };
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(browser.sessionStorage.getItem(ATTRIBUTION_KEY)).attribution, expected);
  });
});

test('an invalid-only live query cannot become valid through the legacy helper fallback', () => {
  for (const query of [
    { gclid: 'x'.repeat(241) },
    { utm_campaign: 'x'.repeat(241) },
    { utm_source: 'private@example.com', email: 'private@example.com' },
    { gbraid: 'invalid click', wbraid: 'https://example.com' },
  ]) {
    const browser = browserWithQuery('?' + new URLSearchParams(query));
    withFakeWindow(browser, () => {
      assert.equal(readShopifyCheckoutAttribution(), undefined, `Invalid-only query was accepted: ${Object.keys(query).join(', ')}`);
      captureShopifyCheckoutAttribution();
      assert.equal(browser.sessionStorage.values.size, 0);
    });
  }
});

test('blocked storage returns sanitized live attribution without interrupting the page', () => {
  const query = '?' + new URLSearchParams({ gclid: 'click_789', wbraid: 'web_789', utm_id: 'campaign_789', email: 'private@example.com', utm_term: 'private@example.com' });
  const expected = { gclid: 'click_789', wbraid: 'web_789', utm_id: 'campaign_789' };
  for (const storage of [
    { getItem() { throw new Error('Storage blocked'); }, setItem() { throw new Error('Storage blocked'); } },
    { getItem() { return null; }, setItem() { throw new Error('Storage quota exceeded'); } },
  ]) {
    withFakeWindow(browserWithQuery(query, storage), () => {
      assert.deepEqual(readShopifyCheckoutAttribution(), expected);
      assert.doesNotThrow(() => captureShopifyCheckoutAttribution());
    });
  }
  const browser = browserWithQuery(query);
  Object.defineProperty(browser, 'sessionStorage', { get() { throw new Error('Storage property denied'); } });
  withFakeWindow(browser, () => {
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    assert.doesNotThrow(() => captureShopifyCheckoutAttribution());
  });
});

test('stored legacy attribution is reused only after sanitizing raw URLs and private fields', () => {
  const storage = markerStorage();
  storage.setItem(LEGACY_ATTRIBUTION_KEY, JSON.stringify({
    gclid: 'legacy_click', utm_source: 'google', utm_campaign: 'Original campaign',
    landingPage: '/landing-pages/shopify-development?email=private@example.com',
    email: 'private@example.com', phone: '+12025550199', utm_term: 'private@example.com',
  }));
  withFakeWindow(browserWithQuery('', storage), () => {
    const expected = { gclid: 'legacy_click', utm_source: 'google', utm_campaign: 'Original campaign' };
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(storage.getItem(ATTRIBUTION_KEY)).attribution, expected);
    assert.equal(storage.getItem(ATTRIBUTION_KEY).includes('landingPage'), false);
    assert.equal(storage.getItem(ATTRIBUTION_KEY).includes('private@example.com'), false);
  });
});

test('malformed saved attribution recovers from the current valid query', () => {
  const storage = markerStorage();
  storage.setItem(ATTRIBUTION_KEY, '{broken-json');
  withFakeWindow(browserWithQuery('?gbraid=recovered_braid&utm_id=recovered_campaign', storage), () => {
    const expected = { gbraid: 'recovered_braid', utm_id: 'recovered_campaign' };
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(storage.getItem(ATTRIBUTION_KEY)).attribution, expected);
  });
});

test('allowlisted attribution survives a new browser session and direct or non-click visits cannot replace it', () => {
  const local = markerStorage();
  const first = browserWithQuery('?gclid=paid_click&utm_source=google&utm_id=campaign_1', markerStorage(), local);
  withFakeWindow(first, () => captureShopifyCheckoutAttribution());
  const captured = JSON.parse(local.getItem(ATTRIBUTION_KEY));
  const returning = browserWithQuery('?utm_source=direct_email&utm_campaign=later', markerStorage(), local);
  withFakeWindow(returning, () => {
    assert.deepEqual(readShopifyCheckoutAttribution(), captured.attribution);
    captureShopifyCheckoutAttribution();
    assert.equal(JSON.parse(local.getItem(ATTRIBUTION_KEY)).capturedAt, captured.capturedAt);
    returning.location.search = '';
    assert.deepEqual(readShopifyCheckoutAttribution(), captured.attribution);
    returning.location.search = '?wbraid=new_braid&utm_id=campaign_2';
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(local.getItem(ATTRIBUTION_KEY)).attribution, { wbraid: 'new_braid', utm_id: 'campaign_2' });
  });
});

test('attribution expires at 90 days without extending on direct visits or resurrecting legacy IDs', () => {
  const originalNow = Date.now;
  const now = 1800000000000;
  const local = markerStorage(); const session = markerStorage();
  const browser = browserWithQuery('', session, local);
  const record = { version: 2, capturedAt: now, attribution: { gclid: 'old_click', utm_source: 'google' } };
  local.setItem(ATTRIBUTION_KEY, JSON.stringify(record));
  session.setItem('zevitech-shopify-attribution-v1', JSON.stringify({ gclid: 'legacy_click' }));
  session.setItem(LEGACY_ATTRIBUTION_KEY, JSON.stringify({ gclid: 'legacy_generic' }));
  try {
    Date.now = () => now + 89 * 86400000;
    withFakeWindow(browser, () => {
      assert.deepEqual(readShopifyCheckoutAttribution(), record.attribution);
      captureShopifyCheckoutAttribution();
      assert.equal(JSON.parse(local.getItem(ATTRIBUTION_KEY)).capturedAt, now);
      Date.now = () => now + 90 * 86400000;
      assert.equal(readShopifyCheckoutAttribution(), undefined);
      assert.equal(readShopifyCheckoutAttribution(), undefined);
      assert.equal(local.getItem(ATTRIBUTION_KEY).includes('old_click'), false);
      assert.equal(session.getItem(ATTRIBUTION_KEY).includes('old_click'), false);
    });
  } finally { Date.now = originalNow; }
});

test('legacy Shopify session attribution migrates safely into persistent storage', () => {
  const session = markerStorage(); const local = markerStorage();
  session.setItem('zevitech-shopify-attribution-v1', JSON.stringify({ gbraid: 'legacy_braid', utm_id: 'legacy_campaign', email: 'private@example.com' }));
  withFakeWindow(browserWithQuery('', session, local), () => {
    captureShopifyCheckoutAttribution();
    const saved = JSON.parse(local.getItem(ATTRIBUTION_KEY));
    assert.equal(saved.version, 2);
    assert.equal(Number.isFinite(saved.capturedAt), true);
    assert.deepEqual(saved.attribution, { gbraid: 'legacy_braid', utm_id: 'legacy_campaign' });
    assert.equal(local.getItem(ATTRIBUTION_KEY).includes('private@example.com'), false);
  });
});

test('an invalid incoming click does not discard valid persistent attribution', () => {
  const local = markerStorage();
  const expected = { gclid: 'known_click', utm_id: 'known_campaign' };
  local.setItem(ATTRIBUTION_KEY, JSON.stringify({ version: 2, capturedAt: Date.now(), attribution: expected }));
  withFakeWindow(browserWithQuery('?gclid=private@example.com&utm_id=other_campaign', markerStorage(), local), () => {
    assert.deepEqual(readShopifyCheckoutAttribution(), expected);
    captureShopifyCheckoutAttribution();
    assert.deepEqual(JSON.parse(local.getItem(ATTRIBUTION_KEY)).attribution, expected);
  });
});

test('business details can stay empty during browsing but become mandatory at checkout', () => {
  const browsingFields = ShopifyStudioSchema.pick({ brand: true, brief: true });
  assert.equal(browsingFields.safeParse({ brand: '', brief: '' }).success, true);
  const details = { name: 'Example Customer', email: 'customer@example.com', phone: '+1 (202) 555-0123', brand: 'Example', brief: 'An online store for everyday products.' };
  assert.equal(ShopifyStudioCheckoutDetailsSchema.safeParse(details).success, true);
  for (const field of ['brand', 'brief']) {
    assert.equal(ShopifyStudioCheckoutDetailsSchema.safeParse({ ...details, [field]: '   ' }).success, false);
  }
});

test('client and server accept the same phone formatting and reject embedded whitespace controls', () => {
  const { ShopifyCheckoutPhoneSchema } = require('../src/schemas/shopify-checkout-schema.ts');
  for (const phone of ['+1 (202) 555-0123', '  +44 20 7946 0958  ', '1234567', '+1\t2025550123', '+1\n2025550123', '+1\u00a02025550123', '123456', '1234567890123456']) {
    assert.equal(ShopifyStudioSchema.shape.phone.safeParse(phone).success, ShopifyCheckoutPhoneSchema.safeParse(phone).success);
  }
});

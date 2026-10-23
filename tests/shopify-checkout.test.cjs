// Local, dependency-injected payment tests. No provider or datastore requests.
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

const { createShopifyCheckoutOrder, payShopifyCheckout, checkShopifyCheckout, cancelShopifyCheckout } = require('../src/services/shopify-checkout-service.ts');
const { parseNmiChargeResponse, parseNmiQueryResponse, createNmiCheckoutGateway } = require('../src/services/shopify-checkout-nmi.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { getShopifyPaymentSchedule, SHOPIFY_PAYMENT_VERSION } = require('../src/lib/shopify-payment-schedule.ts');
const { ShopifyCheckoutPaySchema, ShopifyCheckoutPhoneSchema, ShopifyCheckoutBriefSchema } = require('../src/schemas/shopify-checkout-schema.ts');
const { shopifyCheckoutConfig } = require('../src/services/shopify-checkout-http.ts');
const { resolveCheckoutRedisConfig } = require('../src/services/shopify-checkout-store.ts');
const { sanitizeShopifyCheckoutAttribution } = require('../src/lib/shopify-checkout-attribution.ts');

function memoryStore() {
  const data = new Map();
  const tokens = new Set();
  return {
    data, failFinish: false,
    async create(order) { if (!data.has(order.id)) data.set(order.id, structuredClone(order)); return structuredClone(data.get(order.id)); },
    async get(id) { return data.has(id) ? structuredClone(data.get(id)) : null; },
    async claim(id, tokenHash, attemptId) {
      const order = data.get(id);
      if (!['created', 'declined'].includes(order.status) || order.attempts >= 3 || tokens.has(tokenHash)) return false;
      tokens.add(tokenHash); Object.assign(order, { status: 'processing', attemptId, gatewayOrderId: 'ZVP-' + attemptId.replaceAll('-', ''), attempts: order.attempts + 1 }); return true;
    },
    async finish(id, attemptId, patch) {
      if (this.failFinish) throw new Error('datastore unavailable');
      const order = data.get(id); assert.equal(order.attemptId, attemptId); Object.assign(order, patch);
    },
    async cancel(id) { const order = data.get(id); if (!['created', 'declined'].includes(order.status)) return false; order.status = 'cancelled'; return true; },
    async rateLimit() { return true; },
  };
}
const input = () => ({
  requestId: '12345678-1234-4234-8234-123456789012', accessToken: 'a'.repeat(64), acceptedTerms: true,
  brief: {
    version: 2, package: { name: 'Beginner', price: 1, productLimit: 99999, currency: 'GBP' },
    business: { name: 'Example Customer', email: 'customer@example.com', phone: '+1 (202) 555-0123', brand: 'Example', brief: 'Example store', projectType: 'New store', requirements: '' },
    design: { template: 'Editorial', layout: 'editorial', palette: 'ocean' }, imageFilenames: [], logoFilename: '', priorities: [],
    needs: { productCount: '10', featureIds: [], scopeConfirmed: true },
  },
});
const pay = (order) => ({ orderId: order.id, accessToken: 'a'.repeat(64), paymentToken: 'test-token-123456789', briefFingerprint: order.briefFingerprint || 'b'.repeat(64), acceptedTerms: true, billing: { firstName: 'Example', lastName: 'Customer', address: '123 Example Road', city: 'Example', state: 'CA', postalCode: '90001', country: 'US' } });
const approved = { status: 'paid', transactionId: '123456789', gatewayCode: '100' };

test('amount, currency and included scope are owned by server catalogue', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  assert.equal(order.amount, 24.9); assert.equal(order.currency, 'USD');
  const saved = await store.get(order.id); assert.equal(saved.productLimit, 10); assert.equal(saved.brief.package.price, undefined);
});

test('all six packages charge the 10% deposit once and retain the 90% delivery balance', async () => {
  const expected = [
    [249, 24.9, 224.1], [599, 59.9, 539.1], [999, 99.9, 899.1],
    [1499, 149.9, 1349.1], [2499, 249.9, 2249.1], [4999, 499.9, 4499.1],
  ];
  assert.equal(studioPlans.length, expected.length);
  for (const [index, plan] of studioPlans.entries()) {
    const request = input();
    request.brief.package.name = plan.name;
    request.brief.package.paymentSchedule = { total: 1, upfront: 0.01, balance: 0 };
    request.paymentSchedule = { total: 1, upfront: 0.01, balance: 0 };
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
    const [total, upfront, balance] = expected[index];
    assert.deepEqual([order.totalAmount, order.amount, order.balanceAmount], [total, upfront, balance]);
    assert.equal(order.upfrontAmount, upfront);
    assert.equal(order.amountPaid, 0);
    assert.equal(order.paymentStage, 'upfront');
    assert.equal(order.paymentVersion, SHOPIFY_PAYMENT_VERSION);
    let charges = 0;
    const gateway = { charge: async charged => {
      charges++;
      assert.equal(charged.amount, upfront);
      assert.equal(charged.totalAmount, total);
      return approved;
    } };
    const receipt = await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
    await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
    assert.equal(charges, 1);
    assert.equal(receipt.amountPaid, upfront);
    assert.equal(receipt.balanceAmount, balance);
    assert.equal(receipt.paymentStage, 'upfront');
    const saved = await store.get(order.id);
    assert.equal(saved.amountPaid, upfront);
    assert.equal(saved.consentVersion, 'shopify-development-10-upfront-delivery-2026-10-23');
    assert.equal(saved.brief.package.paymentSchedule, undefined);
    assert.equal(saved.paymentSchedule, undefined);
  }
});

function makeLegacyOrder(store, id, status) {
  const legacy = store.data.get(id);
  for (const field of ['totalAmount', 'upfrontAmount', 'balanceAmount', 'amountPaid', 'paymentStage', 'paymentVersion']) delete legacy[field];
  Object.assign(legacy, { amount: 249, status, consentVersion: 'shopify-development-2026-10-19' });
  return legacy;
}

test('legacy uncharged full-price sessions cannot charge or silently change payment terms', async () => {
  for (const status of ['created', 'declined']) {
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
    makeLegacyOrder(store, order.id, status);
    let charges = 0;
    const gateway = { charge: async () => { charges++; return approved; } };
    await assert.rejects(createShopifyCheckoutOrder(input(), store, 'sandbox'), { code: 'PAYMENT_TERMS_CHANGED' });
    await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'), { code: 'PAYMENT_TERMS_CHANGED' });
    assert.equal(charges, 0);
    assert.equal(store.data.get(order.id).attempts, 0);
    const recoverable = await checkShopifyCheckout(order.id, input().accessToken, store, gateway, 'sandbox');
    assert.equal(recoverable.amount, 249);
    assert.equal(recoverable.paymentStage, 'full');
    assert.equal(recoverable.amountPaid, 0);
    assert.equal((await cancelShopifyCheckout(order.id, input().accessToken, store)).status, 'cancelled');
    const fresh = input(); fresh.requestId = '98765432-1234-4234-8234-123456789012';
    assert.equal((await createShopifyCheckoutOrder(fresh, store, 'sandbox')).amount, 24.9);
  }
});

test('legacy approved and uncertain full-payment records preserve the original sale and cannot be charged again', async () => {
  for (const status of ['paid', 'processing', 'pending']) {
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
    const legacy = makeLegacyOrder(store, order.id, status);
    legacy.attemptId = 'legacy-attempt';
    legacy.updatedAt = new Date(Date.now() - 60000).toISOString();
    if (status === 'paid') legacy.transactionId = approved.transactionId;
    let charges = 0, queries = 0;
    const gateway = {
      charge: async () => { charges++; return approved; },
      reconcile: async saved => { queries++; assert.equal(saved.amount, 249); return approved; },
    };
    await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
    const receipt = await checkShopifyCheckout(order.id, input().accessToken, store, gateway, 'sandbox');
    assert.equal(charges, 0);
    assert.equal(queries, status === 'paid' ? 0 : 1);
    assert.equal(receipt.status, 'paid');
    assert.equal(receipt.paymentStage, 'full');
    assert.equal(receipt.paymentVersion, 'legacy-full-v1');
    assert.equal(receipt.totalAmount, 249);
    assert.equal(receipt.amountPaid, 249);
    assert.equal(receipt.upfrontAmount, 0);
    assert.equal(receipt.balanceAmount, 0);
  }
});

test('tampered persisted instalment fields cannot reach a gateway or consume a payment token', async () => {
  for (const patch of [
    { amount: 249 }, { amount: 1 }, { totalAmount: 250 }, { upfrontAmount: 1 },
    { balanceAmount: 0 }, { paymentStage: 'full' }, { paymentVersion: 'future-terms' },
  ]) {
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
    Object.assign(store.data.get(order.id), patch);
    let charges = 0;
    const gateway = { charge: async () => { charges++; return approved; } };
    await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'), { code: 'PAYMENT_TERMS_CHANGED' });
    assert.equal(charges, 0);
    assert.equal(store.data.get(order.id).attempts, 0);
  }
});

test('the NMI request sends the exact deposit and identifies it as an upfront payment', async () => {
  const previousFetch = globalThis.fetch;
  const previousMode = process.env.SHOPIFY_CHECKOUT_MODE;
  const previousSecret = process.env.NMI_SECURITY_KEY;
  try {
    process.env.SHOPIFY_CHECKOUT_MODE = 'sandbox';
    process.env.NMI_SECURITY_KEY = 'offline-test-key';
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
    const saved = await store.get(order.id);
    let requests = 0;
    globalThis.fetch = async (url, options) => {
      requests++;
      assert.equal(url, 'https://sandbox.nmi.com/api/transact.php');
      assert.equal(options.body.get('amount'), '24.90');
      assert.equal(options.body.get('currency'), 'USD');
      assert.equal(options.body.get('orderid'), order.id);
      assert.match(options.body.get('order_description'), /10% upfront payment/);
      return { ok: true, text: async () => 'response=1&response_code=100&transactionid=123456789' };
    };
    assert.equal((await createNmiCheckoutGateway().charge(saved, pay(order))).status, 'paid');
    await assert.rejects(createNmiCheckoutGateway().charge({ ...saved, amount: 249 }, pay(order)), /PAYMENT_TERMS_CHANGED/);
    assert.equal(requests, 1);
  } finally {
    globalThis.fetch = previousFetch;
    previousMode === undefined ? delete process.env.SHOPIFY_CHECKOUT_MODE : process.env.SHOPIFY_CHECKOUT_MODE = previousMode;
    previousSecret === undefined ? delete process.env.NMI_SECURITY_KEY : process.env.NMI_SECURITY_KEY = previousSecret;
  }
});

test('payment schedules conserve exact cents and reject invalid or fractional-cent totals', () => {
  for (const [total, upfront, balance] of [[249, 24.9, 224.1], [4999, 499.9, 4499.1], [10.01, 1, 9.01], [10.02, 1, 9.02], [999.99, 100, 899.99]]) {
    assert.deepEqual(getShopifyPaymentSchedule(total), { total, upfront, balance });
    assert.equal(Math.round(upfront * 100) + Math.round(balance * 100), Math.round(total * 100));
  }
  for (const total of [NaN, Infinity, -Infinity, 0, -249, 249.001, Number.MAX_SAFE_INTEGER, '249', null, undefined]) {
    assert.throws(() => getShopifyPaymentSchedule(total), /INVALID_SHOPIFY_PACKAGE_TOTAL/);
  }
});
test('service and custom business classifications persist privately in the checkout brief', async () => {
  for (const classification of [
    { businessType: 'services', businessCategory: 'Professional services', customCategory: '' },
    { businessType: 'both', businessCategory: 'Beauty services', customCategory: '' },
    { businessType: 'services', businessCategory: 'Other / custom category', customCategory: 'Mobile pet grooming / at-home care' },
  ]) {
    const request = input();
    Object.assign(request.brief.business, classification);
    const parsed = ShopifyCheckoutBriefSchema.parse(request.brief);
    for (const [key, value] of Object.entries(classification)) assert.equal(parsed.business[key], value);
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
    const saved = await store.get(order.id);
    for (const [key, value] of Object.entries(classification)) assert.equal(saved.brief.business[key], value);
    assert.equal(saved.status, 'created');
    assert.equal(saved.attempts, 0);
    assert.equal(order.amount, 24.9);
    assert.equal(order.currency, 'USD');
    for (const key of ['business', 'businessType', 'businessCategory', 'customCategory']) assert.equal(order[key], undefined);
  }
});
test('custom business categories require a nonblank label before any order is persisted', async () => {
  for (const customCategory of [undefined, '', '   ']) {
    const request = input();
    Object.assign(request.brief.business, {
      businessType: 'services', businessCategory: 'Other / custom category', customCategory,
    });
    const parsed = ShopifyCheckoutBriefSchema.safeParse(request.brief);
    assert.equal(parsed.success, false);
    assert.ok(parsed.error.issues.some(issue => issue.path.join('.') === 'business.customCategory'));
    const store = memoryStore();
    await assert.rejects(createShopifyCheckoutOrder(request, store, 'sandbox'), { code: 'INVALID_DETAILS' });
    assert.equal(store.data.size, 0);
  }
});
test('older checkout briefs retain compatibility through product classification defaults', async () => {
  const request = input();
  assert.equal(request.brief.business.businessType, undefined);
  const parsed = ShopifyCheckoutBriefSchema.parse(request.brief);
  assert.equal(parsed.business.businessType, 'products');
  assert.equal(parsed.business.businessCategory, '');
  assert.equal(parsed.business.customCategory, '');
  const store = memoryStore();
  const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  const saved = await store.get(order.id);
  assert.equal(saved.brief.business.businessType, 'products');
  assert.equal(saved.brief.business.businessCategory, '');
  assert.equal(saved.brief.business.customCategory, '');
  assert.equal(saved.amount, 24.9);
});
test('unsupported scope, excess products, custom work and migration cannot bypass review', async () => {
  for (const alter of [x => x.brief.needs.featureIds.push('reviews'), x => x.brief.needs.productCount = '500', x => x.brief.business.requirements = 'Custom ERP integration', x => x.brief.business.projectType = 'Move to Shopify']) {
    const request = input(); alter(request);
    await assert.rejects(createShopifyCheckoutOrder(request, memoryStore(), 'sandbox'), { code: 'SCOPE_REVIEW_REQUIRED' });
  }
});
test('parallel submit and replay produce a single gateway charge', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox'); let charges = 0;
  const gateway = { charge: async () => { charges++; await new Promise(resolve => setTimeout(resolve, 5)); return approved; } };
  await Promise.all([payShopifyCheckout(pay(order), store, gateway, 'sandbox'), payShopifyCheckout(pay(order), store, gateway, 'sandbox')]);
  const again = await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
  assert.equal(charges, 1); assert.equal(again.status, 'paid'); assert.equal(again.transactionId, approved.transactionId);
});
test('timeout keeps order locked; a later verified query recovers the receipt', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox'); let charges = 0;
  const gateway = { charge: async () => { charges++; throw new Error('timeout'); }, reconcile: async () => approved };
  assert.equal((await payShopifyCheckout(pay(order), store, gateway, 'sandbox')).status, 'pending');
  await payShopifyCheckout({ ...pay(order), paymentToken: 'a-different-token' }, store, gateway, 'sandbox'); assert.equal(charges, 1);
  store.data.get(order.id).updatedAt = new Date(Date.now() - 60000).toISOString();
  assert.equal((await checkShopifyCheckout(order.id, 'a'.repeat(64), store, gateway, 'sandbox')).status, 'paid');
});
test('persistence failure after approval never unlocks a second charge', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox'); let charges = 0; store.failFinish = true;
  const gateway = { charge: async () => { charges++; return approved; } };
  await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'));
  assert.equal((await payShopifyCheckout(pay(order), store, gateway, 'sandbox')).status, 'processing'); assert.equal(charges, 1);
});
test('definite decline allows a new token, never reuse of the old token', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox'); let charges = 0;
  const gateway = { charge: async () => { charges++; return charges === 1 ? { status: 'declined' } : approved; } };
  assert.equal((await payShopifyCheckout(pay(order), store, gateway, 'sandbox')).status, 'declined');
  await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'), { code: 'PAYMENT_RETRY_BLOCKED' });
  assert.equal((await payShopifyCheckout({ ...pay(order), paymentToken: 'new-token-123456789' }, store, gateway, 'sandbox')).status, 'paid'); assert.equal(charges, 2);
});
test('wrong access token, mode and changed brief cannot claim an existing order', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  await assert.rejects(payShopifyCheckout({ ...pay(order), accessToken: 'b'.repeat(64) }, store, {}, 'sandbox'), { code: 'ORDER_NOT_FOUND' });
  await assert.rejects(payShopifyCheckout(pay(order), store, {}, 'live'), { code: 'CHECKOUT_MODE_CHANGED' });
  const changed = input(); changed.brief.business.name = 'Someone Else';
  await assert.rejects(createShopifyCheckoutOrder(changed, store, 'sandbox'), { code: 'CHECKOUT_ALREADY_EXISTS' });
});
test('validation rejects incomplete billing and ignores submitted extra amount', () => {
  const payment = pay({ id: 'ZVT-' + 'a'.repeat(32) });
  assert.equal(ShopifyCheckoutPaySchema.safeParse({ ...payment, billing: { ...payment.billing, postalCode: '' } }).success, false);
  assert.equal(ShopifyCheckoutPaySchema.parse({ ...payment, amount: 1 }).amount, undefined);
});
test('changed brief cannot pay the stale package; cancellation is atomic and limited to uncharged orders', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  await assert.rejects(payShopifyCheckout({ ...pay(order), briefFingerprint: 'c'.repeat(64) }, store, {}, 'sandbox'), { code: 'CHECKOUT_BRIEF_CHANGED' });
  assert.equal((await cancelShopifyCheckout(order.id, 'a'.repeat(64), store)).status, 'cancelled');
  await assert.rejects(payShopifyCheckout(pay(order), store, {}, 'sandbox'), { code: 'CHECKOUT_CANCELLED' });
  for (const status of ['processing', 'pending', 'paid']) {
    store.data.get(order.id).status = status;
    await assert.rejects(cancelShopifyCheckout(order.id, 'a'.repeat(64), store), { code: 'PAYMENT_RETRY_BLOCKED' });
  }
});
test('gateway response must be an approved sale, not an auth-like or ambiguous response', () => {
  assert.equal(parseNmiChargeResponse('response=1&response_code=100&transactionid=123').status, 'paid');
  for (const body of ['response=1&response_code=100&transactionid=0', 'response=1&response_code=100&transactionid=123&partial_payment_balance=10', 'response=1', 'response=3&response_code=430', 'response=3&response_code=420']) assert.equal(parseNmiChargeResponse(body).status, 'pending');
  assert.equal(parseNmiChargeResponse('response=2&response_code=200').status, 'declined');
});
test('reconciliation validates order, exact USD amount and settled/captured sale', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox'); const saved = await store.get(order.id);
  const xml = `<nm_response><transaction><transaction_id>123456</transaction_id><order_id>${order.id}</order_id><condition>pendingsettlement</condition><currency>USD</currency><action><action_type>sale</action_type><success>1</success><amount>24.90</amount></action></transaction></nm_response>`;
  assert.equal(parseNmiQueryResponse(xml, saved).status, 'paid');
  const declined = '<transaction><transaction_id>111</transaction_id><order_id>' + order.id + '</order_id><condition>failed</condition></transaction>';
  assert.equal(parseNmiQueryResponse(xml.replace('</nm_response>', declined + '</nm_response>'), saved).status, 'paid');
  assert.equal(parseNmiQueryResponse(xml.replace('</transaction>', '<action><action_type>refund</action_type><success>1</success></action></transaction>'), saved).status, 'pending');
  assert.equal(parseNmiQueryResponse(xml.replace('</nm_response>', xml.match(/<transaction>[\s\S]*<\/transaction>/)[0] + '</nm_response>'), saved).status, 'pending');
  for (const incorrect of [xml.replace('24.90', '1.00'), xml.replace('USD', 'GBP'), xml.replace('pendingsettlement', 'pending'), xml.replace(order.id, 'another-order'), '<!DOCTYPE test><nm_response/>']) assert.equal(parseNmiQueryResponse(incorrect, saved).status, 'pending');
});
test('missing configuration and live credentials on preview remain disabled', () => {
  const names = ['SHOPIFY_CHECKOUT_ENABLED', 'SHOPIFY_CHECKOUT_TERMS_APPROVED', 'SHOPIFY_CHECKOUT_MODE', 'NMI_SECURITY_KEY', 'NEXT_PUBLIC_NMI_TOKENIZATION_KEY', 'SHOPIFY_CHECKOUT_REDIS_REST_URL', 'SHOPIFY_CHECKOUT_REDIS_REST_TOKEN', 'SHOPIFY_CHECKOUT_KV_REST_API_URL', 'SHOPIFY_CHECKOUT_KV_REST_API_TOKEN', 'SHOPIFY_CHECKOUT_ORIGIN', 'VERCEL_ENV'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  try {
    for (const name of names) delete process.env[name]; assert.equal(shopifyCheckoutConfig().available, false);
    Object.assign(process.env, { SHOPIFY_CHECKOUT_ENABLED: 'true', SHOPIFY_CHECKOUT_TERMS_APPROVED: 'true', SHOPIFY_CHECKOUT_MODE: 'live', NMI_SECURITY_KEY: 'test', NEXT_PUBLIC_NMI_TOKENIZATION_KEY: 'test', SHOPIFY_CHECKOUT_REDIS_REST_URL: 'https://example.invalid', SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: 'test', SHOPIFY_CHECKOUT_ORIGIN: 'https://www.zevitech.com', VERCEL_ENV: 'preview' });
    assert.equal(shopifyCheckoutConfig().available, false); assert.equal(shopifyCheckoutConfig().tokenizationKey, undefined);
    process.env.VERCEL_ENV = 'production'; assert.equal(shopifyCheckoutConfig().available, true);
    delete process.env.SHOPIFY_CHECKOUT_REDIS_REST_URL; delete process.env.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN;
    Object.assign(process.env, { SHOPIFY_CHECKOUT_KV_REST_API_URL: 'https://checkout.example.invalid', SHOPIFY_CHECKOUT_KV_REST_API_TOKEN: 'test' });
    assert.equal(shopifyCheckoutConfig().available, true);
    delete process.env.SHOPIFY_CHECKOUT_KV_REST_API_TOKEN;
    assert.equal(shopifyCheckoutConfig().available, false);
  } finally { for (const name of names) previous[name] === undefined ? delete process.env[name] : process.env[name] = previous[name]; }
});

test('Redis configuration accepts only complete checkout-specific pairs and never mixes credentials', () => {
  const integration = { SHOPIFY_CHECKOUT_KV_REST_API_URL: 'https://checkout.example.invalid/', SHOPIFY_CHECKOUT_KV_REST_API_TOKEN: 'integration-token' };
  const explicit = { SHOPIFY_CHECKOUT_REDIS_REST_URL: 'https://explicit.example.invalid', SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: 'explicit-token' };
  assert.deepEqual(resolveCheckoutRedisConfig(integration), { url: 'https://checkout.example.invalid', token: 'integration-token' });
  assert.deepEqual(resolveCheckoutRedisConfig({ ...integration, ...explicit }), { url: explicit.SHOPIFY_CHECKOUT_REDIS_REST_URL, token: explicit.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN });
  assert.equal(resolveCheckoutRedisConfig({ KV_REST_API_URL: 'https://unrelated.example.invalid', KV_REST_API_TOKEN: 'unrelated', UPSTASH_REDIS_REST_URL: 'https://unrelated.example.invalid', UPSTASH_REDIS_REST_TOKEN: 'unrelated' }), null);
  assert.equal(resolveCheckoutRedisConfig({ ...integration, SHOPIFY_CHECKOUT_REDIS_REST_URL: 'https://explicit.example.invalid' }), null);
  assert.equal(resolveCheckoutRedisConfig({ SHOPIFY_CHECKOUT_KV_REST_API_URL: integration.SHOPIFY_CHECKOUT_KV_REST_API_URL, SHOPIFY_CHECKOUT_KV_REST_API_READ_ONLY_TOKEN: 'readonly' }), null);
  for (const url of ['http://checkout.example.invalid', 'https://', 'https://user:password@checkout.example.invalid', 'https://checkout.example.invalid/?token=secret', 'https://checkout.example.invalid/other-path']) {
    assert.equal(resolveCheckoutRedisConfig({ ...integration, SHOPIFY_CHECKOUT_KV_REST_API_URL: url }), null);
  }
});


test('checkout requires a usable phone and nonempty business details before persisting an order', async () => {
  for (const phone of [undefined, '', '123456', '1234567890123456', '1+2025550123', '+1 202 555 0123 ext 5', 'name@example.com', ' '.repeat(41)]) {
    const store = memoryStore(); const request = input(); request.brief.business.phone = phone;
    await assert.rejects(createShopifyCheckoutOrder(request, store, 'sandbox'), { code: 'INVALID_DETAILS' });
    assert.equal(store.data.size, 0);
  }
  for (const field of ['brand', 'brief']) {
    for (const value of [undefined, '', '   ']) {
      const store = memoryStore(); const request = input(); request.brief.business[field] = value;
      await assert.rejects(createShopifyCheckoutOrder(request, store, 'sandbox'), { code: 'INVALID_DETAILS' });
      assert.equal(store.data.size, 0);
    }
  }
  for (const phone of ['1234567', '+1 (202) 555-0123', '+44 20 7946 0123', '123456789012345']) {
    assert.equal(ShopifyCheckoutPhoneSchema.safeParse(phone).success, true);
  }
});

test('validated contact and business details are stored before payment but never returned publicly', async () => {
  const store = memoryStore(); const request = input();
  Object.assign(request.brief.business, { phone: '  +1 (202) 555-0123  ', brand: '  Example Store  ', brief: '  Household essentials  ' });
  const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  const saved = await store.get(order.id);
  assert.equal(saved.status, 'created'); assert.equal(saved.attempts, 0);
  assert.equal(saved.brief.business.name, 'Example Customer');
  assert.equal(saved.brief.business.email, 'customer@example.com');
  assert.equal(saved.brief.business.phone, '+1 (202) 555-0123');
  assert.equal(saved.brief.business.brand, 'Example Store');
  assert.equal(saved.brief.business.brief, 'Household essentials');
  for (const sensitive of ['brief', 'email', 'phone', 'business', 'attribution', 'accessHash']) assert.equal(order[sensitive], undefined);
  const changed = input(); changed.brief.business.phone = '+1 202 555 0199';
  await assert.rejects(createShopifyCheckoutOrder(changed, store, 'sandbox'), { code: 'CHECKOUT_ALREADY_EXISTS' });
});

test('ordinary design notes persist privately and allow package checkout through payment', async () => {
  const store = memoryStore(); const request = input();
  const notes = 'Use warm neutrals, a serif headline and large product photos. Design contact: designer@example.com.';
  request.brief.business.designNotes = `  ${notes}  `;
  const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  const saved = await store.get(order.id);
  assert.equal(saved.status, 'created'); assert.equal(saved.attempts, 0);
  assert.equal(saved.brief.business.designNotes, notes);
  assert.equal(saved.brief.business.requirements, '');
  let charges = 0;
  const gateway = { charge: async () => { charges++; return approved; } };
  const status = await checkShopifyCheckout(order.id, request.accessToken, store, gateway, 'sandbox');
  const receipt = await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
  assert.equal(receipt.status, 'paid'); assert.equal(charges, 1);
  for (const response of [order, status, receipt]) {
    for (const sensitive of ['brief', 'business', 'designNotes', 'requirements', 'name', 'email', 'phone', 'brand', 'accessHash']) assert.equal(response[sensitive], undefined);
    const serialized = JSON.stringify(response);
    for (const privateValue of [notes, 'designer@example.com', request.brief.business.name, request.brief.business.email, request.brief.business.phone]) assert.equal(serialized.includes(privateValue), false);
  }
  assert.equal((await store.get(order.id)).brief.business.designNotes, notes);
});

test('design preferences never make explicit unpriced functionality eligible for checkout', async () => {
  const store = memoryStore(); const request = input();
  request.brief.business.designNotes = 'Use warm neutrals and a simple product layout.';
  request.brief.business.requirements = 'Custom ERP integration';
  await assert.rejects(createShopifyCheckoutOrder(request, store, 'sandbox'), { code: 'SCOPE_REVIEW_REQUIRED' });
  assert.equal(store.data.size, 0);
});

test('changing design notes changes the brief fingerprint and cannot overwrite or pay an earlier brief', async () => {
  const store = memoryStore(); const request = input();
  request.brief.business.designNotes = 'Use a serif headline and warm neutrals.';
  const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  const changed = structuredClone(request);
  changed.brief.business.designNotes = 'Use a sans-serif headline and cool blues.';
  await assert.rejects(createShopifyCheckoutOrder(changed, store, 'sandbox'), { code: 'CHECKOUT_ALREADY_EXISTS' });
  assert.equal((await store.get(order.id)).brief.business.designNotes, request.brief.business.designNotes);
  // Keep the request ID identical in a separate store so only the note text changes.
  const revised = await createShopifyCheckoutOrder(changed, memoryStore(), 'sandbox');
  assert.notEqual(revised.briefFingerprint, order.briefFingerprint);
  let charges = 0;
  const gateway = { charge: async () => { charges++; return approved; } };
  await assert.rejects(payShopifyCheckout({ ...pay(order), briefFingerprint: revised.briefFingerprint }, store, gateway, 'sandbox'), { code: 'CHECKOUT_BRIEF_CHANGED' });
  assert.equal(charges, 0);
  const unchanged = await store.get(order.id);
  assert.equal(unchanged.status, 'created'); assert.equal(unchanged.attempts, 0);
});

test('design notes accept the supported length and reject oversized notes before persistence', async () => {
  const request = input(); request.brief.business.designNotes = 'a'.repeat(2000);
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  assert.equal((await store.get(order.id)).brief.business.designNotes.length, 2000);
  request.brief.business.designNotes += 'a';
  const oversizedStore = memoryStore();
  await assert.rejects(createShopifyCheckoutOrder(request, oversizedStore, 'sandbox'), { code: 'INVALID_DETAILS' });
  assert.equal(oversizedStore.data.size, 0);
});

test('campaign attribution persists privately, strips unknown fields and cannot be replaced on replay', async () => {
  const store = memoryStore(); const request = input();
  request.attribution = { gclid: 'Click_ABC-123', gbraid: 'Braid_ABC-123', wbraid: 'Web_ABC-123', utm_source: ' google ', utm_medium: 'cpc', utm_campaign: 'Shopify USA 2026', utm_term: 'shopify development', utm_content: 'sales-focused', utm_id: 'campaign-123', email: 'customer@example.com', phone: '+1 202 555 0123', landingPage: '/?email=customer@example.com' };
  const order = await createShopifyCheckoutOrder(request, store, 'sandbox');
  const expected = { gclid: 'Click_ABC-123', gbraid: 'Braid_ABC-123', wbraid: 'Web_ABC-123', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'Shopify USA 2026', utm_term: 'shopify development', utm_content: 'sales-focused', utm_id: 'campaign-123' };
  assert.deepEqual((await store.get(order.id)).attribution, expected);
  assert.equal(order.attribution, undefined);
  request.attribution = { utm_source: 'changed' };
  await createShopifyCheckoutOrder(request, store, 'sandbox');
  assert.deepEqual((await store.get(order.id)).attribution, expected);
  const directStore = memoryStore(); const direct = await createShopifyCheckoutOrder(input(), directStore, 'sandbox');
  assert.equal((await directStore.get(direct.id)).attribution, undefined);
});

test('attribution rejects unsafe or oversized values while client sanitization keeps valid campaign fields', async () => {
  for (const attribution of [{ gclid: 'a'.repeat(241) }, { gbraid: 'https://example.com' }, { wbraid: 'customer@example.com' }, { utm_campaign: 'x'.repeat(241) }, { utm_content: 'customer@example.com' }, { utm_source: 123 }, { utm_term: 'name\nemail' }]) {
    const store = memoryStore();
    await assert.rejects(createShopifyCheckoutOrder({ ...input(), attribution }, store, 'sandbox'), { code: 'INVALID_DETAILS' });
    assert.equal(store.data.size, 0);
  }
  assert.deepEqual(sanitizeShopifyCheckoutAttribution({ gclid: 'Valid_Click-123', utm_source: 'google', utm_content: 'customer@example.com', landingPage: '/?email=customer@example.com', phone: '2025550123', gbraid: 'x'.repeat(241) }), { gclid: 'Valid_Click-123', utm_source: 'google' });
  assert.equal(sanitizeShopifyCheckoutAttribution({ email: 'customer@example.com' }), undefined);
  assert.equal(sanitizeShopifyCheckoutAttribution(null), undefined);
  assert.equal(sanitizeShopifyCheckoutAttribution([]), undefined);
});


test('an older uncharged order without required contact cannot reach the payment gateway', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  delete store.data.get(order.id).brief.business.phone;
  let charges = 0;
  const gateway = { charge: async () => { charges++; return approved; } };
  await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'), { code: 'INVALID_DETAILS' });
  assert.equal(charges, 0); assert.equal(store.data.get(order.id).attempts, 0);
  // Existing paid receipts remain recoverable; validation must never create a new charge.
  Object.assign(store.data.get(order.id), approved);
  assert.equal((await payShopifyCheckout(pay(order), store, gateway, 'sandbox')).status, 'paid');
  assert.equal(charges, 0);
});


test('only confirmed declines expose a numeric recovery code without raw provider data', async () => {
  const { publicCheckoutOrder } = require('../src/services/shopify-checkout-service.ts');
  const { shopifyDeclineFeedback } = require('../src/lib/shopify-payment-feedback.ts');
  const store = memoryStore();
  const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  const saved = await store.get(order.id);
  for (const code of ['202', '223', '225']) {
    const result = publicCheckoutOrder({ ...saved, status: 'declined', gatewayCode: code, responseText: 'SECRET PROVIDER TEXT' });
    assert.equal(result.declineCode, code);
    assert.ok(shopifyDeclineFeedback(result.declineCode).includes(code));
    assert.ok(!JSON.stringify(result).includes('SECRET'));
  }
  for (const status of ['paid', 'pending', 'processing', 'created']) assert.equal(publicCheckoutOrder({ ...saved, status, gatewayCode: '202' }).declineCode, undefined);
  assert.equal(publicCheckoutOrder({ ...saved, status: 'declined', gatewayCode: '<script>' }).declineCode, undefined);
  assert.ok(!shopifyDeclineFeedback('<script>').includes('<script>'));
});

test('historical 40% deposits remain 40% receipts and uncharged sessions cannot charge under old terms', async () => {
  for (const status of ['created', 'paid', 'pending']) {
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
    Object.assign(store.data.get(order.id), { status, amount: 99.6, upfrontAmount: 99.6, totalAmount: 249, balanceAmount: 149.4, amountPaid: status === 'paid' ? 99.6 : 0, paymentVersion: 'upfront-40-v1' });
    let charges = 0;
    const gateway = { charge: async () => { charges++; return approved; } };
    if (status === 'created') {
      await assert.rejects(payShopifyCheckout(pay(order), store, gateway, 'sandbox'), error => error.code === 'PAYMENT_TERMS_CHANGED');
    } else {
      const receipt = await payShopifyCheckout(pay(order), store, gateway, 'sandbox');
      assert.equal(receipt.paymentVersion, 'upfront-40-v1');
      assert.equal(receipt.paymentStage, 'upfront');
      assert.equal(receipt.totalAmount, 249);
      assert.equal(receipt.balanceAmount, 149.4);
      assert.equal(receipt.amountPaid, status === 'paid' ? 99.6 : 0);
    }
    assert.equal(charges, 0);
  }
});

test('old approval-based 10% sessions must refresh before payment, while paid receipts retain their terms', async () => {
  const store = memoryStore();
  const current = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  const saved = store.data.get(current.id);
  saved.paymentVersion = 'upfront-10-v2';
  saved.consentVersion = 'shopify-development-10-upfront-approval-2026-10-22';
  let charges = 0;
  const gateway = { charge: async () => { charges++; return approved; } };
  await assert.rejects(payShopifyCheckout(pay(current), store, gateway, 'sandbox'), { code: 'PAYMENT_TERMS_CHANGED' });
  assert.equal(charges, 0);
  saved.status = 'paid'; saved.transactionId = approved.transactionId;
  const receipt = await payShopifyCheckout(pay(current), store, gateway, 'sandbox');
  assert.equal(receipt.paymentVersion, 'upfront-10-v2');
  assert.equal(receipt.paymentStage, 'upfront');
  assert.equal(receipt.amountPaid, 24.9);
  assert.equal(receipt.balanceAmount, 224.1);
  assert.equal(charges, 0);
});


test('documented card and gateway rejections are actionable while uncertain responses stay locked', () => {
  for (const code of ['220', '223', '224', '225', '300', '410', '411', '440', '441', '460', '461']) {
    assert.deepEqual(parseNmiChargeResponse(`response=3&response_code=${code}&responsetext=Rejected`), { status: 'declined', gatewayCode: code });
  }
  for (const code of ['400', '420', '421', '430', '999']) assert.equal(parseNmiChargeResponse(`response=3&response_code=${code}`).status, 'pending');
  for (const text of ['Communication error', 'Request timed out']) {
    assert.equal(parseNmiChargeResponse(`response=3&response_code=300&responsetext=${encodeURIComponent(text)}`).status, 'pending');
  }
});

test('confirmed failed query recovers a pending attempt but never an old decline or empty result', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  await payShopifyCheckout(pay(order), store, { charge: async () => ({ status: 'pending' }) }, 'sandbox');
  const saved = store.data.get(order.id);
  saved.updatedAt = new Date(Date.now() - 60000).toISOString();
  const failed = `<nm_response><transaction><transaction_id>456</transaction_id><order_id>${saved.gatewayOrderId}</order_id><condition>failed</condition><currency>USD</currency><action><action_type>sale</action_type><success>0</success><amount>24.90</amount><response_code>300</response_code><response_text>Invalid card number</response_text></action></transaction></nm_response>`;
  assert.deepEqual(parseNmiQueryResponse(failed, saved), { status: 'declined', gatewayCode: '300' });
  for (const xml of [failed.replace(saved.gatewayOrderId, order.id), failed.replace('24.90', '1.00'), failed.replace('USD', 'GBP'), failed.replace('failed', 'pending'), failed.replace('Invalid card number', 'Duplicate transaction'), failed.replace('<success>0', '<success>1'), '<nm_response/>']) {
    assert.equal(parseNmiQueryResponse(xml, saved).status, 'pending');
  }
  const result = await checkShopifyCheckout(order.id, 'a'.repeat(64), store, { reconcile: async current => parseNmiQueryResponse(failed, current) }, 'sandbox');
  assert.equal(result.status, 'declined'); assert.equal(result.declineCode, '300'); assert.equal(result.retryAllowed, true);
  const oldAttempt = saved.gatewayOrderId;
  await payShopifyCheckout({ ...pay(order), paymentToken: 'second-card-token' }, store, { charge: async current => {
    assert.notEqual(current.gatewayOrderId, oldAttempt);
    assert.equal(parseNmiQueryResponse(failed, current).status, 'pending');
    return approved;
  } }, 'sandbox');
});

test('legacy failed query only recovers one matching first attempt, never ambiguous retry history', async () => {
  const order = await createShopifyCheckoutOrder(input(), memoryStore(), 'sandbox');
  const legacy = { ...order, attempts: 1 };
  const xml = `<nm_response><transaction><order_id>${order.id}</order_id><condition>failed</condition><currency>USD</currency><action><action_type>sale</action_type><success>0</success><amount>24.90</amount><response_code>225</response_code></action></transaction></nm_response>`;
  assert.equal(parseNmiQueryResponse(xml, legacy).status, 'declined');
  assert.equal(parseNmiQueryResponse(xml, { ...legacy, attempts: 2 }).status, 'pending');
});

test('public checkout exposes useful rejection codes and disables exhausted retries', async () => {
  const store = memoryStore(); const order = await createShopifyCheckoutOrder(input(), store, 'sandbox');
  const { publicCheckoutOrder } = require('../src/services/shopify-checkout-service.ts');
  const { shopifyDeclineFeedback } = require('../src/lib/shopify-payment-feedback.ts');
  for (const code of ['300', '410', '411', '440', '441', '460', '461']) {
    const result = publicCheckoutOrder({ ...store.data.get(order.id), status: 'declined', gatewayCode: code, attempts: 3 });
    assert.equal(result.declineCode, code); assert.equal(result.retryAllowed, false);
    assert.match(shopifyDeclineFeedback(code), new RegExp(code));
  }
});

 test('duplicate gateway rejection is a terminal message with retry blocked, never an endless pending spinner', async () => {
  const parsed = parseNmiChargeResponse('response=3&response_code=300&responsetext=Duplicate+transaction');
  assert.deepEqual(parsed, {status:'declined',gatewayCode:'300',gatewayIssue:'duplicate'});
  const store=memoryStore(); const order=await createShopifyCheckoutOrder(input(),store,'sandbox');
  const result=await payShopifyCheckout(pay(order),store,{charge:async()=>parsed},'sandbox');
  assert.equal(result.status,'declined'); assert.equal(result.retryAllowed,false); assert.equal(result.gatewayIssue,'duplicate');
  await assert.rejects(payShopifyCheckout({...pay(order),paymentToken:'another-token'},store,{charge:async()=>assert.fail('must not charge again')},'sandbox'),{code:'PAYMENT_RETRY_BLOCKED'});
 });

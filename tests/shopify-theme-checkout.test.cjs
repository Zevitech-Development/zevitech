// Server theme scope checks with in-memory orders and a stub gateway only.
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
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};

const { createShopifyCheckoutOrder, payShopifyCheckout } = require('../src/services/shopify-checkout-service.ts');
const { ShopifyCheckoutBriefSchema } = require('../src/schemas/shopify-checkout-schema.ts');
const { shopifyCustomizationIds } = require('../src/lib/shopify-theme-access.ts');

function memoryStore() {
  const data = new Map();
  return {
    data, createCalls: 0, claimCalls: 0,
    async create(order) {
      this.createCalls++;
      if (!data.has(order.id)) data.set(order.id, structuredClone(order));
      return structuredClone(data.get(order.id));
    },
    async get(id) { return data.has(id) ? structuredClone(data.get(id)) : null; },
    async claim(id, _tokenHash, attemptId) {
      this.claimCalls++;
      const order = data.get(id);
      if (!['created', 'declined'].includes(order.status)) return false;
      Object.assign(order, { status: 'processing', attemptId, attempts: order.attempts + 1 });
      return true;
    },
    async finish(id, attemptId, patch) {
      const order = data.get(id);
      assert.equal(order.attemptId, attemptId);
      Object.assign(order, patch);
    },
  };
}

function request(packageName = 'Beginner') {
  return {
    requestId: '12345678-1234-4234-8234-123456789012',
    accessToken: 'a'.repeat(64),
    acceptedTerms: true,
    brief: {
      version: 2,
      package: { name: packageName },
      business: {
        name: 'Example Customer', email: 'customer@example.com', phone: '+1 (202) 555-0123',
        brand: 'Example', brief: 'Example store', projectType: 'New store', requirements: '',
      },
      design: { template: 'Atelier Editorial', layout: 'Editorial', palette: 'Ocean' },
      imageFilenames: [], logoFilename: '', priorities: [],
      needs: { productCount: '10', featureIds: [], scopeConfirmed: true },
    },
  };
}

function payment(order) {
  return {
    orderId: order.id, accessToken: 'a'.repeat(64), paymentToken: 'stub-token-not-a-real-payment',
    briefFingerprint: order.briefFingerprint, acceptedTerms: true,
    billing: { firstName: 'Example', lastName: 'Customer', address: '123 Example Road', city: 'Example', state: 'CA', postalCode: '90001', country: 'US' },
  };
}

test('new design scope fields are optional for legacy briefs but validate every supplied value', () => {
  const legacy = ShopifyCheckoutBriefSchema.parse(request().brief);
  assert.equal(legacy.needs.designLayout, undefined);
  assert.equal(legacy.needs.customizationIds, undefined);
  const valid = request('Top Tier').brief;
  valid.needs.designLayout = 9;
  valid.needs.customizationIds = [...shopifyCustomizationIds];
  assert.deepEqual(ShopifyCheckoutBriefSchema.parse(valid).needs, valid.needs);
  for (const designLayout of [-1, 0.5, 10, '8', null, NaN, Infinity]) {
    assert.equal(ShopifyCheckoutBriefSchema.safeParse({ ...valid, needs: { ...valid.needs, designLayout } }).success, false);
  }
  for (const customizationIds of [['unlistedFeature'], ['custompalette'], ['__proto__'], Array(7).fill('headline'), 'headline', null]) {
    assert.equal(ShopifyCheckoutBriefSchema.safeParse({ ...valid, needs: { ...valid.needs, customizationIds } }).success, false);
  }
});

test('Beginner checkout accepts any valid reference layout at its canonical deposit', async () => {
  for (let designLayout = 0; designLayout < 10; designLayout++) {
    const input = request(); input.brief.needs.designLayout = designLayout;
    input.brief.package.price = 4999;
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input, store, 'sandbox');
    assert.equal(order.amount, 24.9);
    assert.equal(store.createCalls, 1);
    assert.equal((await store.get(order.id)).brief.needs.designLayout, designLayout);
  }
});

test('omitting customization IDs cannot bypass custom palette scope', async () => {
  for (const mutate of [
    input => { input.brief.design.palette = ' Custom palette '; input.brief.needs.customizationIds = []; },
  ]) {
    const input = request(); mutate(input);
    const store = memoryStore();
    await assert.rejects(createShopifyCheckoutOrder(input, store, 'sandbox'), { code: 'SCOPE_REVIEW_REQUIRED' });
    assert.equal(store.createCalls, 0);
  }
});

test('customisation capabilities are enforced at their minimum package independently from theme layout', async () => {
  for (const [packageName, customizationId] of [
    ['Beginner', 'customPalette'], ['Beginner', 'headline'],
    ['Growth', 'productDetails'], ['Level Up', 'customSections'],
    ['Pro', 'motionControls'], ['Executive', 'advancedCommerce'],
  ]) {
    const input = request(packageName);
    input.brief.needs.designLayout = 0;
    input.brief.needs.customizationIds = [customizationId];
    const store = memoryStore();
    await assert.rejects(createShopifyCheckoutOrder(input, store, 'sandbox'), { code: 'SCOPE_REVIEW_REQUIRED' });
    assert.equal(store.createCalls, 0);
  }
  const growth = request('Growth');
  growth.brief.needs.designLayout = 2;
  growth.brief.needs.customizationIds = ['customPalette', 'headline'];
  assert.equal((await createShopifyCheckoutOrder(growth, memoryStore(), 'sandbox')).amount, 59.9);
});

test('Top Tier preserves both signature themes and all allowed customisations in the canonical order', async () => {
  for (const designLayout of [8, 9]) {
    const input = request('Top Tier');
    input.brief.needs.designLayout = designLayout;
    input.brief.needs.customizationIds = [...shopifyCustomizationIds];
    input.brief.design.palette = 'Custom palette';
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(input, store, 'sandbox');
    assert.equal(order.amount, 499.9);
    const saved = await store.get(order.id);
    assert.equal(saved.brief.needs.designLayout, designLayout);
    assert.deepEqual(saved.brief.needs.customizationIds, shopifyCustomizationIds);
    let charges = 0;
    const gateway = { charge: async () => { charges++; return { status: 'paid', transactionId: 'stub-transaction' }; } };
    assert.equal((await payShopifyCheckout(payment(order), store, gateway, 'sandbox')).status, 'paid');
    assert.equal(charges, 1);
  }
});

test('resumed uncharged orders are rechecked before claiming a token or calling a gateway', async () => {
  for (const mutate of [
    saved => { saved.brief.needs.customizationIds = ['customPalette']; },
    saved => { saved.brief.package.name = 'Top Tier'; saved.brief.needs.designLayout = 8; },
  ]) {
    const store = memoryStore();
    const order = await createShopifyCheckoutOrder(request(), store, 'sandbox');
    mutate(store.data.get(order.id));
    let charges = 0;
    const gateway = { charge: async () => { charges++; throw new Error('Unexpected gateway call'); } };
    await assert.rejects(payShopifyCheckout(payment(order), store, gateway, 'sandbox'), { code: 'SCOPE_REVIEW_REQUIRED' });
    assert.equal(store.claimCalls, 0);
    assert.equal(charges, 0);
    assert.equal(store.data.get(order.id).status, 'created');
  }
});

test('new design and customisation requirements participate in replay fingerprints', async () => {
  const input = request('Top Tier');
  input.brief.needs.designLayout = 8;
  input.brief.needs.customizationIds = ['headline'];
  const store = memoryStore();
  await createShopifyCheckoutOrder(input, store, 'sandbox');
  for (const mutate of [
    changed => { changed.brief.needs.designLayout = 9; },
    changed => { changed.brief.needs.customizationIds.push('advancedCommerce'); },
  ]) {
    const changed = structuredClone(input); mutate(changed);
    await assert.rejects(createShopifyCheckoutOrder(changed, store, 'sandbox'), { code: 'CHECKOUT_ALREADY_EXISTS' });
  }
});

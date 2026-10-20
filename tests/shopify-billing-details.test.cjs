// Pure billing suggestions and existing schema checks. No provider or network calls.
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

const { suggestShopifyBillingName, shopifyBillingCountries } = require('../src/lib/shopify-billing-details.ts');
const { shopifyBillingCountryCodes, shopifyBillingDefaultCountry } = require('../src/content/landing/shopify-billing-countries.ts');
const { ShopifyCheckoutBillingSchema } = require('../src/schemas/shopify-checkout-schema.ts');

const address = { address: '123 Example Road', city: 'Example', state: 'CA', postalCode: '90001', country: 'US' };

test('two-part contact names suggest editable values without losing accents or punctuation', () => {
  assert.deepEqual(suggestShopifyBillingName('  Anne-Marie\t O’Neill  '), { firstName: 'Anne-Marie', lastName: 'O’Neill' });
  assert.deepEqual(suggestShopifyBillingName('José\u00a0Álvarez'), { firstName: 'José', lastName: 'Álvarez' });
  assert.equal(ShopifyCheckoutBillingSchema.safeParse({ ...address, ...suggestShopifyBillingName('Example Customer') }).success, true);
});

test('empty, single-word and longer names never invent a billing surname', () => {
  assert.deepEqual(suggestShopifyBillingName(' \t '), { firstName: '', lastName: '' });
  assert.deepEqual(suggestShopifyBillingName('  Cher  '), { firstName: 'Cher', lastName: '' });
  for (const name of ['Mary Jane Watson', 'María del Carmen García', 'Dr Alex Smith', 'Kim Min Jun']) {
    assert.deepEqual(suggestShopifyBillingName(name), { firstName: '', lastName: '' }, name);
  }
  const singleName = suggestShopifyBillingName('Cher');
  assert.equal(ShopifyCheckoutBillingSchema.safeParse({ ...address, ...singleName }).success, false);
  assert.equal(ShopifyCheckoutBillingSchema.safeParse({ ...address, ...singleName, lastName: 'Customer-entered surname' }).success, true);
});

test('the selector contains the complete assigned code list without reserved or obsolete alternatives', () => {
  assert.equal(shopifyBillingCountryCodes.length, 249);
  assert.equal(new Set(shopifyBillingCountryCodes).size, 249);
  assert.equal(shopifyBillingDefaultCountry, 'US');
  for (const code of ['US', 'GB', 'CA', 'AU', 'NZ', 'PK', 'IN', 'AE', 'DE', 'FR', 'JP', 'BR', 'ZA', 'BQ', 'SS', 'SX', 'CW', 'AX', 'UM']) {
    assert.ok(shopifyBillingCountryCodes.includes(code), code);
  }
  for (const code of ['UK', 'EU', 'XK', 'ZZ', 'SU', 'AN', 'AC', 'CP', 'CQ', 'DG', 'EA', 'IC', 'TA']) {
    assert.equal(shopifyBillingCountryCodes.includes(code), false, code);
  }
});

test('every country renders a readable region name and submits a schema-compatible code', () => {
  assert.equal(shopifyBillingCountries.length, 249);
  assert.equal(shopifyBillingCountries.find(country => country.code === 'US').name, 'United States');
  assert.equal(shopifyBillingCountries.find(country => country.code === 'GB').name, 'United Kingdom');
  for (const country of shopifyBillingCountries) {
    assert.ok(country.name && country.name !== country.code, country.code);
    const parsed = ShopifyCheckoutBillingSchema.safeParse({ ...address, firstName: 'Example', lastName: 'Customer', country: country.code });
    assert.equal(parsed.success, true, country.code);
    assert.equal(parsed.data.country, country.code);
  }
});

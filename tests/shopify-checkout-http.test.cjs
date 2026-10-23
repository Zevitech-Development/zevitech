// Exercise the real HTTP boundary with synthetic configuration and intercepted fetch.
// These tests never contact a gateway or datastore and never submit a payment.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { NextRequest } = require('next/server');
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
const { checkoutHttp, checkoutConfigResponse } = require('../src/services/shopify-checkout-http.ts');
const origin = 'https://checkout.example.test';
const syntheticEnv = {
  SHOPIFY_CHECKOUT_ENABLED: 'true',
  SHOPIFY_CHECKOUT_TERMS_APPROVED: 'true',
  SHOPIFY_CHECKOUT_MODE: 'sandbox',
  SHOPIFY_CHECKOUT_ORIGIN: origin,
  NMI_SECURITY_KEY: 'private-test-only-never-send-to-client',
  NEXT_PUBLIC_NMI_TOKENIZATION_KEY: 'public-test-tokenization-key',
  SHOPIFY_CHECKOUT_REDIS_REST_URL: 'https://checkout-storage.example.test',
  SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: 'private-test-storage-token',
};
async function isolated(run, overrides = {}, responder) {
  const previousEnv = process.env;
  const previousFetch = global.fetch;
  const calls = [];
  process.env = { ...syntheticEnv, ...overrides };
  global.fetch = async (...args) => {
    calls.push(args);
    if (!responder) throw new Error('Unexpected outgoing request');
    assert.equal(args[0], syntheticEnv.SHOPIFY_CHECKOUT_REDIS_REST_URL, 'Only intercepted storage calls are allowed');
    return responder(...args);
  };
  try { return await run(calls); }
  finally { process.env = previousEnv; global.fetch = previousFetch; }
}
function request({ url = `${origin}/api/shopify-checkout/create`, headers = {}, body = '{}' } = {}) {
  return new NextRequest(url, {
    method: 'POST',
    headers: { origin, 'content-type': 'application/json', ...headers },
    body,
  });
}
async function rejects(response, status, error) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.deepEqual(await response.json(), { error });
}

test('disabled checkout fails before touching storage and exposes no credential configuration', async () => {
  await isolated(async calls => {
    const config = await checkoutConfigResponse().json();
    assert.deepEqual(config, { available: false, mode: 'sandbox' });
    await rejects(await checkoutHttp(request(), 'create'), 503, 'CHECKOUT_UNAVAILABLE');
    assert.equal(calls.length, 0);
  }, { SHOPIFY_CHECKOUT_ENABLED: 'false' });
});

test('public checkout configuration exposes only the tokenization key and not merchant or datastore secrets', async () => {
  await isolated(async calls => {
    const response = checkoutConfigResponse();
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const config = await response.json();
    assert.equal(config.available, true);
    assert.equal(config.mode, 'sandbox');
    assert.equal(config.tokenizationKey, syntheticEnv.NEXT_PUBLIC_NMI_TOKENIZATION_KEY);
    assert.equal(config.scriptUrl, 'https://sandbox.nmi.com/token/Collect.js');
    assert.doesNotMatch(JSON.stringify(config), /private-test|checkout-storage/);
    assert.equal(calls.length, 0);
  });
});

test('foreign, missing, cross-site and wrong-host origins cannot reach storage or a gateway', async () => {
  await isolated(async calls => {
    for (const options of [
      { headers: { origin: '' } },
      { headers: { origin: 'https://another.example.test' } },
      { headers: { 'sec-fetch-site': 'cross-site' } },
      { url: 'https://another.example.test/api/shopify-checkout/create' },
    ]) {
      await rejects(await checkoutHttp(request(options), 'create'), 403, 'REQUEST_NOT_ALLOWED');
    }
    assert.equal(calls.length, 0);
  });
});

test('non-JSON, malformed and oversized payloads are rejected before any external request', async () => {
  await isolated(async calls => {
    await rejects(await checkoutHttp(request({ headers: { 'content-type': 'text/plain' } }), 'create'), 415, 'INVALID_REQUEST');
    await rejects(await checkoutHttp(request({ body: '{' }), 'create'), 400, 'INVALID_REQUEST');
    await rejects(await checkoutHttp(request({ headers: { 'content-length': '32769' } }), 'create'), 413, 'REQUEST_TOO_LARGE');
    await rejects(await checkoutHttp(request({ body: JSON.stringify({ value: 'a'.repeat(32769) }) }), 'create'), 413, 'REQUEST_TOO_LARGE');
    assert.equal(calls.length, 0);
  });
});

test('invalid create and payment details cannot proceed past the durable rate-limit check', async () => {
  await isolated(async calls => {
    await rejects(await checkoutHttp(request(), 'create'), 400, 'INVALID_DETAILS');
    await rejects(await checkoutHttp(request(), 'pay'), 400, 'INVALID_DETAILS');
    assert.equal(calls.length, 2);
    for (const [, options] of calls) {
      const command = JSON.parse(options.body);
      assert.equal(command[0], 'EVAL');
      assert.match(command[3], /^zevitech:shopify-checkout:v1:rate:/);
    }
  }, {}, () => new Response(JSON.stringify({ result: 1 }), { status: 200 }));
});

test('rate-limited requests cannot create an order or contact a payment gateway', async () => {
  await isolated(async calls => {
    await rejects(await checkoutHttp(request(), 'create'), 429, 'TOO_MANY_REQUESTS');
    assert.equal(calls.length, 1);
  }, {}, () => new Response(JSON.stringify({ result: 11 }), { status: 200 }));
});

test('storage failures return an unconfirmed response without leaking provider details or permitting payment', async () => {
  await isolated(async calls => {
    await rejects(await checkoutHttp(request(), 'pay'), 503, 'CHECKOUT_UNCONFIRMED');
    assert.equal(calls.length, 1);
  }, {}, () => new Response('private datastore diagnostic', { status: 503 }));
});

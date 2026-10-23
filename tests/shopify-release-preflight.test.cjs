const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { spawnSync } = require("node:child_process");
const ts = require("typescript");
const { runReleasePreflight: runPreflight, resolveRedisConfig, resolveSmtpConfig, classifyQueryResponse } = require("../scripts/shopify-release-preflight.cjs");

// A real SMTP connection is never created by this offline test suite.
const runReleasePreflight = options => runPreflight({
  createSmtpTransport: () => ({ verify: async () => true, close: () => {} }),
  ...options,
});

// Test the duplicated build-time resolver against the actual checkout store.
const filename = path.resolve(__dirname, "../src/services/shopify-checkout-store.ts");
const storeModule = new Module(filename, module);
storeModule.filename = filename;
storeModule.paths = module.paths;
storeModule._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { resolveCheckoutRedisConfig } = storeModule.exports;

const env = () => ({
  VERCEL_ENV: "production",
  SHOPIFY_CHECKOUT_ENABLED: "true",
  SHOPIFY_CHECKOUT_TERMS_APPROVED: "true",
  CRON_SECRET: "test-cron-secret",
  SHOPIFY_CHECKOUT_MODE: "live",
  SHOPIFY_CHECKOUT_ORIGIN: "https://www.example.test",
  SHOPIFY_CHECKOUT_REDIS_REST_URL: "https://dedicated-redis.example.test",
  SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: "test-redis-token",
  NMI_SECURITY_KEY: "test-private-key",
  NEXT_PUBLIC_NMI_TOKENIZATION_KEY: "test-public-tokenization-key",
  EMAIL_USER: "sender@example.test",
  EMAIL_PASSWORD: "test-smtp-password",
  BUSINESS_EMAIL: "business@example.test",
});
const response = (body, status = 200) => new Response(body, { status });
function fakeNetwork(replies = []) {
  const calls = [];
  return {
    calls,
    fetch: async (url, options) => {
      calls.push({ url, options });
      const next = replies.shift();
      if (next instanceof Error) throw next;
      assert.ok(next, "Unexpected request: no real network is allowed.");
      return next;
    },
  };
}

test("production gating skips with zero network calls", async () => {
  for (const override of [
    { VERCEL_ENV: undefined }, { VERCEL_ENV: "preview" }, { VERCEL_ENV: "development" },
    { SHOPIFY_CHECKOUT_ENABLED: undefined }, { SHOPIFY_CHECKOUT_ENABLED: "false" },
  ]) {
    const network = fakeNetwork();
    const logs = [];
    const result = await runReleasePreflight({ env: { ...env(), ...override }, fetchImpl: network.fetch, log: value => logs.push(value) });
    assert.equal(result.status, "skipped");
    assert.equal(network.calls.length, 0);
    assert.match(logs.join("\n"), /SKIP/);
  }
});

test("config errors block enabled production before contacting any provider", async () => {
  for (const override of [
    { SHOPIFY_CHECKOUT_TERMS_APPROVED: "false" },
    { CRON_SECRET: undefined }, { CRON_SECRET: "" }, { CRON_SECRET: " invalid secret " },
    { SHOPIFY_CHECKOUT_MODE: "sandbox" }, { SHOPIFY_CHECKOUT_MODE: undefined },
    { SHOPIFY_CHECKOUT_ORIGIN: "http://example.test" }, { SHOPIFY_CHECKOUT_ORIGIN: "https://example.test/checkout" },
    { SHOPIFY_CHECKOUT_ORIGIN: "https://name:password@example.test" },
    { NMI_SECURITY_KEY: "" }, { NMI_SECURITY_KEY: " test-private-key" },
    { NEXT_PUBLIC_NMI_TOKENIZATION_KEY: "" }, { NEXT_PUBLIC_NMI_TOKENIZATION_KEY: "x y" },
    { SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: "" },
  ]) {
    const network = fakeNetwork();
    const result = await runReleasePreflight({ env: { ...env(), ...override }, fetchImpl: network.fetch, log: () => {} });
    assert.equal(result.status, "failed");
    assert.equal(network.calls.length, 0);
  }
});

test("dedicated resolver follows the store exactly without generic or mixed fallback", () => {
  const samples = [
    {}, env(),
    { SHOPIFY_CHECKOUT_KV_REST_API_URL: "https://dedicated.test/", SHOPIFY_CHECKOUT_KV_REST_API_TOKEN: " token " },
    { KV_REST_API_URL: "https://unrelated.test", KV_REST_API_TOKEN: "unrelated" },
    { SHOPIFY_CHECKOUT_REDIS_REST_URL: "", SHOPIFY_CHECKOUT_KV_REST_API_URL: "https://valid.test", SHOPIFY_CHECKOUT_KV_REST_API_TOKEN: "valid" },
    { SHOPIFY_CHECKOUT_REDIS_REST_TOKEN: "one", SHOPIFY_CHECKOUT_KV_REST_API_URL: "https://other.test" },
    ...["http://storage.test", "https://user:pw@storage.test", "https://storage.test/path", "https://storage.test/?secret=x", "https://storage.test/#token", "not-url"].map(url => ({ ...env(), SHOPIFY_CHECKOUT_REDIS_REST_URL: url })),
  ];
  for (const sample of samples) assert.deepEqual(resolveRedisConfig(sample), resolveCheckoutRedisConfig(sample));
});

test("successful checks only send PING and an exact nonexistent-order query, never a charge", async () => {
  const ids = [];
  for (let run = 0; run < 2; run++) {
    const network = fakeNetwork([response('{"result":"PONG"}'), response('<?xml version="1.0"?><nm_response/>')]);
    const logs = [];
    const result = await runReleasePreflight({ env: env(), fetchImpl: network.fetch, log: value => logs.push(value) });
    assert.deepEqual(result, { status: "passed", gateway: "verified" });
    assert.equal(network.calls.length, 2);
    assert.deepEqual(JSON.parse(network.calls[0].options.body), ["PING"]);
    assert.equal(network.calls[0].url, "https://dedicated-redis.example.test");
    assert.equal(network.calls[1].url, "https://secure.nmi.com/api/query.php");
    const params = network.calls[1].options.body;
    assert.deepEqual([...params.keys()].sort(), ["action_type", "order_id", "security_key"]);
    assert.equal(params.get("action_type"), "sale");
    assert.match(params.get("order_id"), /^ZVT-PREFLIGHT-[a-f0-9-]{36}$/);
    ids.push(params.get("order_id"));
    for (const call of network.calls) {
      assert.equal(call.options.method, "POST");
      assert.equal(call.options.redirect, "error");
      assert.equal(call.options.cache, "no-store");
      assert.ok(call.options.signal instanceof AbortSignal);
      assert.doesNotMatch(call.url, /transact|payments|customer_vault/);
    }
    const output = logs.join("\n");
    assert.match(output, /charge authorization and settlement were not tested/);
    for (const secret of ["test-private-key", "test-redis-token", "test-public-tokenization-key", "test-smtp-password", "sender@example.test", "business@example.test", ids.at(-1)]) assert.ok(!output.includes(secret));
  }
  assert.notEqual(ids[0], ids[1]);
});

test("failed, malformed or oversize PING blocks the build and prevents gateway access", async () => {
  for (const reply of [
    response('{"error":"test-redis-token is invalid"}', 401),
    response('{"result":"WRONG"}'),
    response('{"error":"denied","result":"PONG"}'),
    response("<html>not redis</html>"),
    response("x".repeat(9000)),
    new Error("test-redis-token secret must not appear"),
  ]) {
    const network = fakeNetwork([reply]);
    const logs = [];
    const result = await runReleasePreflight({ env: env(), fetchImpl: network.fetch, log: value => logs.push(value) });
    assert.equal(result.code, "CHECKOUT_STORAGE_UNAVAILABLE");
    assert.equal(network.calls.length, 1);
    assert.ok(!logs.join("\n").includes("test-redis-token"));
  }
});

test("explicit NMI access rejection fails safely without emitting the error response", async () => {
  for (const reply of [
    response("secret body", 401), response("secret body", 403),
    response("<nm_response><error>Authentication Failed test-private-key</error></nm_response>"),
    response("<nm_response><error_response>Invalid security_key test-private-key</error_response></nm_response>"),
    response("Invalid credentials test-private-key"),
  ]) {
    const network = fakeNetwork([response('{"result":"PONG"}'), reply]);
    const logs = [];
    const result = await runReleasePreflight({ env: env(), fetchImpl: network.fetch, log: value => logs.push(value) });
    assert.equal(result.code, "GATEWAY_ACCESS_REJECTED");
    assert.ok(!logs.join("\n").includes("test-private-key"));
    assert.ok(!logs.join("\n").includes("secret body"));
  }
});

test("ambiguous query outcomes remain explicitly unverified and never leak a customer record", async () => {
  for (const reply of [
    response("provider unavailable", 503), response("slow down", 429),
    response("<html>gateway login</html>"), response("<nm_response><error>Unknown error</error></nm_response>"),
    response("<nm_response><transaction><first_name>PRIVATE_CUSTOMER</first_name></transaction></nm_response>"),
    response('<!DOCTYPE root [<!ENTITY x "private">]><nm_response>&x;</nm_response>'),
    response("x".repeat(70000)),
    new Error("PRIVATE_CUSTOMER test-private-key"),
  ]) {
    const network = fakeNetwork([response('{"result":"PONG"}'), reply]);
    const logs = [];
    const result = await runReleasePreflight({ env: env(), fetchImpl: network.fetch, log: value => logs.push(value) });
    assert.deepEqual(result, { status: "passed", gateway: "unverified" });
    assert.match(logs.join("\n"), /WARN:.*could not be verified/);
    assert.ok(!logs.join("\n").includes("PRIVATE_CUSTOMER"));
    assert.ok(!logs.join("\n").includes("test-private-key"));
    assert.equal(network.calls.length, 2);
  }
});

test("only an empty NMI reporting envelope counts as positive query authentication", () => {
  for (const body of ["<nm_response/>", "<nm_response></nm_response>", '<?xml version="1.0" encoding="UTF-8"?>\n<nm_response> </nm_response>']) {
    assert.equal(classifyQueryResponse(200, body), "verified");
  }
  for (const body of ["", "OK", "<success/>", "<nm_response>unknown</nm_response>", "<nm_response><unknown>1</unknown></nm_response>"]) {
    assert.equal(classifyQueryResponse(200, body), "unverified");
  }
});

test("CLI returns a nonzero build exit code for enabled but incomplete production configuration", () => {
  const run = spawnSync(process.execPath, [path.resolve(__dirname, "../scripts/shopify-release-preflight.cjs")], {
    env: { VERCEL_ENV: "production", SHOPIFY_CHECKOUT_ENABLED: "true" },
    encoding: "utf8",
    timeout: 5000,
  });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /FAIL: Shopify checkout terms approval is missing/);
  assert.equal(run.stderr, "");
});

test("SMTP resolver uses existing notification defaults and business recipient fallback", () => {
  const defaults = resolveSmtpConfig(env());
  assert.equal(defaults.recipient, "business@example.test");
  assert.deepEqual(defaults.transport, {
    host: "smtp.gmail.com", port: 587, secure: false,
    auth: { user: "sender@example.test", pass: "test-smtp-password" },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 8000,
    logger: false, debug: false,
  });
  const custom = resolveSmtpConfig({
    ...env(), EMAIL_HOST: "smtp.example.test", EMAIL_PORT: "465", EMAIL_SECURE: "true",
    BUSINESS_EMAIL: "", EMAIL_USER: " sender@example.test ",
  });
  assert.equal(custom.recipient, "sender@example.test");
  assert.equal(custom.transport.host, "smtp.example.test");
  assert.equal(custom.transport.port, 465);
  assert.equal(custom.transport.secure, true);
  assert.equal(resolveSmtpConfig({ ...env(), BUSINESS_EMAIL: "Owner <owner@example.test>, backup@example.test" }).recipient,
    "Owner <owner@example.test>, backup@example.test");
});

test("invalid SMTP configuration blocks production without any connection", async () => {
  for (const override of [
    { EMAIL_USER: "" }, { EMAIL_PASSWORD: "" }, { EMAIL_PASSWORD: "   " },
    { BUSINESS_EMAIL: "invalid-recipient" }, { BUSINESS_EMAIL: "owner@example.test\r\nBcc: another@example.test" },
    { EMAIL_PORT: "0" }, { EMAIL_PORT: "65536" }, { EMAIL_PORT: "587.5" },
    { EMAIL_HOST: "https://smtp.example.test" }, { EMAIL_HOST: "smtp.example.test " },
    { EMAIL_SECURE: "yes" }, { EMAIL_SECURE: "true", EMAIL_PORT: "587" },
    { EMAIL_SECURE: "false", EMAIL_PORT: "465" },
  ]) {
    const network = fakeNetwork();
    let transportCreated = false;
    const result = await runReleasePreflight({
      env: { ...env(), ...override }, fetchImpl: network.fetch, log: () => {},
      createSmtpTransport: () => { transportCreated = true; throw new Error("Must not connect."); },
    });
    assert.equal(result.code, "INVALID_SMTP_CONFIG");
    assert.equal(network.calls.length, 0);
    assert.equal(transportCreated, false);
  }
});

test("SMTP preflight verifies once and closes without sending or leaking provider data", async () => {
  const network = fakeNetwork([response('{"result":"PONG"}'), response("<nm_response/>")]);
  let verifies = 0, closes = 0;
  const logs = [];
  const result = await runReleasePreflight({
    env: env(), fetchImpl: network.fetch, log: value => logs.push(value),
    createSmtpTransport: options => {
      assert.deepEqual(options, resolveSmtpConfig(env()).transport);
      return {
        verify: async () => { verifies++; return true; },
        close: () => { closes++; },
        sendMail: () => assert.fail("Preflight must never send an email."),
      };
    },
  });
  assert.equal(result.status, "passed");
  assert.equal(verifies, 1);
  assert.equal(closes, 1);
  assert.match(logs.join("\n"), /SMTP connection and authentication verified; no email was sent/);
  assert.ok(!logs.join("\n").includes("test-smtp-password"));
});

test("SMTP verify or transport failures block build safely and always close created transport", async () => {
  for (const failure of ["rejected", "false", "create"]) {
    const network = fakeNetwork([response('{"result":"PONG"}')]);
    let closes = 0;
    const logs = [];
    const result = await runReleasePreflight({
      env: env(), fetchImpl: network.fetch, log: value => logs.push(value),
      createSmtpTransport: () => {
        if (failure === "create") throw new Error("test-smtp-password secret provider diagnostic");
        return {
          verify: async () => { if (failure === "rejected") throw new Error("test-smtp-password bad auth"); return false; },
          close: () => { closes++; },
          sendMail: () => assert.fail("No email permitted."),
        };
      },
    });
    assert.equal(result.code, "SMTP_VERIFY_FAILED");
    assert.equal(network.calls.length, 1, "Do not make a gateway request after failed SMTP verification.");
    assert.equal(closes, failure === "create" ? 0 : 1);
    assert.ok(!logs.join("\n").includes("test-smtp-password"));
    assert.ok(!logs.join("\n").includes("provider diagnostic"));
  }
});

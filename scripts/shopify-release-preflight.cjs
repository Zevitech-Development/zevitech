#!/usr/bin/env node
"use strict";

// Build-time readiness checks only. Never imports the charge service or submits
// a payment. Run inside Vercel so write-only production secrets stay there.
// NMI documents this endpoint as read-only transaction reporting:
// https://docs.nmi.com/reference/query
// https://support.nmi.com/hc/en-gb/articles/360002575497-Security-Keys
const { randomUUID } = require("node:crypto");
const { XMLParser, XMLValidator } = require("fast-xml-parser");

const QUERY_URL = "https://secure.nmi.com/api/query.php";
const PREFIX = "[shopify-release-preflight]";

// Keep this contract aligned with resolveCheckoutRedisConfig in the checkout
// store. Tests compare the two. Do not fall back to a different site's generic KV.
function resolveRedisConfig(env) {
  const explicit = env.SHOPIFY_CHECKOUT_REDIS_REST_URL !== undefined
    || env.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN !== undefined;
  const url = (explicit ? env.SHOPIFY_CHECKOUT_REDIS_REST_URL : env.SHOPIFY_CHECKOUT_KV_REST_API_URL)?.trim();
  const token = (explicit ? env.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN : env.SHOPIFY_CHECKOUT_KV_REST_API_TOKEN)?.trim();
  if (!url || !token) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password
      || parsed.search || parsed.hash || parsed.pathname !== "/") return null;
    return { url: parsed.origin, token };
  } catch { return null; }
}

function validOpaqueKey(value) {
  return typeof value === "string" && value.length > 0
    && value === value.trim() && !/\s/.test(value);
}

function validProductionOrigin(value) {
  if (typeof value !== "string" || value !== value.trim()) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password
      && !parsed.search && !parsed.hash && parsed.pathname === "/";
  } catch { return false; }
}

function resolveSmtpConfig(env) {
  const user = env.EMAIL_USER?.trim();
  const recipient = (env.BUSINESS_EMAIL || env.EMAIL_USER)?.trim();
  const password = env.EMAIL_PASSWORD;
  const host = env.EMAIL_HOST || "smtp.gmail.com";
  const port = Number(env.EMAIL_PORT || "587");
  if (!user || !recipient || typeof password !== "string" || !password.trim()
    || /[\r\n]/.test(user + recipient)
    || !Number.isInteger(port) || port < 1 || port > 65535
    || /[\s/@?#]/.test(host)) return null;
  const addresses = require("nodemailer/lib/addressparser")(recipient, { flatten: true });
  if (!addresses.length || addresses.some(item => !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(item.address || ""))) return null;
  // The order notification sender uses port===465. Do not validate one TLS
  // configuration here while production sends using a different configuration.
  const secure = port === 465;
  if (env.EMAIL_SECURE !== undefined
    && (!["true", "false"].includes(env.EMAIL_SECURE) || (env.EMAIL_SECURE === "true") !== secure)) return null;
  return {
    recipient,
    transport: {
      host, port, secure, auth: { user, pass: password },
      connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 8000,
      logger: false, debug: false,
    },
  };
}

async function verifySmtp(config, createSmtpTransport) {
  let transport;
  let timer;
  try {
    transport = createSmtpTransport(config.transport);
    // Nodemailer verify checks connection, TLS and authentication without MAIL
    // FROM, RCPT TO, or DATA. It does not establish recipient delivery.
    // https://nodemailer.com/smtp#verifying-the-configuration
    const verified = await Promise.race([
      transport.verify(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("SMTP_VERIFY_TIMEOUT")), 15000);
      }),
    ]);
    return verified === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
    try { transport?.close(); } catch { /* Never print provider diagnostics. */ }
  }
}

async function readLimitedBody(response, limit) {
  if (Number(response.headers.get("content-length")) > limit) {
    await response.body?.cancel().catch(() => {});
    throw new Error("PREFLIGHT_RESPONSE_TOO_LARGE");
  }
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) {
        await reader.cancel();
        throw new Error("PREFLIGHT_RESPONSE_TOO_LARGE");
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}

function explicitAuthFailure(value) {
  if (typeof value !== "string") return false;
  return /\b(?:authentication\s+(?:failed|failure)|invalid\s+(?:security[ _-]?key|api[ _-]?key|credentials)|(?:security[ _-]?key|api[ _-]?key)\s+(?:is\s+)?(?:invalid|missing|required)|unauthori[sz]ed|access\s+denied)\b/i.test(value);
}

function classifyQueryResponse(status, body) {
  if (status === 401 || status === 403) return "rejected";
  if (status < 200 || status >= 300 || !body || body.length > 65536) return "unverified";
  if (/<!DOCTYPE|<!ENTITY/i.test(body)) return "unverified";
  if (XMLValidator.validate(body) !== true) {
    // Some gateways return a short plain-text error. Never print that response.
    return body.length < 500 && !/[<>]/.test(body) && explicitAuthFailure(body)
      ? "rejected" : "unverified";
  }
  try {
    const parsed = new XMLParser({
      parseTagValue: false, processEntities: false, ignoreAttributes: false,
    }).parse(body);
    if (!Object.prototype.hasOwnProperty.call(parsed, "nm_response")) return "unverified";
    const report = parsed.nm_response;
    if (report === "") return "verified";
    if (!report || typeof report !== "object" || Array.isArray(report)) return "unverified";
    // An impossible ID should not return a transaction. Discard any unexpected
    // record and do not inspect or log customer details.
    if (Object.prototype.hasOwnProperty.call(report, "transaction")) return "unverified";
    for (const field of ["error", "error_response", "error_message", "responsetext", "response_text"]) {
      if (explicitAuthFailure(report[field])) return "rejected";
      if (report[field]) return "unverified";
    }
    // Only a genuinely empty reporting envelope is a positive authentication
    // signal. Unknown schemas are not silently labelled valid credentials.
    return Object.keys(report).length === 0 ? "verified" : "unverified";
  } catch { return "unverified"; }
}

async function runReleasePreflight({
  env = process.env, fetchImpl = globalThis.fetch,
  createSmtpTransport = options => require("nodemailer").createTransport(options),
  log = console.log,
} = {}) {
  const report = message => log(`${PREFIX} ${message}`);
  const fail = (code, message) => {
    report(`FAIL: ${message}`);
    return { status: "failed", code };
  };
  if (env.VERCEL_ENV !== "production" || env.SHOPIFY_CHECKOUT_ENABLED !== "true") {
    report("SKIP: checks run only for a production deployment with Shopify checkout enabled.");
    return { status: "skipped" };
  }
  if (env.SHOPIFY_CHECKOUT_TERMS_APPROVED !== "true") {
    return fail("TERMS_NOT_APPROVED", "Shopify checkout terms approval is missing.");
  }
  if (env.SHOPIFY_CHECKOUT_MODE !== "live") {
    return fail("INVALID_CHECKOUT_MODE", "Enabled production checkout must use live mode.");
  }
  if (!validProductionOrigin(env.SHOPIFY_CHECKOUT_ORIGIN)) {
    return fail("INVALID_CHECKOUT_ORIGIN", "Checkout origin must be a valid HTTPS origin.");
  }
  if (!validOpaqueKey(env.NMI_SECURITY_KEY)) {
    return fail("INVALID_GATEWAY_KEY", "NMI security key is missing or contains whitespace.");
  }
  if (!validOpaqueKey(env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY)) {
    return fail("INVALID_TOKENIZATION_KEY", "NMI tokenization key is missing or contains whitespace.");
  }
  const redis = resolveRedisConfig(env);
  if (!redis) {
    return fail("INVALID_CHECKOUT_STORAGE", "A complete dedicated Shopify checkout Redis credential pair is required.");
  }
  const smtp = resolveSmtpConfig(env);
  if (!smtp) {
    return fail("INVALID_SMTP_CONFIG", "Order notification SMTP settings or business recipient are incomplete or inconsistent.");
  }
  if (typeof fetchImpl !== "function") {
    return fail("FETCH_UNAVAILABLE", "This build runtime does not provide fetch.");
  }
  report("PASS: production checkout configuration is present.");

  try {
    const response = await fetchImpl(redis.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${redis.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["PING"]),
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("PREFLIGHT_STORAGE_UNAVAILABLE");
    const body = JSON.parse(await readLimitedBody(response, 8192));
    if (body.error || body.result !== "PONG") throw new Error("PREFLIGHT_STORAGE_UNAVAILABLE");
  } catch {
    return fail("CHECKOUT_STORAGE_UNAVAILABLE", "Dedicated checkout storage did not confirm PONG. No storage records were written.");
  }
  report("PASS: dedicated checkout storage confirmed PONG; no records were written.");

  if (!await verifySmtp(smtp, createSmtpTransport)) {
    return fail("SMTP_VERIFY_FAILED", "Order notification SMTP connection or authentication failed. No email was sent.");
  }
  report("PASS: order notification SMTP connection and authentication verified; no email was sent. Recipient delivery is untested.");

  let gateway = "unverified";
  try {
    // Exact, randomized noncustomer ID. action_type is a reporting filter on
    // query.php, not a transaction operation. Never add amount, type, card or token.
    const body = new URLSearchParams({
      security_key: env.NMI_SECURITY_KEY,
      order_id: `ZVT-PREFLIGHT-${randomUUID()}`,
      action_type: "sale",
    });
    const response = await fetchImpl(QUERY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if (response.status === 401 || response.status === 403) gateway = "rejected";
    else gateway = classifyQueryResponse(response.status, await readLimitedBody(response, 65536));
  } catch {
    // Never emit an Error object: URLs, headers and payloads can contain secrets.
    gateway = "unverified";
  }
  if (gateway === "rejected") {
    return fail("GATEWAY_ACCESS_REJECTED", "NMI read-only query explicitly rejected gateway access. No transaction was submitted.");
  }
  if (gateway === "verified") {
    report("PASS: NMI read-only query returned an empty report for the randomized noncustomer ID.");
  } else {
    report("WARN: NMI query access could not be verified. Credential validity is not confirmed; no transaction was submitted.");
  }
  report("COMPLETE: read-only checks finished. Collect.js tokenization, charge authorization and settlement were not tested.");
  return { status: "passed", gateway };
}

module.exports = { runReleasePreflight, resolveRedisConfig, resolveSmtpConfig, classifyQueryResponse };

if (require.main === module) {
  runReleasePreflight()
    .then(result => { if (result.status === "failed") process.exitCode = 1; })
    .catch(() => {
      console.error(`${PREFIX} FAIL: readiness check could not complete; no diagnostic payload is logged.`);
      process.exitCode = 1;
    });
}

#!/usr/bin/env node
"use strict";

// Local-only export. This module never reads environment variables, calls an API,
// charges a card, uploads conversions, or edits the operator's source ledger.
const fs = require("node:fs");
const path = require("node:path");

const ACTIONS = Object.freeze({
  online: "Purchase",
  offline: "Zevitech | Shopify | Offline Purchase",
});
const PURCHASE_HEADERS = ["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency", "Order ID"];
const ADJUSTMENT_HEADERS = ["Order ID", "Conversion Name", "Adjustment Time", "Adjustment Type", "Adjusted Value", "Adjusted Value Currency"];
const DAY = 86400000;

function fail(location, message) { throw new Error(`${location}: ${message}`); }
function customerId(value) {
  if (typeof value !== "string" || !/^\d{10}$/.test(value) || /^0+$/.test(value)) {
    fail("customerId", "provide the explicitly verified advertiser or conversion-owner account ID as 10 digits without hyphens; there is no default account");
  }
  return value;
}
function object(value, location) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(location, "must be an object");
  return value;
}
function identifier(value, location) {
  if (typeof value !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(value)) {
    fail(location, "must be a nonempty identifier using letters, digits, '.', '_', ':', or '-'");
  }
  return value;
}
function cents(value, location) {
  if (typeof value !== "string" || !/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/.test(value)) {
    fail(location, "must be a positive decimal string with at most two decimal places");
  }
  const [whole, fraction = ""] = value.split(".");
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(result) || result <= 0) fail(location, "must be greater than zero");
  return result;
}
function money(value) { return `${Math.floor(value / 100)}.${String(value % 100).padStart(2, "0")}`; }
function timestamp(value, location, now) {
  const match = typeof value === "string" && value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|([+-])(\d{2}):(\d{2}))$/);
  if (!match) fail(location, "use ISO date/time with seconds and an explicit timezone: YYYY-MM-DDTHH:mm:ssZ or ±HH:mm");
  const [, y, m, d, hh, mm, ss, zone, sign, oh = "0", om = "0"] = match;
  const local = new Date(Date.UTC(+y, +m - 1, +d, +hh, +mm, +ss));
  if (+y < 2000 || local.getUTCFullYear() !== +y || local.getUTCMonth() !== +m - 1 || local.getUTCDate() !== +d || local.getUTCHours() !== +hh || local.getUTCMinutes() !== +mm || local.getUTCSeconds() !== +ss || +oh > 14 || +om > 59 || (+oh === 14 && +om !== 0)) {
    fail(location, "contains an invalid calendar date, time, or timezone offset");
  }
  const offset = zone === "Z" ? 0 : (+oh * 60 + +om) * (sign === "+" ? 1 : -1);
  const ms = local.getTime() - offset * 60000;
  if (ms > now) fail(location, "must not be in the future");
  return ms;
}
function googleTime(ms) { return new Date(ms).toISOString().slice(0, 19).replace("T", " ") + "+0000"; }
function csvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function csv(headers, rows) {
  return "Parameters:TimeZone=+0000\r\n" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

function createExport(input, { now = Date.now() } = {}) {
  object(input, "input");
  if (input.schemaVersion !== 1) fail("schemaVersion", "must be 1");
  const targetCustomerId = customerId(input.customerId);
  if (!Array.isArray(input.knownConversions)) fail("knownConversions", "supply the reviewed tracking ledger, including online purchases and accepted offline imports");
  if (!Array.isArray(input.records)) fail("records", "must be an array");
  const registry = new Map();
  const receiptOwners = new Map();
  for (const [index, raw] of input.knownConversions.entries()) {
    const loc = `knownConversions[${index}]`;
    const entry = object(raw, loc);
    const id = identifier(entry.orderId, `${loc}.orderId`);
    if (registry.has(id)) fail(loc, "duplicate order ID in tracking ledger");
    if (!Object.hasOwn(ACTIONS, entry.source)) fail(loc, "source must be online or offline");
    if (entry.status !== "recorded") fail(loc, "only confirmed recorded conversions belong in this ledger; resolve pending imports first");
    if (entry.currency !== "USD") fail(loc, "currency must be USD");
    const conversionMs = timestamp(entry.conversionTime, `${loc}.conversionTime`, now);
    const valueCents = cents(entry.value, `${loc}.value`);
    if (!Array.isArray(entry.receiptIds) || entry.receiptIds.length === 0) fail(loc, "receiptIds must identify the receipts already included in the recorded value");
    for (const [receiptIndex, receiptId] of entry.receiptIds.entries()) {
      identifier(receiptId, `${loc}.receiptIds[${receiptIndex}]`);
      if (receiptOwners.has(receiptId)) fail(loc, "receipt ID is duplicated in the tracking ledger");
      receiptOwners.set(receiptId, id);
    }
    registry.set(id, { ...entry, conversionMs, valueCents });
  }

  const seenOrders = new Set();
  const purchaseRows = [];
  const adjustmentRows = [];
  const manifest = [];
  for (const [index, raw] of input.records.entries()) {
    const loc = `records[${index}]`;
    const record = object(raw, loc);
    const id = identifier(record.orderId, `${loc}.orderId`);
    if (seenOrders.has(id)) fail(loc, "duplicate order ID in this export; combine receipts into one cumulative record");
    seenOrders.add(id);
    if (!["offline_purchase", "restate"].includes(record.operation)) fail(loc, "operation must be offline_purchase or restate; retractions require separate review");
    if (record.paymentVerified !== true || record.paymentState !== "paid") fail(loc, "payment must be independently verified as paid; pending, authorized-only and declined attempts are not sales");
    if (record.refundState !== "none") fail(loc, "refunds/cancellations require a separately reviewed adjustment or RETRACT; this tool does not export them");
    if (record.currency !== "USD") fail(loc, "currency must be USD");
    if (!Array.isArray(record.receipts) || !record.receipts.length) fail(loc, "provide verified collected-payment receipts");
    const currentReceiptIds = new Set();
    const currentReceiptAmounts = new Map();
    let collectedCents = 0;
    let firstPaidMs = Infinity;
    let lastPaidMs = -Infinity;
    for (const [receiptIndex, rawReceipt] of record.receipts.entries()) {
      const receiptLoc = `${loc}.receipts[${receiptIndex}]`;
      const receipt = object(rawReceipt, receiptLoc);
      const receiptId = identifier(receipt.receiptId, `${receiptLoc}.receiptId`);
      if (currentReceiptIds.has(receiptId) || (receiptOwners.has(receiptId) && receiptOwners.get(receiptId) !== id)) fail(receiptLoc, "duplicate receipt ID; a receipt may belong to only one order");
      currentReceiptIds.add(receiptId);
      receiptOwners.set(receiptId, id);
      if (receipt.status !== "settled") fail(receiptLoc, "receipt must be settled, not pending, declined, refunded or merely authorized");
      if (!["online", "offline"].includes(receipt.channel)) fail(receiptLoc, "channel must be online or offline");
      if (record.operation === "offline_purchase" && receipt.channel !== "offline") fail(receiptLoc, "online checkout receipts must not be imported as a separate offline purchase");
      const receiptCents = cents(receipt.amount, `${receiptLoc}.amount`);
      currentReceiptAmounts.set(receiptId, receiptCents);
      collectedCents += receiptCents;
      if (!Number.isSafeInteger(collectedCents)) fail(receiptLoc, "cumulative amount is too large");
      const paidMs = timestamp(receipt.paidAt, `${receiptLoc}.paidAt`, now);
      firstPaidMs = Math.min(firstPaidMs, paidMs);
      lastPaidMs = Math.max(lastPaidMs, paidMs);
    }
    const known = registry.get(id);
    if (record.operation === "offline_purchase") {
      if (known || record.onlinePurchaseAlreadyTracked !== false || record.originalSource !== "offline") fail(loc, "already-recorded/online purchases cannot become a second conversion; use restate with the original action");
      if (typeof record.gclid !== "string" || !/^[A-Za-z0-9_-]{10,2048}$/.test(record.gclid)) fail(loc, "a captured GCLID is required; do not substitute GBRAID/WBRAID or fabricate a click ID");
      if (record.gbraid || record.wbraid) fail(loc, "BRAID records need a separately configured Data Manager/API route; this CSV route accepts GCLID only");
      const conversionMs = timestamp(record.conversionTime, `${loc}.conversionTime`, now);
      if (conversionMs !== firstPaidMs || lastPaidMs !== firstPaidMs) fail(loc, "new purchase conversionTime must equal first collected payment; later receipts belong in a subsequent restatement");
      if (record.clickTime) {
        const clickMs = timestamp(record.clickTime, `${loc}.clickTime`, now);
        if (clickMs > conversionMs || conversionMs - clickMs > 90 * DAY) fail(loc, "conversion must follow its click and fit within the maximum 90-day click window; also check the action's actual window");
      }
      purchaseRows.push([record.gclid, ACTIONS.offline, googleTime(conversionMs), money(collectedCents), "USD", id]);
      manifest.push({ orderId: id, source: "offline", conversionTime: new Date(conversionMs).toISOString().replace(".000Z", "Z"), value: money(collectedCents), currency: "USD", receiptIds: [...currentReceiptIds], status: "exported_not_uploaded" });
    } else {
      if (!known || record.originalSource !== known.source) fail(loc, "restatement must match a recorded original conversion and its online/offline source");
      if (record.conversionName && record.conversionName !== ACTIONS[known.source]) fail(loc, "conversion action does not match the original conversion");
      if (known.receiptIds.some(receiptId => !currentReceiptIds.has(receiptId))) fail(loc, "include every earlier receipt as well as the later balance; adjusted value is cumulative, not the increment");
      if (known.receiptIds.reduce((sum, receiptId) => sum + currentReceiptAmounts.get(receiptId), 0) !== known.valueCents) fail(loc, "earlier receipt amounts must reconcile to the value already recorded; do not rewrite historical receipts");
      if (firstPaidMs !== known.conversionMs) fail(loc, "first receipt time must match the original purchase conversion time");
      if (collectedCents <= known.valueCents) fail(loc, "balance-payment restatement must increase cumulative collected value; refunds/corrections need separate review");
      const adjustmentMs = timestamp(record.adjustmentTime, `${loc}.adjustmentTime`, now);
      if (adjustmentMs <= known.conversionMs || adjustmentMs < lastPaidMs) fail(loc, "adjustment must follow the original conversion and all included receipts");
      if (now - known.conversionMs > 54 * DAY) fail(loc, "original conversion exceeds the conservative 54-day adjustment window; review the current Google Ads limit before proceeding");
      adjustmentRows.push([id, ACTIONS[known.source], googleTime(adjustmentMs), "RESTATE", money(collectedCents), "USD"]);
      manifest.push({ orderId: id, source: known.source, conversionTime: known.conversionTime, adjustmentTime: record.adjustmentTime, value: money(collectedCents), currency: "USD", receiptIds: [...currentReceiptIds], status: "exported_not_uploaded" });
    }
  }
  return {
    purchasesCsv: csv(PURCHASE_HEADERS, purchaseRows),
    adjustmentsCsv: csv(ADJUSTMENT_HEADERS, adjustmentRows),
    manifest: { schemaVersion: 1, customerId: targetCustomerId, generatedAt: new Date(now).toISOString(), purchaseCount: purchaseRows.length, adjustmentCount: adjustmentRows.length, uploaded: false, conversions: manifest },
  };
}

function blankInput(targetCustomerId) { return { schemaVersion: 1, customerId: customerId(targetCustomerId), knownConversions: [], records: [] }; }
function writeExport(outDir, result) {
  // Creating a fresh directory prevents accidental overwrite of reviewed exports.
  fs.mkdirSync(outDir, { mode: 0o700 });
  const files = {
    "offline-purchases.csv": result.purchasesCsv,
    "conversion-adjustments.csv": result.adjustmentsCsv,
    "export-manifest.json": JSON.stringify(result.manifest, null, 2) + "\n",
  };
  for (const [name, contents] of Object.entries(files)) fs.writeFileSync(path.join(outDir, name), contents, { flag: "wx", mode: 0o600 });
}
function main(args) {
  const [command, ...rest] = args;
  if (command === "template" && rest.length === 2) {
    fs.writeFileSync(rest[0], JSON.stringify(blankInput(rest[1]), null, 2) + "\n", { flag: "wx", mode: 0o600 });
    process.stdout.write("Blank operator input created. No customer records or conversions were invented.\n");
    return;
  }
  if ((command === "validate" && rest.length === 1) || (command === "export" && rest.length === 2)) {
    let input;
    try { input = JSON.parse(fs.readFileSync(rest[0], "utf8")); }
    catch (error) {
      if (error instanceof SyntaxError) fail("input", "invalid JSON; check the file locally (contents are not printed)");
      throw error;
    }
    const result = createExport(input);
    if (command === "export") writeExport(rest[1], result);
    process.stdout.write(`${command === "export" ? "Exported locally" : "Validated"}: ${result.manifest.purchaseCount} offline purchases, ${result.manifest.adjustmentCount} value adjustments. Nothing uploaded.\n`);
    return;
  }
  fail("usage", "node scripts/google-ads-offline-export.cjs template INPUT.json VERIFIED_CUSTOMER_ID | validate INPUT.json | export INPUT.json NEW_OUTPUT_DIRECTORY");
}
if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { process.stderr.write(`Offline export stopped: ${error.message}\n`); process.exitCode = 1; }
}
module.exports = { ACTIONS, PURCHASE_HEADERS, ADJUSTMENT_HEADERS, blankInput, createExport, writeExport };

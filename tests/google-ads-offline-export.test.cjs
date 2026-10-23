const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { ACTIONS, blankInput, createExport, writeExport } = require('../scripts/google-ads-offline-export.cjs');

// Synthetic fixtures only. These are never uploaded and are not customer records.
const now = Date.parse('2026-10-23T18:00:00Z');
const testCustomerId = '1234567890';
const originalTime = '2026-10-20T10:00:00-07:00';
function receipt(id, amount, paidAt = originalTime, channel = 'offline') {
  return { receiptId: id, amount, paidAt, status: 'settled', channel };
}
function purchase(overrides = {}) {
  return {
    operation: 'offline_purchase', orderId: 'TEST-ORDER-A', originalSource: 'offline',
    paymentVerified: true, paymentState: 'paid', refundState: 'none', currency: 'USD',
    onlinePurchaseAlreadyTracked: false, conversionTime: originalTime,
    gclid: 'SYNTHETIC_GCLID_NOT_FOR_UPLOAD', clickTime: '2026-10-19T12:00:00-07:00',
    receipts: [receipt('TEST-RECEIPT-A', '59.90')], ...overrides,
  };
}
function ledger(source = 'online') {
  return {
    orderId: 'TEST-ORDER-A', source, status: 'recorded', conversionTime: originalTime,
    value: '59.90', currency: 'USD', receiptIds: ['TEST-RECEIPT-A'],
  };
}
function restatement(overrides = {}) {
  return {
    operation: 'restate', orderId: 'TEST-ORDER-A', originalSource: 'online',
    paymentVerified: true, paymentState: 'paid', refundState: 'none', currency: 'USD',
    adjustmentTime: '2026-10-22T11:00:00-07:00',
    receipts: [receipt('TEST-RECEIPT-A', '59.90', originalTime, 'online'), receipt('TEST-RECEIPT-B', '539.10', '2026-10-22T10:00:00-07:00')],
    ...overrides,
  };
}
function run(records, knownConversions = []) { return createExport({ ...blankInput(testCustomerId), records, knownConversions }, { now }); }

test('blank template contains no invented conversion rows and is clearly not uploaded', () => {
  const result = run([]);
  assert.equal(result.manifest.purchaseCount, 0);
  assert.equal(result.manifest.uploaded, false);
  assert.deepEqual(result.manifest.conversions, []);
  assert.equal(result.purchasesCsv.split('\r\n').filter(Boolean).length, 2);
});
test('offline paid sale uses canonical GCLID CSV columns, UTC offset, actual collected amount and stable order ID', () => {
  const result = run([purchase()]);
  assert.ok(result.purchasesCsv.startsWith('Parameters:TimeZone=+0000\r\nGoogle Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Order ID\r\n'));
  assert.ok(result.purchasesCsv.includes(`${ACTIONS.offline},2026-10-20 17:00:00+0000,59.90,USD,TEST-ORDER-A`));
  assert.equal(result.manifest.adjustmentCount, 0);
  assert.equal(result.manifest.conversions[0].status, 'exported_not_uploaded');
});
test('online deposit plus later balance produces one RESTATE of total collected, not another purchase or incremental 90%', () => {
  const result = run([restatement()], [ledger()]);
  assert.equal(result.manifest.purchaseCount, 0);
  assert.equal(result.manifest.adjustmentCount, 1);
  assert.ok(result.adjustmentsCsv.startsWith('Parameters:TimeZone=+0000\r\nOrder ID,Conversion Name,Adjustment Time,Adjustment Type,Adjusted Value,Adjusted Value Currency\r\n'));
  assert.equal(ACTIONS.online, 'Purchase');
  assert.ok(result.adjustmentsCsv.includes('TEST-ORDER-A,Purchase,2026-10-22 18:00:00+0000,RESTATE,599.00,USD'));
  assert.ok(!result.adjustmentsCsv.includes('RESTATEMENT'));
});
test('offline first receipt can later be restated against the original offline action', () => {
  const result = run([restatement({ originalSource: 'offline' })], [ledger('offline')]);
  assert.ok(result.adjustmentsCsv.includes(ACTIONS.offline));
  assert.ok(!result.adjustmentsCsv.includes(',' + ACTIONS.online + ','));
});
test('new purchases and adjustments go to separate files', () => {
  const newSale = purchase({ orderId: 'TEST-ORDER-C', receipts: [receipt('TEST-RECEIPT-C', '99.90')] });
  const result = run([newSale, restatement()], [ledger()]);
  assert.equal(result.manifest.purchaseCount, 1);
  assert.equal(result.manifest.adjustmentCount, 1);
  assert.ok(!result.purchasesCsv.includes('RESTATE'));
  assert.ok(!result.adjustmentsCsv.includes(newSale.gclid));
});
test('online-tracked deposits and existing offline purchases cannot be imported as new offline sales', () => {
  assert.throws(() => run([purchase({ onlinePurchaseAlreadyTracked: true })]), /second conversion/);
  assert.throws(() => run([purchase({ onlinePurchaseAlreadyTracked: undefined })]), /second conversion/);
  assert.throws(() => run([purchase()], [ledger()]), /second conversion/);
  assert.throws(() => run([purchase()], [ledger('offline')]), /second conversion/);
  assert.throws(() => run([purchase({ receipts: [receipt('TEST-RECEIPT-A', '59.90', originalTime, 'online')] })]), /online checkout receipts/);
});
test('pending, authorized, refunded, declined and unverified records cannot be exported', () => {
  for (const paymentState of ['pending', 'authorized', 'declined', 'refunded']) assert.throws(() => run([purchase({ paymentState })]), /verified as paid/);
  assert.throws(() => run([purchase({ paymentVerified: false })]), /verified as paid/);
  assert.throws(() => run([purchase({ refundState: 'partial' })]), /refunds\/cancellations/);
  assert.throws(() => run([purchase({ refundState: 'full' })]), /refunds\/cancellations/);
  assert.throws(() => run([purchase({ receipts: [{ ...receipt('TEST-RECEIPT-A', '59.90'), status: 'authorized' }] })]), /receipt must be settled/);
});
test('negative, zero, imprecise and non-string amounts are rejected', () => {
  for (const amount of ['-1', '0', '0.00', '1.001', '1e3', '$59.90', 59.9, 'NaN']) {
    assert.throws(() => run([purchase({ receipts: [receipt('TEST-RECEIPT-A', amount)] })]), /amount/);
  }
});
test('missing timezone, impossible dates and future timestamps are rejected', () => {
  for (const conversionTime of ['2026-10-20T10:00:00', '2026-02-30T10:00:00Z', '2026-10-20T10:00:00+15:00', '2026-10-24T10:00:00Z']) {
    assert.throws(() => run([purchase({ conversionTime })]), /conversionTime/);
  }
});
test('clock offsets convert correctly and conversions must follow their click', () => {
  assert.throws(() => run([purchase({ clickTime: '2026-10-21T10:00:00Z' })]), /must follow its click/);
  assert.throws(() => run([purchase({ clickTime: '2026-01-21T10:00:00Z' })]), /90-day/);
});
test('BRAID-only or mixed identifiers are not mislabelled as GCLID', () => {
  assert.throws(() => run([purchase({ gclid: undefined, wbraid: 'REDACTED_BRAID' })]), /GCLID is required/);
  assert.throws(() => run([purchase({ gbraid: 'REDACTED_BRAID' })]), /BRAID records/);
  assert.throws(() => run([purchase({ gclid: '=HYPERLINK\("bad"\)' })]), /GCLID is required/);
});
test('duplicate orders or receipt IDs in a batch and across ledger orders are rejected', () => {
  assert.throws(() => run([purchase(), purchase()]), /duplicate order ID/);
  assert.throws(() => run([purchase({ receipts: [receipt('TEST-RECEIPT-A', '10'), receipt('TEST-RECEIPT-A', '10')] })]), /duplicate receipt ID/);
  assert.throws(() => run([purchase(), purchase({ orderId: 'TEST-ORDER-B' })]), /duplicate receipt ID/);
  assert.throws(() => run([purchase({ orderId: 'TEST-ORDER-B' })], [ledger()]), /duplicate receipt ID/);
  assert.throws(() => run([], [ledger(), ledger()]), /duplicate order ID/);
});
test('restatement requires exact recorded source and keeps original receipts', () => {
  assert.throws(() => run([restatement()]), /match a recorded original/);
  assert.throws(() => run([restatement({ originalSource: 'offline' })], [ledger()]), /match a recorded original/);
  assert.throws(() => run([restatement({ conversionName: ACTIONS.offline })], [ledger()]), /action does not match/);
  assert.throws(() => run([restatement({ conversionName: 'Zevitech | Shopify | Purchase' })], [ledger()]), /action does not match/);
  assert.throws(() => run([restatement({ receipts: [receipt('TEST-RECEIPT-B', '539.10', '2026-10-22T10:00:00-07:00')] })], [ledger()]), /include every earlier receipt/);
  assert.throws(() => run([restatement({ receipts: [receipt('TEST-RECEIPT-A', '59.90', originalTime, 'online')] })], [ledger()]), /must increase/);
});
test('restatement timing and conservative adjustment expiry are enforced', () => {
  assert.throws(() => run([restatement({ adjustmentTime: originalTime })], [ledger()]), /must follow/);
  assert.throws(() => run([restatement({ adjustmentTime: '2026-10-21T10:00:00Z' })], [ledger()]), /all included receipts/);
  assert.throws(() => run([restatement()], [{ ...ledger(), conversionTime: '2026-08-01T10:00:00Z' }]), /first receipt time/);
  assert.throws(() => run([restatement({ receipts: [receipt('TEST-RECEIPT-A', '59.90', '2026-08-01T10:00:00Z', 'online'), receipt('TEST-RECEIPT-B', '539.10', '2026-10-22T10:00:00-07:00')] })], [{ ...ledger(), conversionTime: '2026-08-01T10:00:00Z' }]), /54-day/);
});
test('historical receipt values cannot be rewritten to inflate cumulative revenue', () => {
  assert.throws(() => run([restatement({ receipts: [receipt('TEST-RECEIPT-A', '599.00', originalTime, 'online'), receipt('TEST-RECEIPT-B', '539.10', '2026-10-22T10:00:00-07:00')] })], [ledger()]), /reconcile to the value/);
});
test('later receipts must use restatement instead of inflating a new initial purchase', () => {
  assert.throws(() => run([purchase({ receipts: [receipt('TEST-RECEIPT-A', '59.90'), receipt('TEST-RECEIPT-B', '539.10', '2026-10-21T10:00:00-07:00')] })]), /subsequent restatement/);
});
test('exports contain no operator-only data and cannot overwrite an existing directory', () => {
  const result = run([purchase({ customerEmail: 'synthetic-private@example.invalid', notes: 'PRIVATE_OPERATOR_NOTE' })]);
  assert.ok(!JSON.stringify(result).includes('synthetic-private'));
  assert.ok(!JSON.stringify(result).includes('PRIVATE_OPERATOR_NOTE'));
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'zevi-offline-test-'));
  try {
    const output = path.join(temp, 'export');
    writeExport(output, result);
    assert.equal(fs.readFileSync(path.join(output, 'offline-purchases.csv'), 'utf8'), result.purchasesCsv);
    assert.throws(() => writeExport(output, result), /EEXIST/);
    if (process.platform !== 'win32') assert.equal(fs.statSync(path.join(output, 'offline-purchases.csv')).mode & 0o777, 0o600);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
test('target account, ledger state and currency must be explicit', () => {
  for (const invalidId of [undefined, '', '0000000000', '123-456-7890', 1234567890, '123456789']) {
    assert.throws(() => blankInput(invalidId), /customerId/);
    assert.throws(() => createExport({ ...blankInput(testCustomerId), customerId: invalidId }, { now }), /customerId/);
  }
  assert.throws(() => createExport({ ...blankInput(testCustomerId), knownConversions: undefined }, { now }), /tracking ledger/);
  assert.throws(() => run([purchase({ currency: 'EUR' })]), /currency must be USD/);
  assert.throws(() => run([], [{ ...ledger(), status: 'pending' }]), /only confirmed recorded/);
});
test('operator-supplied conversion owner is preserved without a manager-account default', () => {
  for (const explicitId of [testCustomerId, '3498902182']) {
    const result = createExport(blankInput(explicitId), { now });
    assert.equal(result.manifest.customerId, explicitId);
  }
});

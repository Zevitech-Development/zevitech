// Notification tests use only injected senders and a mocked SMTP transport.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const nodemailer = require('nodemailer');
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
const { renderShopifyOrderNotification, notifyPaidShopifyOrder, sendShopifyOrderNotification } = require('../src/services/shopify-checkout-notifications.ts');

function paidOrder() {
  return {
    id: `ZVT-${'a'.repeat(32)}`, status: 'paid', mode: 'live', packageName: 'Executive',
    amount: 249.9, amountPaid: 249.9, upfrontAmount: 249.9, totalAmount: 2499,
    balanceAmount: 2249.1, currency: 'USD', paymentStage: 'upfront', paymentVersion: 'upfront-10-v2',
    transactionId: '123456789', productLimit: 250, features: ['Custom logo design: 5 concepts', 'Unique pages'],
    accessHash: 'PRIVATE-ACCESS-HASH', briefHash: 'PRIVATE-BRIEF-HASH', paymentToken: 'PRIVATE-CARD-TOKEN',
    brief: {
      package: { name: 'Executive' },
      business: {
        name: 'Sample Customer', email: 'customer@example.test', phone: '+1 202 555 0123',
        brand: 'Sample & Brand', brief: 'Build a store\nfor our collection', projectType: 'New store',
        businessType: 'products', businessCategory: 'Fashion', designNotes: 'Soft contrast',
        references: 'https://reference.example.test', requirements: '', existingStore: '',
      },
      design: { template: 'Clotya Fashion', layout: 'Dimensional', palette: 'Ocean' },
      needs: { productCount: '250', featureIds: ['reviews'], customizationIds: ['customPalette'] },
      priorities: ['Clear product pages'], imageFilenames: ['product.jpg'], logoFilename: 'brand.svg',
    },
  };
}
function notificationStore(order) {
  return {
    claims: 0,
    async claimNotification(id) {
      assert.equal(id, order.id);
      this.claims++;
      if (order.operatorNotification) return false;
      order.operatorNotification = { status: 'processing' };
      return true;
    },
    async finishNotification(id, success) {
      assert.equal(id, order.id);
      if (order.operatorNotification?.status === 'processing') {
        order.operatorNotification = { status: success ? 'sent' : 'failed' };
      }
    },
  };
}

test('paid-order notification includes contact, full brief and exact 10/90 terms without payment credentials', () => {
  const order = paidOrder();
  const message = renderShopifyOrderNotification(order);
  for (const value of [
    order.id, order.transactionId, 'Executive', '$2,499.00', '$249.90', '$2,249.10',
    '10% upfront', 'after customer approval', '7 working days', 'Sample Customer', 'customer@example.test',
    '+1 202 555 0123', 'Build a store', 'Soft contrast', 'Clotya Fashion', 'Product reviews and blog',
    'Custom logo design: 5 concepts', 'brand.svg', 'product.jpg',
  ]) assert.ok(message.text.includes(value), value);
  assert.doesNotMatch(JSON.stringify(message), /PRIVATE-ACCESS|PRIVATE-BRIEF|PRIVATE-CARD/);
  assert.match(message.text, /Original image and logo files are not stored/);
  assert.match(message.text, /remaining balance has not been charged/);
});

test('customer-supplied HTML and image filenames are escaped in every rendered notification field', () => {
  const order = paidOrder();
  const attack = '<img src=x onerror="bad()"> & <script>bad()</script>';
  order.brief.business.name = attack;
  order.brief.business.designNotes = attack;
  order.brief.design.template = attack;
  order.brief.logoFilename = attack;
  order.brief.imageFilenames = [attack];
  order.brief.priorities = [attack];
  const message = renderShopifyOrderNotification(order);
  assert.doesNotMatch(message.html, /<img|<script>/i);
  assert.match(message.html, /&lt;img src=x onerror=&quot;bad\(\)&quot;&gt;/);
  assert.ok(message.text.includes(attack), 'Plain text preserves the exact brief');
  assert.equal(message.subject.includes(attack), false, 'Customer text never enters email headers');
});

test('only verified live paid orders can claim a notification', async () => {
  for (const overrides of [
    { status: 'created' }, { status: 'processing' }, { status: 'pending' },
    { status: 'declined' }, { status: 'cancelled' }, { mode: 'sandbox' },
    { transactionId: '' }, { transactionId: '0' }, { transactionId: 'unverified' },
  ]) {
    const order = Object.assign(paidOrder(), overrides);
    const store = notificationStore(order);
    let sends = 0;
    await notifyPaidShopifyOrder(order, store, async () => { sends++; });
    assert.equal(sends, 0);
    assert.equal(store.claims, 0);
    assert.equal(order.operatorNotification, undefined);
  }
});

test('concurrent status recovery and repeated requests send the operator brief at most once', async () => {
  const order = paidOrder();
  const store = notificationStore(order);
  let sends = 0;
  const sender = async message => {
    assert.equal(message.orderId, order.id);
    sends++;
    await Promise.resolve();
  };
  await Promise.all([notifyPaidShopifyOrder(order, store, sender), notifyPaidShopifyOrder(order, store, sender)]);
  await notifyPaidShopifyOrder(order, store, sender);
  assert.equal(sends, 1);
  assert.equal(order.operatorNotification.status, 'sent');
  assert.equal(order.status, 'paid');
  assert.equal(order.amountPaid, 249.9);
});

test('failed or ambiguous notification delivery remains recorded and never changes paid state or automatically resends', async () => {
  const order = paidOrder();
  const store = notificationStore(order);
  let sends = 0;
  const sender = async () => { sends++; throw new Error('SMTP interrupted after possible delivery'); };
  await notifyPaidShopifyOrder(order, store, sender);
  await notifyPaidShopifyOrder(order, store, sender);
  assert.equal(sends, 1);
  assert.equal(order.operatorNotification.status, 'failed');
  assert.equal(order.status, 'paid');
  assert.equal(order.amountPaid, 249.9);
  assert.equal(order.balanceAmount, 2249.1);
});

test('notification datastore outages cannot turn an approved payment into an exception', async () => {
  const order = paidOrder();
  let sends = 0;
  await notifyPaidShopifyOrder(order, {
    async claimNotification() { throw new Error('storage unavailable'); },
    async finishNotification() { throw new Error('storage unavailable'); },
  }, async () => { sends++; });
  assert.equal(sends, 0);
  assert.equal(order.status, 'paid');
  const store = notificationStore(order);
  store.finishNotification = async () => { throw new Error('storage unavailable after email'); };
  await notifyPaidShopifyOrder(order, store, async () => { sends++; });
  await notifyPaidShopifyOrder(order, store, async () => { sends++; });
  assert.equal(sends, 1);
  assert.equal(order.operatorNotification.status, 'processing');
  assert.equal(order.status, 'paid');
});

test('SMTP recipient comes only from existing business configuration and attachments or URL loading are disabled', async () => {
  const previousEnv = process.env;
  const previousTransport = nodemailer.createTransport;
  const captured = [];
  process.env = {
    EMAIL_USER: 'mailbox@example.test', EMAIL_PASSWORD: 'mock-password',
    EMAIL_HOST: 'smtp.example.test', EMAIL_PORT: '465', BUSINESS_EMAIL: 'orders@example.test',
  };
  nodemailer.createTransport = config => {
    assert.equal(config.secure, true);
    assert.equal(config.host, 'smtp.example.test');
    return {
      async sendMail(message) { captured.push(message); return { accepted: [message.to] }; },
      close() {},
    };
  };
  try {
    const message = renderShopifyOrderNotification(paidOrder());
    await sendShopifyOrderNotification(message);
    assert.equal(captured[0].to, 'orders@example.test');
    assert.equal(captured[0].from, 'mailbox@example.test');
    assert.equal(captured[0].disableFileAccess, true);
    assert.equal(captured[0].disableUrlAccess, true);
    assert.equal(captured[0].messageId, `<shopify-${message.orderId}@zevitech.com>`);
    delete process.env.BUSINESS_EMAIL;
    await sendShopifyOrderNotification(message);
    assert.equal(captured[1].to, 'mailbox@example.test');
    delete process.env.EMAIL_PASSWORD;
    await assert.rejects(sendShopifyOrderNotification(message), /ORDER_NOTIFICATION_UNAVAILABLE/);
    assert.equal(captured.length, 2);
  } finally {
    process.env = previousEnv;
    nodemailer.createTransport = previousTransport;
  }
});

// Lead email rendering and validation. No network or mail server.
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
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = function (module, filename) {
    module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename);
  };
}
const { renderShopifyLead, sendShopifyLead } = require('../src/services/shopify-lead-service.ts');
const { ShopifyLeadSchema } = require('../src/schemas/shopify-lead-schema.ts');

const lead = {
  intent: 'checkout', name: 'Alex <Morgan>', email: 'alex@example.com', phone: '+1 302 217 6872', brand: 'Morgan Goods',
  brief: 'Leather goods\nfor professionals', projectType: 'New store', businessType: 'products', businessCategory: 'Fashion',
  design: 'Atelier Spotlight', packageName: 'Growth', packagePrice: 599, attribution: { utm_source: 'google', gclid: 'abc123' },
};

test('a valid lead renders every contact and project field, escaped, with campaign attribution', () => {
  const parsed = ShopifyLeadSchema.parse(lead);
  const message = renderShopifyLead(parsed);
  assert.match(message.subject, /reached payment — Alex <Morgan> \(Morgan Goods\)/);
  for (const value of ['alex@example.com', '+1 302 217 6872', 'Morgan Goods', 'Atelier Spotlight', 'Growth', '$599', 'Fashion', 'google', 'abc123']) {
    assert.ok(message.text.includes(value), value);
    assert.ok(message.html.includes(value), value);
  }
  assert.ok(message.html.includes('Alex &lt;Morgan&gt;'));
  assert.ok(message.html.includes('Leather goods<br>for professionals'));
  assert.match(message.orderId, /^lead-/);
});

test('quote requests use the quote subject', () => {
  const message = renderShopifyLead(ShopifyLeadSchema.parse({ ...lead, intent: 'quote', projectType: 'Redesign my store', existingStore: 'https://shop.example.com' }));
  assert.match(message.subject, /quote request/);
  assert.ok(message.text.includes('https://shop.example.com'));
});

test('incomplete contact details are rejected', () => {
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, email: 'not-an-email' }).success, false);
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, phone: '' }).success, false);
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, brief: '' }).success, false);
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, phone: 'hello' }).success, false);
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, phone: '12345' }).success, false);
});

test('lead capture accepts checkout-length email and strips unknown attribution fields', () => {
  const email = `${'a'.repeat(60)}@${'b'.repeat(60)}.${'c'.repeat(60)}.com`;
  const parsed = ShopifyLeadSchema.parse({ ...lead, email, attribution: { utm_source: 'google', customer_email: lead.email } });
  assert.equal(parsed.email, email);
  assert.deepEqual(parsed.attribution, { utm_source: 'google' });
});

test('abandoned checkout leads retain selected scope and escaped custom requests', () => {
  const parsed = ShopifyLeadSchema.parse({ ...lead, productCount: '50', featureIds: ['newsletter'], designNotes: 'Blue <header>', customRequirements: 'A booking request form' });
  const message = renderShopifyLead(parsed);
  assert.match(message.text, /Product \/ service setup range: 50/);
  assert.match(message.text, /Selected features:/);
  assert.match(message.text, /Additional functionality requested: A booking request form/);
  assert.match(message.html, /Blue &lt;header&gt;/);
  assert.equal(ShopifyLeadSchema.safeParse({ ...lead, customRequirements: 'x'.repeat(2001) }).success, false);
});

test('sending passes the rendered lead to the business mailbox sender', async () => {
  const sent = [];
  await sendShopifyLead(ShopifyLeadSchema.parse(lead), async message => { sent.push(message); });
  assert.equal(sent.length, 1);
  assert.ok(sent[0].text.includes('alex@example.com'));
});

const { captureShopifyLead, deliverStoredShopifyLead } = require('../src/services/shopify-lead-service.ts');
const { createShopifyQuoteTracker } = require('../src/lib/shopify-lead-analytics.ts');
test('failed mail retains an accepted durable lead and a retry sends that same ID', async () => {
  let saved; let pending = true; let attempts = 0;
  const store = {
    save: async data => saved ||= {id:'lead-12345678-1234-1234-1234-123456789abc',lead:data,createdAt:'2026-10-22'},
    claim: async () => pending,
    finish: async (_id, success) => { pending = !success; },
  };
  const id = await captureShopifyLead(lead,store,async()=>{attempts++;throw Error('mail down');});
  assert.equal(saved.lead.email,lead.email);
  assert.equal(pending,true);
  await deliverStoredShopifyLead(saved,store,async message=>{attempts++;assert.equal(message.orderId,id);});
  assert.equal(pending,false);
  await captureShopifyLead(lead,store,async()=>{attempts++;});
  assert.equal(attempts,2,'Repeat request does not mail a delivered record twice');
});
test('storage failure rejects capture rather than claiming the enquiry was saved',async()=>{
  let sent=false;
  await assert.rejects(captureShopifyLead(lead,{save:async()=>{throw Error('storage down');}},async()=>{sent=true;}));
  assert.equal(sent,false);
});
test('successful quote conversion is deduplicated, contains no PII, and is never a purchase',()=>{
  const track=createShopifyQuoteTracker(); const events=[];
  const id='lead-12345678-1234-1234-1234-123456789abc';
  assert.equal(track(id,undefined),false);
  assert.equal(track(id,(...args)=>events.push(args)),true);
  track(id,(...args)=>events.push(args));
  assert.equal(events.length,1);
  assert.equal(events[0][1],'generate_lead');
  assert.deepEqual(Object.keys(events[0][2]).sort(),['event_callback','event_id','lead_source','send_to']);
  assert.equal(typeof events[0][2].event_callback,'function');
  assert.equal(track('unverified',(...args)=>events.push(args)),false);
});

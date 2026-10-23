require('./setup-next-image.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText, filename);
const { verifyShopifyPayment } = require('../src/lib/shopify-payment-verification.ts');
function clock() {
  const original = { setTimeout:global.setTimeout, clearTimeout:global.clearTimeout };
  const tasks = new Map(); let id=0;
  global.setTimeout = (fn, ms) => { tasks.set(++id,{fn,ms}); return id; };
  global.clearTimeout = id => tasks.delete(id);
  return { tasks, async run(ms) { const entry=[...tasks].find(([,v])=>v.ms===ms); assert.ok(entry, `timer ${ms}`); tasks.delete(entry[0]); await entry[1].fn(); }, restore(){Object.assign(global,original);} };
}
test('automatic verification resolves approvals and declines without retrying a charge', async () => {
  for(const status of ['paid','declined']) { const c=clock(); let calls=0, result;
    try { verifyShopifyPayment(async()=>{calls++;return {status:calls===1?'pending':status}}, value=>result=value,()=>assert.fail('unexpected timeout'));
      await c.run(3000); assert.equal(result,undefined); await c.run(10000);
      assert.equal(result.status,status); assert.equal(c.tasks.size,0); assert.equal(calls,2);
    } finally {c.restore();}
  }
});
test('network failure retries verification, deadline stays uncertain and ignores late approval', async () => {
  const c=clock();let calls=0, delayed=0, result, complete;
  try { verifyShopifyPayment(()=>{calls++;return calls===1?Promise.reject(new Error('offline')):new Promise(resolve=>complete=resolve)},v=>result=v,()=>delayed++);
    await c.run(3000); const pending=c.run(10000); await c.run(120000);
    assert.equal(delayed,1); assert.equal(result,undefined); complete({status:'paid'}); await pending;
    assert.equal(result,undefined); assert.equal(c.tasks.size,0);
  }finally{c.restore();}
});
test('unmount cancels queued checks and ignores in-flight results',async()=>{
  const c=clock();let complete,result;
  try { const cancel=verifyShopifyPayment(()=>new Promise(resolve=>complete=resolve),v=>result=v,()=>assert.fail('unmounted'));
    const pending=c.run(3000);cancel();complete({status:'declined'});await pending;
    assert.equal(result,undefined);assert.equal(c.tasks.size,0);
  }finally{c.restore();}
});

test('reopening a stale pending checkout performs only one recovery read without restarting the wait',async()=>{
 const c=clock();let reads=0,delayed=0;
 try {verifyShopifyPayment(async()=>{reads++;return {status:'pending'}},()=>assert.fail('not approved'),()=>delayed++,new Date(Date.now()-60000).toISOString());
 await c.run(0);assert.equal(reads,1);assert.equal(delayed,1);assert.equal(c.tasks.size,0);
 }finally{c.restore();}
});

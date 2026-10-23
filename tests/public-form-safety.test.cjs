const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request,parent,...rest){return resolve.call(this,request.startsWith('@/')?path.join(root,'src',request.slice(2)):request,parent,...rest)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,file)=>m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);
const sent=[];
const load=Module._load;
Module._load=function(request,parent,...rest){if(request==='nodemailer')return {createTransport:()=>({sendMail:async m=>{sent.push(m);return {messageId:'mock-id'}},close(){}})};return load.call(this,request,parent,...rest)};
const {NextRequest}=require('next/server');
const {POST:contact}=require('../src/app/api/send-email/route.ts');
const {POST:legacy}=require('../src/app/api/process-payment/route.ts');
const request=(body,headers={})=>new NextRequest('https://example.test/api/send-email',{method:'POST',headers:{origin:'https://example.test','content-type':'application/json',...headers},body:JSON.stringify(body)});

test('unverified legacy payment cannot send a receipt or report success',async()=>{
 const response=await legacy(request({orderID:'fake',email:'attacker@example.test'}));
 assert.equal(response.status,503); assert.equal(sent.length,0);
 assert.equal((await response.json()).error,'PAYMENT_VERIFICATION_UNAVAILABLE');
 const source=fs.readFileSync(path.join(root,'src/elements/payment/payment-layout.tsx'),'utf8');
 assert.doesNotMatch(source,/PayPalButtons|PayPalScriptProvider|actions\.order\.capture/);
});

test('public mail rejects cross-site requests, oversized messages and attachment paths before SMTP',async()=>{
 for(const [payload,headers,status] of [
  [{to:'external@example.test',subject:'hi',html:'hi'},{origin:'https://foreign.test'},403],
  [{subject:'hi',html:'x'.repeat(66000)},{},413],
  [{subject:'hi',html:'hi',attachments:[{path:'/etc/passwd'}]},{},400],
 ])assert.equal((await contact(request(payload,headers))).status,status);
 assert.equal(sent.length,0);
});

test('mail can only reach configured business mailboxes and refuses provider diagnostics',async()=>{
 const old={...process.env};const fetchBefore=global.fetch;
 Object.assign(process.env,{SHOPIFY_CHECKOUT_REDIS_REST_URL:'https://storage.example.test',SHOPIFY_CHECKOUT_REDIS_REST_TOKEN:'fake',BUSINESS_EMAIL:'business@example.test',EMAIL_USER:'sender@example.test',HOSTINGER_EMAIL_TO:'second@example.test'});
 global.fetch=async()=>new Response(JSON.stringify({result:1}));
 try{
  const response=await contact(request({to:'attacker@example.test',subject:'Enquiry',html:'Test enquiry'}));
  assert.equal(response.status,200);
  assert.deepEqual(sent.map(m=>m.to),['business@example.test','second@example.test']);
  assert.ok(sent.every(m=>m.disableFileAccess&&m.disableUrlAccess));
  assert.equal((await contact(request({subject:'bad\r\nBcc: outside@example.test',html:'hi'}))).status,400);
 }finally{global.fetch=fetchBefore;for(const key of Object.keys(process.env))if(!(key in old))delete process.env[key];Object.assign(process.env,old)}
});

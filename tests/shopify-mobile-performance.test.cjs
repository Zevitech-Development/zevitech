require('./setup-next-image.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request,parent,...rest){if(request.startsWith('@/'))request=path.resolve(__dirname,'../src',request.slice(2));return originalResolve.call(this,request,parent,...rest)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);
const Hero = require('../src/elements/business/shopify/shopify-hero-preview.tsx').default;
const {shopifyHeroCarouselCopy} = require('../src/content/landing/shopify-hero-designs.ts');
const {shopifyShowcaseThumbnails} = require('../src/content/landing/shopify-showcase-thumbnails.ts');
const {getShopifyShowcase} = require('../src/content/landing/shopify-showcase-content.ts');
test('initial hero retains its seven-card stack but loads imagery for only two designs',()=>{
 const html=renderToStaticMarkup(React.createElement(Hero));
 assert.equal((html.match(/<img\b/g)||[]).length,10);
 assert.ok(html.includes('1 / 7') || html.includes('1<!-- --> / <!-- -->7'));
 assert.match(html,/Next store design/);
 assert.ok(shopifyHeroCarouselCopy.firstMovementMs<1000);
 assert.ok(shopifyHeroCarouselCopy.transitionSeconds*1000<shopifyHeroCarouselCopy.intervalMs);
});
test('lightweight thumbnail manifest points to the same approved design and real files',()=>{
 for(const [id,src] of Object.entries(shopifyShowcaseThumbnails)){
  assert.equal(src,getShopifyShowcase(id).thumb);
  assert.ok(fs.existsSync(path.resolve(__dirname,'../public'+src)));
 }
});
test('Shopify chat never opens a stale Tawk widget left over from another landing page',()=>{
 const {OpenLiveChat}=require('../src/utils/open-live-chat.ts');
 const old={window:global.window,document:global.document};const calls=[];
 global.window={location:{pathname:'/landing-pages/shopify-development'},Tawk_API:{maximize:()=>calls.push('tawk')},LiveChatWidget:{call:method=>calls.push(method)}};
 global.document={body:{classList:{remove(){}}}};
 try{OpenLiveChat();assert.deepEqual(calls,['maximize']);calls.length=0;global.window.location.pathname='/services/digital-marketing/google-ads';OpenLiveChat();assert.deepEqual(calls,['tawk']);}
 finally{global.window=old.window;global.document=old.document;}
});

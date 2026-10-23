// Local package-scope regression tests. No provider, browser or network calls.
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
require.extensions['.ts'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
};

const { serializeDesignDraft, parseDesignDraft, DESIGN_DRAFT_LIFETIME } = require('../src/lib/shopify-design-draft.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { ShopifyCheckoutBriefSchema } = require('../src/schemas/shopify-checkout-schema.ts');
const { packageFeatureNeeds } = require('../src/content/landing/shopify-package-recommendation-content.ts');
const now = 1792450000000;
function draft() { return {
  version:1, savedAt:now, templateId:studioTemplates[0].id, layout:0, palette:1,
  customColours:{accent:'#1557b0',ink:'#10243b',surface:'#ffffff',soft:'#eaf2fb'},
  teamDirection:false,layoutChosen:true,paletteChosen:true,
  productCount:'10',featureIds:['unique-pages'],packageName:'Executive',
}; }
test('saved design round trips references and scope without carrying customer or payment data', () => {
 const raw=serializeDesignDraft({...draft(),email:'private@example.test',phone:'+10000000000',brief:'Private business brief',paymentToken:'secret',imageFilenames:['private.png'],price:1});
 assert.ok(raw); const result=parseDesignDraft(raw,now);
 assert.deepEqual(result,draft());
 for(const privateValue of ['private@','private.png','Private business','secret','phone','price']) assert.ok(!raw.includes(privateValue));
});
test('invalid, expired, future and incompatible draft data cannot be restored', () => {
 for(const raw of [null,'{}','not json','x'.repeat(8001),JSON.stringify({...draft(),version:2}),JSON.stringify({...draft(),templateId:'missing'}),JSON.stringify({...draft(),layout:999}),JSON.stringify({...draft(),packageName:'fake'}),JSON.stringify({...draft(),featureIds:['fake']}),JSON.stringify({...draft(),productCount:'-1'}),JSON.stringify({...draft(),savedAt:now-DESIGN_DRAFT_LIFETIME-1}),JSON.stringify({...draft(),savedAt:now+60001})]) assert.equal(parseDesignDraft(raw,now),null);
});
test('custom palette validates colours and duplicate needs are deduplicated', () => {
 assert.equal(serializeDesignDraft({...draft(),customColours:{...draft().customColours,ink:'red'}}),null);
 assert.deepEqual(parseDesignDraft(serializeDesignDraft({...draft(),featureIds:['unique-pages','unique-pages']}),now).featureIds,['unique-pages']);
});
test('checkout schema accepts every supported customization need and rejects unknown scope', () => {
 const schema=ShopifyCheckoutBriefSchema.shape.needs;
 const base={productCount:'10',scopeConfirmed:true};
 assert.ok(schema.safeParse({...base,featureIds:packageFeatureNeeds.map(f=>f.id)}).success);
 assert.equal(schema.safeParse({...base,featureIds:['anything-else']}).success,false);
});

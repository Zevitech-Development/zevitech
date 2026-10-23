// Exercise the signature storefront through the actual preview state and handlers.
// No browser, network, checkout provider, or real order is used.
require('./setup-next-image.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
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
const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { getThemeMinimumPackage } = require('../src/lib/shopify-theme-access.ts');
const { shopifyProductCategories, shopifyLibraryCategory } = require('../src/content/landing/shopify-business-categories.ts');

const tiers = [
  { theme: 'lookbook', minPackage: 'Level Up', below: 'Growth' },
  { theme: 'bundle', minPackage: 'Pro', below: 'Level Up' },
  { theme: 'configurator', minPackage: 'Executive', below: 'Pro' },
  { theme: 'concierge', minPackage: 'Top Tier', below: 'Executive' },
];

function propsFor(reference, packageName) {
  return {
    copy: studioCopy, plan: studioPlans.findIndex(plan => plan.name === packageName),
    packageName, scopeMode: 'package', compactScope: true,
    referenceId: reference.id, layout: reference.layout, palette: reference.palette,
    images: reference.images, logo: '', mobile: false, expanded: false,
    values: {
      businessType: 'products', brand: '', headline: '', brief: '',
      product: reference.product, price: reference.price,
      customAccent: '', customInk: '', customSurface: '', customSoft: '',
    },
  };
}

test('every product category gets all premium storefront designs', () => {
  for (const category of new Set(shopifyProductCategories.map(shopifyLibraryCategory))) {
    for (const tier of tiers) {
      const reference = studioTemplates.find(item => item.category === category && item.signatureTheme === tier.theme);
      assert.ok(reference, `${category}: ${tier.theme}`);
      assert.equal(getThemeMinimumPackage(reference.layout), 'Beginner', reference.id);
      assert.ok(reference.images.length >= 3, reference.id);
      assert.doesNotMatch(reference.name, /(\b\w+\b) \1/, `${reference.name} repeats a word`);
    }
  }
  assert.ok(!studioTemplates.some(item => item.businessType === 'services' && tiers.some(tier => tier.theme === item.signatureTheme)));
});

test('each premium storefront renders at its package and retains its design in lower packages', () => {
  for (const category of ['Fashion', 'Shoes & footwear', 'Furniture']) {
    for (const tier of tiers) {
      const reference = studioTemplates.find(item => item.category === category && item.signatureTheme === tier.theme);
      const unlocked = renderToStaticMarkup(React.createElement(Preview, propsFor(reference, tier.minPackage)));
      // A photograph cannot stand in for the working storefront.
      const shown = new RegExp(`data-signature-theme="${tier.theme}"`);
      assert.match(unlocked, shown, `${reference.id} at ${tier.minPackage}`);
      const locked = renderToStaticMarkup(React.createElement(Preview, propsFor(reference, tier.below)));
      assert.match(locked, shown, `${reference.id} at ${tier.below}`);
    }
  }
});

test('premium storefronts present their package-defining features', () => {
  const reference = theme => studioTemplates.find(item => item.category === 'Furniture' && item.signatureTheme === theme);
  const html = theme => renderToStaticMarkup(React.createElement(Preview, propsFor(reference(theme), 'Top Tier')));
  assert.match(html('lookbook'), /Add the complete look/);
  assert.match(html('lookbook'), /Price: low to high/);
  assert.match(html('lookbook'), /This week’s look/);
  const bundle = html('bundle');
  for (const value of ['5%', '10%', '15%', 'Your bundle', 'Add 2 more to save 5%', 'Ready-made bundles', 'Bundle questions']) assert.ok(bundle.includes(value), value);
  const configurator = html('configurator');
  for (const value of ['Finish', 'Monochrome', 'Personal message', 'EUR', 'Save to wishlist', 'Compare sizes', 'In the details']) assert.ok(configurator.includes(value), value);
  const concierge = html('concierge');
  for (const value of ['Find my match', 'Who are you shopping for?', 'Reward points', 'Latest order', 'Example account data.', 'Never run out.', 'Platinum', 'Book an appointment']) assert.ok(concierge.includes(value), value);
});

const { addDemoCartItem, demoCartSubtotal } = require('../src/lib/shopify-demo-cart.ts');
test('demo bag preserves discounts and separates differently configured items',()=>{
  let cart=[];
  cart=addDemoCartItem(cart,{product:0,quantity:1,variant:'Bundle 10%',unitPrice:288});
  cart=addDemoCartItem(cart,{product:1,quantity:1,variant:'Bundle 10%',unitPrice:378});
  cart=addDemoCartItem(cart,{product:2,quantity:1,variant:'Bundle 10%',unitPrice:405});
  assert.equal(demoCartSubtotal(cart,[{price:320},{price:420},{price:450}]),1071);
  cart=addDemoCartItem(cart,{product:0,quantity:1,variant:'Personalised · JS',unitPrice:360});
  assert.equal(cart.length,4);
  assert.equal(demoCartSubtotal(cart,[{price:320},{price:420},{price:450}]),1431);
  const before=cart;
  assert.equal(addDemoCartItem(cart,{product:0,quantity:1,unitPrice:NaN}),before);
});
test('an approved illustrated design exposes working controls and its own product photography',()=>{
  const ref=studioTemplates.find(t=>t.id==='atelier-bundle-signature');
  const html=renderToStaticMarkup(React.createElement(Preview,propsFor(ref,'Pro')));
  assert.match(html,/data-signature-theme="bundle"/);
  assert.match(html,/Quantity: Cashmere Crewneck Sweater/);
  assert.match(html,/Add bundle to bag/);
  assert.match(html,/--art-src/);
  assert.doesNotMatch(html,/tap a glowing number|More ways to find your favourite/);
});

// Audit the entire library, not only the first fashion references.
test('all reference previews render with functional controls and valid local imagery', async () => {
  const { referencePreviewSettings } = require('../src/lib/shopify-reference-preview.ts');
  const sharp = require('sharp');
  const sources = new Set();
  for (const reference of studioTemplates) {
    const { values, plan } = referencePreviewSettings(reference);
    const html = renderToStaticMarkup(React.createElement(Preview, {
      ...propsFor(reference, studioPlans[plan].name), values, compactScope: true,
    }));
    assert.doesNotMatch(html, /data-showcase-hotspot/, reference.id);
    assert.ok(html.includes('<button'), `${reference.id}: functional controls`);
    for (const match of html.matchAll(/src="(\/store-studio\/[^"?#]+)"/g)) sources.add(match[1]);
  }
  for (const src of sources) {
    assert.ok(fs.existsSync(path.join(root,'public',src)), src);
    if (/\.(?:jpg|png|webp)$/.test(src)) {
      const metadata = await sharp(path.join(root,'public',src)).metadata();
      assert.ok(metadata.width >= 900 || metadata.height >= 1200, `${src}: insufficient source resolution`);
    }
  }
});

test('Atelier Commerce Studio renders the approved section sequence instead of the generic commerce theme', () => {
  const ref=studioTemplates.find(t=>t.id==='atelier-commerce-studio');
  const html=renderToStaticMarkup(React.createElement(Preview,propsFor(ref,'Top Tier')));
  assert.match(html,/data-reference-store="atelier-commerce-studio"/);
  let previous=-1;
  for(const text of ['Shop Clothing','New season.','Shop by Category','Filter &amp; Sort','Member Rewards','What our members say','Recently viewed','Get the ATELIER app','Join our newsletter']) {
    const position=html.indexOf(text);
    assert.ok(position>previous, `${text} follows the approved layout`);
    previous=position;
  }
  assert.match(html,/Tailored Blazer/);
  assert.match(html,/Quick shop/);
  assert.match(html,/atelier-commerce-studio.webp/);
  assert.doesNotMatch(html,/CURATE YOUR PERSPECTIVE|Find your point of view/);
});

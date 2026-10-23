require("./setup-next-image.cjs");
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const original = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return original.call(this, request, parent, ...rest);
};
require.extensions['.ts'] = function(module, filename) {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};
for (const ext of ['.png', '.jpg', '.jpeg', '.webp', '.svg']) require.extensions[ext] = (module, filename) => { module.exports = { src: filename, width: 1, height: 1 }; };
const { getPublicSiteUrl, SITE_URL } = require('../src/utils/site-url.ts');
const { GetPageMetadata, buildServiceSchema } = require('../src/utils/meta-data.ts');
const sitemap = require('../src/app/sitemap.ts').default;
const robots = require('../src/app/robots.ts').default;
const { shopifyServiceSchema } = require('../src/content/landing/shopify-seo-content.ts');

test('production canonicals use the resolved www host, never local or preview deployments', () => {
  for (const value of [undefined, 'https://zevitech.com', 'https://zevitech.com/', 'http://localhost:3000', 'https://preview.vercel.app', 'invalid']) {
    assert.equal(getPublicSiteUrl(value), 'https://www.zevitech.com');
  }
});

test('self canonicals and ad variant social URLs agree', () => {
  const page = GetPageMetadata({ path: '/landing-pages/shopify-development' });
  assert.equal(page.metadataBase.origin, SITE_URL);
  assert.equal(page.openGraph.url, SITE_URL + page.alternates.canonical);
  const variant = GetPageMetadata({ alternates: { canonical: '/landing-pages/website-design' } });
  assert.equal(variant.openGraph.url, SITE_URL + variant.alternates.canonical);
});

test('sitemap covers public static routes and excludes all transactional routes and ad duplicates', () => {
  const entries = sitemap();
  const urls = entries.map(entry => decodeURI(entry.url).replace(/&amp;/g, '&'));
  function walk(dir) {
    return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
  }
  for(const file of walk(path.join(root,'src/app')).filter(p=>p.endsWith('/page.tsx'))) {
    const route = '/' + path.relative(path.join(root,'src/app'), path.dirname(file)).split(path.sep).filter(p=>p && !p.startsWith('(')).join('/');
    const source = fs.readFileSync(file,'utf8');
    if(route.includes('[') || route.endsWith('/website-design/us')) continue;
    if(source.includes('index: false')) { assert.ok(!urls.includes(SITE_URL+route), route+' must stay out'); continue; }
    assert.ok(urls.includes(SITE_URL+route), route+' missing from sitemap');
  }
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(entries.every(e=>!e.lastModified), 'Do not fabricate modification dates');
});

test('noindex pages remain crawlable so directives can be read; API remains disallowed', () => {
  assert.deepEqual(robots().rules.disallow, ['/api/']);
  assert.equal(robots().sitemap, SITE_URL+'/sitemap.xml');
  for(const file of ['payment/page.tsx','payment/success/page.tsx','payment/failure/page.tsx','checkout-page/page.tsx','thankyou/page.tsx','landing-pages/shopify-development/thank-you/page.tsx']) {
    assert.match(fs.readFileSync(path.join(root,'src/app',file),'utf8'), /index: false/);
  }
});

test('service schema lists approved full package prices with current payment terms, no fake ratings', () => {
  const offers = shopifyServiceSchema.hasOfferCatalog.itemListElement;
  assert.deepEqual(offers.map(o=>o.price), [249,599,999,1499,2499,4999]);
  assert.ok(offers.every(o=>o.priceCurrency==='USD' && o.description.includes('10% upfront') && o.description.includes('90%')));
  assert.ok(!JSON.stringify(shopifyServiceSchema).includes('aggregateRating'));
  assert.equal(shopifyServiceSchema.provider['@id'], SITE_URL+'/#organization');
});

test('service breadcrumbs link real Home and service URLs rather than non-existent hub folders', () => {
  const schemas = buildServiceSchema('/services/ecommerce/custom-ecommerce-development', 'Custom ecommerce development');
  const crumbs = schemas[1].itemListElement;
  assert.equal(crumbs.length, 2);
  assert.ok(crumbs.every(c=>c.item.startsWith(SITE_URL)));
  assert.equal(crumbs[1].name, 'Custom ecommerce development');
});

test('sitemap XML escapes ampersands without turning real static routes into encoded 404 paths', () => {
  const { resolveSitemap } = require('next/dist/build/webpack/loaders/metadata/resolve-route-data');
  const entries = sitemap();
  const xml = resolveSitemap(entries);
  const designUrls = entries.filter(e=>e.url.includes('design-&amp;-development'));
  assert.equal(designUrls.length, 4);
  assert.ok(!xml.includes('design-%26-development'));
  assert.ok(!xml.includes('design-&-development'));
  for (const entry of designUrls) {
    const actualUrl = entry.url.replace(/&amp;/g, '&');
    const route = new URL(actualUrl).pathname;
    const metadata = GetPageMetadata({path:route});
    assert.equal(metadata.openGraph.url, actualUrl);
    assert.ok(fs.existsSync(path.join(root, 'src/app/(website)', route, 'page.tsx')));
    assert.ok(xml.includes('<loc>'+entry.url+'</loc>'));
  }
});

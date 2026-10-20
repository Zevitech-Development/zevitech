// Render package scope notes without a browser, provider or network request.
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
    const source = fs.readFileSync(filename, 'utf8');
    module._compile(ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText, filename);
  };
}

const Selector = require('../src/elements/business/shopify/shopify-package-selector.tsx').default;
const Picker = require('../src/elements/business/shopify/shopify-package-picker.tsx').default;
const Comparison = require('../src/elements/business/shopify/shopify-package-comparison.tsx').default;
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { themeTiers } = require('../src/content/landing/shopify-theme-tier-content.ts');
const { packageCardAdditionLimit } = require('../src/content/landing/shopify-package-card-content.ts');

function render(props = {}) {
  return renderToStaticMarkup(React.createElement(Selector, {
    plans: studioPlans,
    selected: 4,
    started: true,
    onSelect: () => {},
    ...props,
  }));
}

function article(markup, name) {
  const result = [...markup.matchAll(/<article\b[\s\S]*?<\/article>/g)]
    .map((match) => match[0])
    .find((html) => html.includes(`>${name}</h3>`));
  assert.ok(result, `${name} card should be visible`);
  return result;
}

test('a cheaper alternative discloses a selected design need it does not include', () => {
  const markup = render({ recommended: 4, productCount: '10', featureIds: ['unique-pages'] });
  const executive = article(markup, 'Executive');
  const pro = article(markup, 'Pro');
  assert.match(executive, /Matches your selected needs/);
  assert.doesNotMatch(executive, /Additional scope to confirm/);
  assert.match(pro, /Additional scope to confirm/);
  assert.match(pro, /Unlimited pages with unique designs/);
  assert.doesNotMatch(pro, /Matches your selected needs/);
  assert.doesNotMatch(pro, /Recommended for your needs/);
  assert.doesNotMatch(pro, /<button\b[^>]*\sdisabled(?:[=\s>])/);
  assert.match(pro, /aria-describedby="[^"]+-scope"/);
});

test('product setup gaps show the requested range and the actual package limit', () => {
  const markup = render({ recommended: 4, productCount: '250', featureIds: [] });
  assert.match(article(markup, 'Executive'), /Matches your selected needs/);
  assert.match(article(markup, 'Pro'), /Product setup: 126–250 requested; up to 125 included/);
});

test('many scope gaps show two items and expose every remaining need through native details', () => {
  const beginner = article(render({
    productCount: '250',
    featureIds: ['reviews', 'unique-pages', 'custom-logos', 'project-manager'],
  }), 'Beginner');
  const note = beginner.match(/<div class="mb-5 rounded-xl[\s\S]*?<\/div>/)?.[0];
  assert.ok(note);
  const visibleItems = note.split('<details')[0].match(/<li>/g) || [];
  assert.equal(visibleItems.length, 2);
  assert.match(note, /Show 3 more scope items/);
  assert.match(note, /<details[\s\S]*Unlimited pages with unique designs/);
  assert.match(note, /<details[\s\S]*5 or more custom logo concepts/);
  assert.match(note, /<details[\s\S]*Dedicated project manager/);
  assert.match(beginner, /Unlimited revisions/);
  assert.doesNotMatch(note, /role="alert"/);
});

test('higher-priced manual choices match inherited scope without being mislabeled recommended', () => {
  const topTier = article(render({
    recommended: 3,
    selected: 5,
    productCount: '10',
    featureIds: ['reviews', 'payment'],
  }), 'Top Tier');
  assert.match(topTier, /Matches your selected needs/);
  assert.doesNotMatch(topTier, /Additional scope to confirm|Recommended for your needs/);
});

test('public package browsing does not display personalized scope claims', () => {
  const markup = render();
  assert.equal((markup.match(/<article\b/g) || []).length, 6);
  assert.doesNotMatch(markup, /Matches your selected needs|Additional scope to confirm/);
});

test('unknown requests and an unconfirmed product count never show a successful match', () => {
  const beginner = article(render({ productCount: 'unknown', featureIds: ['unlisted-need'] }), 'Beginner');
  assert.match(beginner, /Product setup count needs confirmation/);
  assert.match(beginner, /Unlisted feature requests/);
  assert.doesNotMatch(beginner, /Matches your selected needs/);
});

test('cards show cumulative additions compactly and preserve every inclusion in expandable scope', () => {
  const markup = render();
  const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  for (const plan of studioPlans) {
    const card = article(markup, plan.name);
    const beforeScope = card.split('<details')[0];
    const scope = card.match(/<details\b[\s\S]*?<\/details>/)?.[0];
    assert.ok(scope, plan.name);
    assert.doesNotMatch(scope, /<details\b[^>]*\sopen(?:=|\s|>)/);
    assert.match(scope, /<summary[^>]*>View complete package scope<\/summary>/);
    for (const feature of plan.features) assert.ok(scope.includes(escape(feature)), `${plan.name} missing ${feature}`);
    assert.equal((beforeScope.match(/<li\b/g) || []).length, Math.min(packageCardAdditionLimit, plan.additions.length));
    const heading = plan.inheritedFrom ? `Everything in ${plan.inheritedFrom}, plus` : 'Your store essentials';
    assert.ok(beforeScope.includes(heading), plan.name);
    const tier = themeTiers.find(tier => tier.packageName === plan.name);
    assert.ok(beforeScope.includes(escape(tier.label)), plan.name);
    assert.ok(beforeScope.includes(escape(tier.customization)), plan.name);
    assert.match(scope, /total allowance, including inherited work/);
  }
});

test('each package preserves its full price and quotes exact upfront and delivery balance amounts', () => {
  const markup = render();
  for (const [name, total, upfront, balance] of [
    ['Beginner', '$249', '$99.60', '$149.40'],
    ['Growth', '$599', '$239.60', '$359.40'],
    ['Level Up', '$999', '$399.60', '$599.40'],
    ['Pro', '$1,499', '$599.60', '$899.40'],
    ['Executive', '$2,499', '$999.60', '$1,499.40'],
    ['Top Tier', '$4,999', '$1,999.60', '$2,999.40'],
  ]) {
    const card = article(markup, name);
    assert.ok(card.includes(`>${total}</p>`), `${name} keeps its full price`);
    assert.match(card, /full package price · one-time · USD/);
    assert.ok(card.includes(`40% upfront: ${upfront}`), `${name} upfront`);
    assert.ok(card.includes(`60% after delivery: ${balance}`), `${name} balance`);
    assert.doesNotMatch(card, /monthly|discounted/i);
  }
});

test('compact package selection describes the payment split to keyboard and screen reader users', () => {
  const markup = renderToStaticMarkup(React.createElement(Picker, {
    plans: studioPlans, selected: 1, confirmed: true, onSelect: () => assert.fail('No selection during render'),
  }));
  const inputs = [...markup.matchAll(/<input\b[^>]*type="radio"[^>]*>/g)].map(match => match[0]);
  assert.equal(inputs.length, 6);
  assert.ok(inputs.every(input => /aria-describedby="[^"]+-payment [^"]+-summary"/.test(input)));
  assert.equal((markup.match(/40% upfront:/g) || []).length, 6);
  assert.equal((markup.match(/60% after delivery:/g) || []).length, 6);
  assert.match(markup, /Growth selected · \$599 USD full package price/);
});

test('side-by-side comparison shows full totals and payment splits on mobile and desktop', () => {
  const markup = renderToStaticMarkup(React.createElement(Comparison, { plans: studioPlans }));
  assert.match(markup, /Full package price: USD(?:&nbsp;|\u00a0)249/);
  assert.match(markup, /40% upfront: \$99\.60/);
  assert.match(markup, /60% after delivery: \$149\.40/);
  assert.match(markup, /40% upfront: \$999\.60/);
  assert.match(markup, /60% after delivery: \$1,499\.40/);
  assert.doesNotMatch(markup, /hidden md:grid/);
});

test('logo concept allowance is visible in every package card before opening its full scope', () => {
  const markup = render();
  const picker = renderToStaticMarkup(React.createElement(Picker, {
    plans: studioPlans, selected: 0, confirmed: false, onSelect: () => {},
  }));
  for (const [index, plan] of studioPlans.entries()) {
    const count = index + 1;
    const beforeScope = article(markup, plan.name).split('<details')[0];
    assert.ok(beforeScope.includes(`Custom logo design: ${count} ${count === 1 ? 'concept' : 'concepts'} for one final logo`), plan.name);
    assert.ok(picker.includes(`${count} logo ${count === 1 ? 'concept' : 'concepts'} · one final logo`), `${plan.name} picker`);
  }
});

// Server-rendered gallery checks. No browser, provider or network calls.
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

const Gallery = require('../src/elements/business/shopify/shopify-template-gallery.tsx').default;
const ConceptReference = require('../src/elements/business/shopify/shopify-concept-reference.tsx').default;
const StudioSelect = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { shopifyPackageCatalog } = require('../src/content/landing/shopify-package-catalog.ts');
const { shopifyProductCategories, shopifyServiceCategories } = require('../src/content/landing/shopify-business-categories.ts');
const { canUseThemeLayout, getThemeMinimumPackage } = require('../src/lib/shopify-theme-access.ts');
const { getAdjacentShopifyReferenceIndex } = require('../src/lib/shopify-reference-order.ts');
function render(props = {}) {
  return renderToStaticMarkup(React.createElement(Gallery, { selected: 0, onSelect: () => {}, ...props }));
}
// Exercise the component's real industry handler and prop updates while retaining
// hook state. Children still render through React, without a browser or network.
function galleryHarness(props = {}) {
  const state = [];
  const input = { selected: 0, onSelect: () => {}, ...props };
  function tree() {
    let cursor = 0;
    const original = { useState: React.useState, useId: React.useId };
    React.useState = initial => {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    };
    React.useId = () => 'gallery-test';
    try { return Gallery(input); }
    finally { Object.assign(React, original); }
  }
  function nodes(value) {
    if (Array.isArray(value)) return value.flatMap(nodes);
    if (!React.isValidElement(value)) return [];
    return [value, ...nodes(value.props.children)];
  }
  const find = predicate => nodes(tree()).find(predicate);
  return {
    markup: () => renderToStaticMarkup(tree()),
    update: props => { Object.assign(input, props); },
    industry: value => { const field = find(node => node.type === StudioSelect); assert.ok(field); field.props.onChange({ target: { value } }); },
    preview: name => { const button = find(node => node.type === 'button' && node.props['aria-label'] === `Preview ${name}`); assert.ok(button); button.props.onClick(); },
  };
}
function cards(markup) {
  return [...markup.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(match => match[0]);
}
function cardNames(markup) {
  return cards(markup).map(card => card.match(/<h4\b[^>]*>([^<]+)<\/h4>/)[1]
    .replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"'));
}

test('Beginner shows one included design with an explicit industry choice and a single preview action', () => {
  const markup = render();
  const articles = cards(markup);
  assert.equal(articles.length, 1);
  assert.match(markup, /Beginner · 1 included design/);
  assert.match(markup, /<label[^>]*for="[^"]+-industry"/);
  assert.match(markup, /<option value="Fashion" selected="">Fashion<\/option>/);
  assert.equal((markup.match(/<select\b/g) || []).length, 1);
  assert.equal((markup.match(/<button\b/g) || []).length, 1);
  assert.doesNotMatch(markup, /Shortlist|Compare references|type="search"|Unlock with|Show \d+ more/);
  assert.match(markup, /Illustrative references for our design team/);
  const preview = articles[0].match(/<button\b[^>]*>/)[0];
  assert.match(preview, /aria-label="Preview Atelier Editorial"/);
  assert.match(preview, /aria-describedby="[^"]+-status [^"]+-illustration"/);
  assert.doesNotMatch(preview, /\s(?:disabled|aria-disabled)=/);
});

test('every package shows included concepts first, followed by the highest eligible layouts', () => {
  const expectedLayouts = [[0], [2, 0], [3, 2, 0], [4, 3, 2, 0], [7, 6, 4, 3, 2, 0], [8, 9, 8, 7, 6, 4, 3, 2, 0]];
  for (const [index, plan] of studioPlans.entries()) {
    const markup = render({ packageName: plan.name });
    const names = cardNames(markup);
    const references = names.map(name => studioTemplates.find(reference => reference.name === name));
    assert.deepEqual(references.map(reference => reference.layout), expectedLayouts[index], plan.name);
    assert.ok(references.every(reference => reference.category === 'Fashion'));
    assert.ok(references.every(reference => canUseThemeLayout(plan.name, reference.layout)), plan.name);
    assert.ok(markup.includes(`${plan.name} · ${references.length} included design`));
    assert.doesNotMatch(markup, /Unlock with|Review theme upgrade/);
  }
});

test('browse-all shows eight core designs plus category-specific signatures with canonical package prices', () => {
  const categories = [...new Set(studioTemplates.map(reference => reference.category))];
  for (const category of categories) {
    const markup = render({ browseAll: true, initialCategory: category });
    const articles = cards(markup);
    const references = cardNames(markup).map(name => studioTemplates.find(reference => reference.name === name));
    assert.equal(articles.length, ['Fashion', 'Food & drink', 'Beauty', 'Home', 'Technology'].includes(category) ? 9 : 8, category);
    assert.deepEqual(references.filter(reference => !reference.conceptImage && !reference.signatureTheme).map(reference => reference.layout), [0, 2, 3, 4, 6, 7, 8, 9], category);
    assert.ok(references.every(reference => reference.category === category));
    assert.ok(markup.includes(`${category.replaceAll('&', '&amp;')} · ${references.length} designs · All packages`));
    for (const [index, reference] of references.entries()) {
      const minimumPackage = shopifyPackageCatalog.find(plan => plan.name === getThemeMinimumPackage(reference.layout));
      assert.ok(minimumPackage, `${reference.name} must have a published minimum package`);
      assert.match(articles[index], /Minimum package/);
      assert.ok(articles[index].includes(`>${minimumPackage.name}</p>`), reference.name);
      assert.ok(articles[index].includes(`From $${minimumPackage.price.toLocaleString('en-US')}`), reference.name);
      assert.match(articles[index], /full package · USD/);
      assert.match(articles[index], />Preview design</);
      assert.doesNotMatch(articles[index], /\s(?:disabled|aria-disabled)=|Unlock with|Review theme upgrade/);
    }
    assert.match(markup, /Shopify subscriptions, paid themes, apps and third-party fees are separate/);
  }
});

test('browse-all allows premium previews without package selection and preserves industry when package changes', () => {
  let chosen = null;
  const gallery = galleryHarness({ browseAll: true, packageName: 'Unlisted package', onSelect: index => { chosen = index; } });
  assert.equal(cards(gallery.markup()).length, 9);
  assert.equal(chosen, null, 'browsing does not choose a design');
  gallery.industry('Beauty');
  gallery.update({ packageName: 'Beginner' });
  const names = cardNames(gallery.markup());
  assert.equal(names.length, 9);
  assert.ok(names.every(name => name.startsWith('Ritual ')));
  const premium = studioTemplates.find(reference => reference.category === 'Beauty' && reference.layout === 9);
  gallery.preview(premium.name);
  assert.equal(chosen, studioTemplates.indexOf(premium));
  assert.match(gallery.markup(), /<option value="Beauty" selected="">Beauty<\/option>/);
});

test('an unknown initial industry safely falls back to Fashion in either browsing mode', () => {
  for (const browseAll of [false, true]) {
    const markup = render({ browseAll, initialCategory: 'Unknown industry' });
    assert.match(markup, /<option value="Fashion" selected="">Fashion<\/option>/);
    assert.equal(cards(markup).length, browseAll ? 9 : 1);
  }
});

test('industry selection covers every business category and preserves original callback indices after sorting', () => {
  let chosen = null;
  const gallery = galleryHarness({ packageName: 'Top Tier', onSelect: index => { chosen = index; } });
  const categories = [...new Set(studioTemplates.map(reference => reference.category))];
  assert.deepEqual(categories, [...shopifyProductCategories, ...shopifyServiceCategories]);
  const seen = new Set();
  for (const category of categories) {
    gallery.industry(category);
    const names = cardNames(gallery.markup());
    assert.equal(names.length, ['Fashion', 'Food & drink', 'Beauty', 'Home', 'Technology'].includes(category) ? 9 : 8, category);
    for (const name of names) {
      const index = studioTemplates.findIndex(reference => reference.name === name);
      assert.equal(studioTemplates[index].category, category);
      gallery.preview(name);
      assert.equal(chosen, index, name);
      seen.add(name);
    }
  }
  assert.equal(seen.size, studioTemplates.length);
});

test('controlled category follows the business picker without a duplicate selector or a package reset', () => {
  let chosen = null;
  const gallery = galleryHarness({
    packageName: 'Executive', categoryFilter: 'Professional services',
    onSelect: index => { chosen = index; },
  });
  const professionalNames = cardNames(gallery.markup());
  assert.equal(professionalNames.length, 6);
  assert.doesNotMatch(gallery.markup(), /<select\b|Shop collection|Everyday favourites|Pairs beautifully with/);
  assert.ok(professionalNames.every(name => studioTemplates.find(t => t.name === name).category === 'Professional services'));
  gallery.update({ categoryFilter: 'Fitness services', packageName: 'Beginner' });
  const references = cardNames(gallery.markup()).map(name => studioTemplates.find(t => t.name === name));
  assert.equal(references.length, 1);
  assert.equal(references[0].category, 'Fitness services');
  assert.equal(references[0].layout, 0);
  gallery.preview(references[0].name);
  assert.equal(chosen, studioTemplates.indexOf(references[0]));
  gallery.update({ browseAll: true });
  assert.equal(cards(gallery.markup()).length, 8);
  assert.ok(cardNames(gallery.markup()).every(name => studioTemplates.find(t => t.name === name).category === 'Fitness services'));
  assert.doesNotMatch(gallery.markup(), /<select\b/);
});

test('controlled custom-category reference fallbacks have complete designs in either browsing mode', () => {
  for (const categoryFilter of ['General', 'Services']) {
    for (const browseAll of [false, true]) {
      const markup = render({ categoryFilter, browseAll });
      const references = cardNames(markup).map(name => studioTemplates.find(t => t.name === name));
      assert.equal(references.length, browseAll ? 8 : 1);
      assert.ok(references.every(reference => reference.category === categoryFilter));
      assert.doesNotMatch(markup, /<select\b/);
    }
  }
});

test('package changes reset the industry list and never retain locked premium cards', () => {
  const gallery = galleryHarness({ packageName: 'Top Tier' });
  gallery.industry('Beauty');
  assert.ok(cardNames(gallery.markup()).every(name => name.startsWith('Ritual ')));
  gallery.update({ packageName: 'Beginner' });
  const beginner = gallery.markup();
  assert.deepEqual(cardNames(beginner), ['Atelier Editorial']);
  assert.match(beginner, /<option value="Fashion" selected="">Fashion<\/option>/);
  assert.doesNotMatch(beginner, /studio-premium-thumbnail|Unlock with/);
  gallery.update({ packageName: 'Executive' });
  const executive = cardNames(gallery.markup());
  assert.equal(executive.length, 6);
  assert.equal(executive[0], 'Atelier Parallax');
  assert.ok(!executive.includes('Clotya Fashion'));
  assert.ok(!executive.some(name => /Cinematic|Commerce Studio/.test(name)));
});

test('unknown packages show no selectable designs rather than granting fallback access', () => {
  const markup = render({ packageName: 'Unlisted package' });
  assert.equal(cards(markup).length, 0);
  assert.equal((markup.match(/<button\b/g) || []).length, 0);
  assert.match(markup, /Unlisted package · 0 included designs/);
  assert.match(markup, /Choose a package to see its included designs/);
});

test('premium thumbnail storytelling remains visually distinct and noninteractive', () => {
  const markup = render({ packageName: 'Top Tier' });
  assert.equal((markup.match(/studio-premium-thumbnail-cinematic/g) || []).length, 1);
  assert.equal((markup.match(/studio-premium-thumbnail-commerce/g) || []).length, 1);
  for (const card of cards(markup)) {
    const name = card.match(/<h4\b[^>]*>([^<]+)<\/h4>/)[1];
    const reference = studioTemplates.find(item => item.name === name);
    if (reference.signatureTheme || (reference.layout !== 8 && reference.layout !== 9)) continue;
    const art = card.split('<div class="p-5 flex')[0];
    assert.match(art, /aria-hidden="true"/);
    assert.doesNotMatch(art, /<button\b|<input\b|<select\b/);
    assert.match(art, /studio-thumb-storyboard/);
    if (reference.layout === 8) {
      assert.match(art, /studio-thumb-cinematic-hotspot/);
      assert.match(art, /studio-thumb-cinematic-inset/);
      assert.match(art, /Interactive details/);
    } else {
      assert.match(art, /studio-thumb-commerce-sidebar/);
      assert.match(art, /studio-thumb-commerce-options/);
      assert.match(art, /studio-thumb-commerce-selection/);
      assert.match(art, /Choose a piece/);
    }
    for (const src of reference.images) assert.ok(art.includes(encodeURIComponent(src)), `${reference.id}: ${src}`);
  }
});

test('named premium concepts show their exact artwork and retain one real selection action', () => {
  for (const reference of studioTemplates.filter(item => item.conceptImage)) {
    for (const packageName of ['Beginner', 'Growth', 'Level Up', 'Pro', 'Executive']) {
      assert.ok(!cardNames(render({ packageName, categoryFilter: reference.category })).includes(reference.name), packageName);
    }
    for (const packageName of ['Top Tier']) {
      const markup = render({ packageName, categoryFilter: reference.category });
      const card = cards(markup).find(html => html.includes(`>${reference.name}</h4>`));
      assert.ok(card, `${packageName}: ${reference.name}`);
      assert.match(card, /data-thumbnail-layout="premium-concept"/);
      assert.ok(card.includes(reference.conceptImage.src) || card.includes(encodeURIComponent(reference.conceptImage.src)));
      assert.equal((card.match(/<button\b/g) || []).length, 1);
      assert.ok(card.includes(`aria-label="Preview ${reference.name}"`));
    }
    let selected = null;
    const gallery = galleryHarness({
      browseAll: true, categoryFilter: reference.category, onSelect: index => { selected = index; },
    });
    gallery.preview(reference.name);
    assert.equal(selected, studioTemplates.indexOf(reference));
    const allCard = cards(gallery.markup()).find(html => html.includes(`>${reference.name}</h4>`));
    assert.match(allCard, /From \$4,999/);
    assert.match(allCard, />Top Tier</);
  }
});

test('new premium category storefronts are visible at $4,999 and never appear in an Executive package', () => {
  for (const id of ['ritual-beauty-premium', 'forme-living-premium', 'pulse-audio-premium']) {
    const reference = studioTemplates.find(item => item.id === id);
    assert.ok(reference);
    for (const packageName of ['Beginner', 'Growth', 'Level Up', 'Pro', 'Executive']) {
      assert.ok(!cardNames(render({ packageName, categoryFilter: reference.category })).includes(reference.name), `${packageName}: ${id}`);
    }
    const names = cardNames(render({ packageName: 'Top Tier', categoryFilter: reference.category }));
    assert.equal(names[0], reference.name, 'An included signature reference leads the category');
    for (const browseAll of [false, true]) {
      let selected = null;
      const gallery = galleryHarness({ packageName: 'Top Tier', browseAll, categoryFilter: reference.category, onSelect: index => { selected = index; } });
      const card = cards(gallery.markup()).find(html => html.includes(`>${reference.name}</h4>`));
      assert.ok(card, id);
      assert.equal((card.match(/<button\b/g) || []).length, 1);
      assert.match(card, />Preview design</);
      if (browseAll) {
        assert.match(card, /From \$4,999/);
        assert.match(card, />Top Tier</);
      }
      gallery.preview(reference.name);
      assert.equal(selected, studioTemplates.indexOf(reference));
    }
  }
});

test('full concept preview preserves the complete artwork with a static reference disclosure', () => {
  for (const reference of studioTemplates.filter(item => item.conceptImage)) {
    const markup = renderToStaticMarkup(React.createElement(ConceptReference, { conceptImage: reference.conceptImage }));
    assert.ok(markup.includes(reference.conceptImage.src) || markup.includes(encodeURIComponent(reference.conceptImage.src)));
    assert.match(markup, /width="793"/);
    assert.match(markup, /height="1983"/);
    assert.match(markup, /h-auto w-full/);
    assert.match(markup, /illustrative design reference, not a live store/);
    assert.doesNotMatch(markup, /<button\b|<input\b|<select\b|object-cover/);
  }
});

test('preview Previous and Next follow visible gallery order and wrap within the eligible category', () => {
  for (const category of ['Fashion', 'Food & drink', 'Beauty', 'Home', 'Technology', 'Professional services']) {
    for (const packageName of ['Beginner', 'Executive', 'Top Tier']) {
      for (const browseAll of [false, true]) {
        const names = cardNames(render({ packageName, browseAll, categoryFilter: category }));
        const indices = names.map(name => studioTemplates.findIndex(reference => reference.name === name));
        for (const [position, currentIndex] of indices.entries()) {
          const forward = getAdjacentShopifyReferenceIndex(category, packageName, browseAll, currentIndex, 1);
          const backward = getAdjacentShopifyReferenceIndex(category, packageName, browseAll, currentIndex, -1);
          assert.equal(forward, indices[(position + 1) % indices.length], `${category}/${packageName}/${browseAll}: next from ${names[position]}`);
          assert.equal(backward, indices[(position - 1 + indices.length) % indices.length], `${category}/${packageName}/${browseAll}: previous from ${names[position]}`);
          if (!browseAll) {
            assert.equal(canUseThemeLayout(packageName, studioTemplates[forward].layout), true);
            assert.equal(canUseThemeLayout(packageName, studioTemplates[backward].layout), true);
          }
        }
      }
    }
  }
});

test('preview navigation safely handles a missing reference or an empty eligible category', () => {
  const names = cardNames(render({ packageName: 'Executive', categoryFilter: 'Fashion' }));
  const indices = names.map(name => studioTemplates.findIndex(reference => reference.name === name));
  assert.equal(getAdjacentShopifyReferenceIndex('Fashion', 'Executive', false, -1, 1), indices[0]);
  assert.equal(getAdjacentShopifyReferenceIndex('Fashion', 'Executive', false, -1, -1), indices.at(-1));
  assert.equal(getAdjacentShopifyReferenceIndex('Unknown category', 'Executive', false, 0, 1), null);
  assert.equal(getAdjacentShopifyReferenceIndex('Fashion', 'Unknown package', false, 0, -1), null);
});

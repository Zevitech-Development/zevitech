// Render and interaction contracts for the two new premium references.
// The hook harness runs local event/effect behavior; it is not a browser layout test.
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const postcss = require('postcss');
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
const componentPath = path.join(root, 'src/elements/business/shopify/shopify-premium-preview.tsx');
const PremiumPreview = require(componentPath).default;
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { shopifyPremiumPreviewCopy: copy } = require('../src/content/landing/shopify-premium-preview-content.ts');
const newReferences = studioTemplates.filter(item => !item.signatureTheme && (item.layout === 8 || item.layout === 9));
function propsFor(reference) {
  return { layout: reference.layout, headline: reference.headline, brief: reference.brief, productName: reference.product, images: reference.images, products: reference.images.map((src, index) => ({ id: 10 + index, src, name: index === 0 ? reference.product : `Sample piece ${index + 1}`, collection: ['The signature edit', 'Everyday pieces', 'The considered collection'][index], priceLabel: `$${100 + index * 10}` })), onBrowse() {}, onProduct() {} };
}
function nodes(element, predicate) {
  const found = [];
  function visit(node) {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!React.isValidElement(node)) return;
    if (predicate(node)) found.push(node);
    visit(node.props.children);
  }
  visit(element);
  return found;
}
function hasClass(name) { return node => (node.props.className || '').split(/\s+/).includes(name); }
function textOf(node) {
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) return textOf(node.props.children);
  return node == null || typeof node === 'boolean' ? '' : String(node);
}

// Minimal injected hooks let tests activate the real callbacks and preference
// effects without installing a renderer, launching a browser or fetching images.
function harness(initialProps, { reduced = false, storedReduction = false, storageBlocked = false } = {}) {
  const savedGlobals = Object.fromEntries(['window', 'document', 'sessionStorage', 'requestAnimationFrame'].map(key => [key, Object.getOwnPropertyDescriptor(global, key)]));
  const body = {};
  const listeners = new Set();
  const preference = { matches: reduced, addEventListener(_type, callback) { listeners.add(callback); }, removeEventListener(_type, callback) { listeners.delete(callback); } };
  const storage = new Map([['zevitech-studio-reduce-motion', String(storedReduction)]]);
  global.window = { matchMedia(query) { return query.includes('prefers-reduced-motion') ? preference : { matches: true }; } };
  global.document = { body };
  global.sessionStorage = { getItem(key) { if (storageBlocked) throw new Error('Storage unavailable'); return storage.get(key) ?? null; }, setItem(key, value) { if (storageBlocked) throw new Error('Storage unavailable'); storage.set(key, value); } };
  global.requestAnimationFrame = callback => callback();
  const states = [], refs = [], effects = [], motionValues = [];
  let stateCursor, refCursor, effectCursor, motionCursor, dirty = false, closed = false, tree, props = initialProps;
  const pendingEffects = [];
  const calls = { scrollSubscriptions: 0, scrollCleanups: 0, focused: [], scrolled: [] };
  function motionValue(initial) {
    const index = motionCursor++;
    if (!motionValues[index]) motionValues[index] = { value: initial, set(value) { this.value = value; }, jump(value) { this.value = value; }, get() { return this.value; } };
    return motionValues[index];
  }
  const hooks = {
    ...React,
    useId: () => 'premium-test',
    useState(initial) {
      const index = stateCursor++;
      if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
      return [states[index], next => { const value = typeof next === 'function' ? next(states[index]) : next; if (!Object.is(states[index], value)) { states[index] = value; dirty = true; } }];
    },
    useRef(initial) { const index = refCursor++; return refs[index] || (refs[index] = { current: initial }); },
    useEffect(callback, deps) {
      const index = effectCursor++;
      if (!effects[index] || deps.some((value, at) => !Object.is(value, effects[index].deps[at]))) pendingEffects.push({ index, callback, deps });
    },
  };
  const instance = new Module(componentPath, module);
  instance.filename = componentPath;
  instance.paths = Module._nodeModulePaths(path.dirname(componentPath));
  instance.require = function (request) {
    if (request === 'react') return hooks;
    if (request === 'framer-motion') return {
      motion: { section: 'section', div: 'div' },
      useMotionValue: motionValue, useSpring: motionValue, useTransform: () => motionValue(0),
      scroll() { calls.scrollSubscriptions++; return () => { calls.scrollCleanups++; }; },
    };
    return Module.prototype.require.call(this, request);
  };
  require.extensions['.tsx'](instance, componentPath);
  function render(nextProps = props) {
    props = nextProps;
    let iterations = 0;
    do {
      assert.ok(iterations++ < 10, 'Effects should settle');
      dirty = false;
      stateCursor = refCursor = effectCursor = motionCursor = 0;
      tree = instance.exports.default(props);
      for (const node of nodes(tree, item => item.ref && typeof item.ref === 'object')) {
        if (!node.ref.current) node.ref.current = { parentElement: body, focus(options) { calls.focused.push({ id: node.props.id, options }); }, scrollIntoView(options) { calls.scrolled.push({ id: node.props.id, options }); } };
      }
      for (const effect of pendingEffects.splice(0)) {
        effects[effect.index]?.cleanup?.();
        effects[effect.index] = { deps: effect.deps, cleanup: effect.callback() };
      }
    } while (dirty);
    return tree;
  }
  return {
    calls, listeners, storage, render,
    click(node) { node.props.onClick(); return render(); },
    changeSystemReduction(value) { preference.matches = value; for (const listener of listeners) listener(); return render(); },
    close() {
      if (closed) return;
      closed = true;
      for (const effect of effects) effect?.cleanup?.();
      for (const [key, descriptor] of Object.entries(savedGlobals)) descriptor ? Object.defineProperty(global, key, descriptor) : delete global[key];
    },
  };
}

test('both new layouts render every category identity with three distinct local photographs', () => {
  const categories = new Set(studioTemplates.map(item => item.category));
  assert.equal(newReferences.length, categories.size * 2);
  for (const layout of [8, 9]) assert.equal(new Set(newReferences.filter(item => item.layout === layout).map(item => item.category)).size, categories.size);
  for (const reference of newReferences) {
    assert.equal(reference.images.length, 3, reference.id);
    const hashes = reference.images.map(src => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'public', src))).digest('hex'));
    assert.equal(new Set(hashes).size, 3, `${reference.id} repeats an image file`);
    const html = renderToStaticMarkup(React.createElement(PremiumPreview, propsFor(reference)));
    const escaped = value => value.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');
    assert.ok(html.includes(escaped(reference.headline)), reference.id);
    assert.ok(html.includes(escaped(reference.product)), reference.id);
    for (const src of reference.images) assert.ok(html.includes(`src="${src}"`), `${reference.id}: ${src}`);
    assert.doesNotMatch(html, /<canvas|WebGL|photorealistic|5-star|verified reviews/i);
  }
});

test('server rendering starts static and presents native, labeled, focusable selection buttons', () => {
  for (const reference of newReferences.slice(-2)) {
    const html = renderToStaticMarkup(React.createElement(PremiumPreview, propsFor(reference)));
    assert.match(html, /data-motion="reduced"/);
    assert.match(html, /--premium-near-y:0px/);
    assert.match(html, /--premium-tilt-x:0deg/);
    assert.match(html, /aria-pressed="true" disabled=""[^>]*>/);
    assert.match(html, /aria-live="polite"/);
    assert.doesNotMatch(html, /role="tab"|tabindex="[1-9]/);
    const selectionButtons = [...html.matchAll(/<button\b[^>]*aria-controls="([^"]+)"[^>]*>/g)];
    assert.ok(selectionButtons.length >= 2);
    for (const [button, controlId] of selectionButtons) {
      assert.match(button, /type="button"/);
      assert.match(button, /focus-visible:ring-2/);
      assert.doesNotMatch(button, /disabled|tabindex="-1"/);
      assert.ok(html.includes(`id="${controlId}"`));
    }
  }
});

test('Cinematic selection opens and adds the chosen catalog product, and collections retain their identity', t => {
  const props = propsFor(newReferences.find(item => item.layout === 8));
  const productClicks = [], additions = [], browseClicks = [];
  let bagClicks = 0;
  const view = harness({ ...props, onProduct: id => productClicks.push(id), onBrowse: collection => browseClicks.push(collection), onAddToBag: id => additions.push(id), onViewBag: () => bagClicks++ }, { reduced: true });
  t.after(() => view.close());
  let tree = view.render();
  const heroSource = () => nodes(nodes(tree, hasClass('studio-premium-cinema-backdrop'))[0], item => item.props.src)[0].props.src;
  const originalHero = heroSource();
  tree = view.click(nodes(tree, hasClass('studio-premium-cinema-pick'))[1]);
  let selected = nodes(tree, hasClass('studio-premium-cinema-product'))[0];
  assert.equal(nodes(selected, node => node.props.src)[0].props.src, props.products[1].src);
  assert.ok(textOf(selected).includes(props.products[1].name));
  assert.equal(heroSource(), originalHero);
  assert.deepEqual(nodes(tree, hasClass('studio-premium-cinema-pick')).map(node => node.props['aria-pressed']), [false, true, false]);
  view.click(nodes(selected, node => node.type === 'button' && textOf(node) === copy.merchandising.viewProduct)[0]);
  tree = view.click(nodes(selected, node => node.type === 'button' && textOf(node) === copy.merchandising.addToBag)[0]);
  selected = nodes(tree, hasClass('studio-premium-cinema-product'))[0];
  assert.ok(textOf(selected).includes(copy.merchandising.addedShort));
  assert.ok(textOf(nodes(tree, node => node.props.role === 'status')[0]).includes(props.products[1].name));
  view.click(nodes(tree, node => node.type === 'button' && textOf(node) === copy.merchandising.viewBag)[0]);
  view.click(nodes(tree, hasClass('studio-premium-collection-tile'))[2]);
  assert.deepEqual(productClicks, [11]);
  assert.deepEqual(additions, [11]);
  assert.deepEqual(browseClicks, [props.products[2].collection]);
  assert.equal(bagClicks, 1);
});

test('Commerce Studio selects actual catalog pieces, exposes the selected product action, and resets safely for shorter catalogs', t => {
  const props = propsFor(newReferences.find(item => item.layout === 9));
  const productClicks = [];
  const view = harness({ ...props, onProduct: id => productClicks.push(id) });
  t.after(() => view.close());
  let tree = view.render();
  const choices = () => nodes(nodes(tree, hasClass('studio-premium-commerce-choices'))[0], node => node.type === 'button');
  tree = view.click(choices()[2]);
  assert.deepEqual(choices().map(node => node.props['aria-pressed']), [false, false, true]);
  const image = nodes(tree, hasClass('studio-premium-commerce-main-image'))[0];
  assert.equal(nodes(image, node => node.props.src)[0].props.src, props.products[2].src);
  assert.equal(textOf(nodes(tree, node => node.type === 'h4' && node.props['aria-live'] === 'polite')[0]), props.products[2].name);
  view.click(image);
  assert.deepEqual(productClicks, [12]);
  tree = view.render({ ...props, images: [props.images[0]], products: [props.products[0]] });
  assert.equal(choices().length, 1);
  assert.equal(choices()[0].props['aria-pressed'], true);
  assert.equal(nodes(nodes(tree, hasClass('studio-premium-commerce-main-image'))[0], node => node.props.src)[0].props.src, props.products[0].src);
});

test('Commerce Studio discovery filters and searches real products and restores the full catalog from empty results', t => {
  const props = propsFor(newReferences.find(item => item.layout === 9));
  const additions = [];
  const view = harness({ ...props, onAddToBag: id => additions.push(id) });
  t.after(() => view.close());
  let tree = view.render();
  const discovery = () => nodes(tree, hasClass('studio-premium-discovery'))[0];
  const cards = () => nodes(discovery(), hasClass('studio-premium-product-card'));
  assert.equal(cards().length, 3);
  const filter = nodes(nodes(discovery(), hasClass('studio-premium-discovery-controls'))[0], node => node.type === 'button' && textOf(node) === props.products[2].collection)[0];
  tree = view.click(filter);
  assert.equal(cards().length, 1);
  assert.ok(textOf(cards()[0]).includes(props.products[2].name));
  tree = view.click(nodes(cards()[0], hasClass('studio-premium-card-add'))[0]);
  assert.deepEqual(additions, [12]);
  assert.ok(textOf(cards()[0]).includes(copy.merchandising.addedShort));
  const input = nodes(discovery(), node => node.type === 'input' && node.props.type === 'search')[0];
  input.props.onChange({ target: { value: 'does-not-exist' } });
  tree = view.render();
  assert.equal(cards().length, 0);
  assert.ok(textOf(discovery()).includes(copy.merchandising.empty));
  tree = view.click(nodes(discovery(), node => node.type === 'button' && textOf(node) === copy.merchandising.reset)[0]);
  assert.equal(cards().length, 3);
  assert.equal(nodes(discovery(), node => node.type === 'input')[0].props.value, '');
});

test('Executive photographic planes and product grids open their own catalog entries', t => {
  for (const layout of [6, 7]) {
    const props = { ...propsFor(newReferences.find(item => item.layout === 8)), layout };
    const opened = [], added = [];
    const view = harness({ ...props, onProduct: id => opened.push(id), onAddToBag: id => added.push(id) }, { reduced: true });
    try {
      const tree = view.render();
      const planes = nodes(tree, hasClass('studio-premium-executive-photo'));
      assert.equal(planes.length, layout === 6 ? 3 : 2);
      view.click(planes[1]);
      view.click(nodes(tree, hasClass('studio-premium-product-photo'))[2]);
      view.click(nodes(tree, hasClass('studio-premium-card-add'))[1]);
      assert.deepEqual(opened, [11, 12]);
      assert.deepEqual(added, [11]);
      assert.equal(nodes(tree, hasClass('studio-premium-discovery-controls')).length, 0);
    } finally { view.close(); }
  }
});

test('live OS reduction and local toggling stop scroll motion, preserve control state and clean up listeners', t => {
  const view = harness(propsFor(newReferences.find(item => item.layout === 8)));
  t.after(() => view.close());
  let tree = view.render();
  assert.equal(tree.props['data-motion'], 'enabled');
  assert.equal(view.calls.scrollSubscriptions, 1);
  assert.equal(view.listeners.size, 1);
  tree = view.changeSystemReduction(true);
  assert.equal(tree.props['data-motion'], 'reduced');
  assert.equal(tree.props.style['--premium-tilt-y'], '0deg');
  assert.equal(view.calls.scrollCleanups, 1);
  let toggle = nodes(tree, node => node.type === 'button' && textOf(node).includes(copy.reduceMotion))[0];
  assert.equal(toggle.props.disabled, true);
  tree = view.changeSystemReduction(false);
  assert.equal(tree.props['data-motion'], 'enabled');
  toggle = nodes(tree, node => node.type === 'button' && textOf(node).includes(copy.reduceMotion))[0];
  tree = view.click(toggle);
  assert.equal(tree.props['data-motion'], 'reduced');
  assert.equal(view.storage.get('zevitech-studio-reduce-motion'), 'true');
  assert.equal(view.calls.scrollCleanups, 2);
  toggle = nodes(tree, node => node.type === 'button' && textOf(node).includes(copy.reduceMotion))[0];
  view.click(toggle);
  assert.equal(view.calls.scrollSubscriptions, 3);
  view.close();
  assert.equal(view.calls.scrollCleanups, 3);
  assert.equal(view.listeners.size, 0);
});

test('a saved reduced-motion preference and blocked storage both remain usable', () => {
  for (const options of [{ storedReduction: true }, { storageBlocked: true }]) {
    const view = harness(propsFor(newReferences.find(item => item.layout === 9)), options);
    try {
      let tree = view.render();
      assert.equal(tree.props['data-motion'], options.storedReduction ? 'reduced' : 'enabled');
      const toggle = nodes(tree, node => node.type === 'button' && textOf(node).includes(copy.reduceMotion))[0];
      tree = view.click(toggle);
      assert.equal(tree.props['data-motion'], options.storedReduction ? 'enabled' : 'reduced');
    } finally { view.close(); }
  }
});

test('empty and duplicate uploads produce valid images without phantom selectable views', () => {
  for (const layout of [8, 9]) {
    const props = propsFor(newReferences.find(item => item.layout === layout));
    for (const images of [[], ['', props.images[0], props.images[0]]]) {
      const html = renderToStaticMarkup(React.createElement(PremiumPreview, { ...props, images, products: undefined }));
      assert.doesNotMatch(html, /src="(?:undefined|)"/);
      assert.ok(html.includes(`src="${images.length ? props.images[0] : '/store-studio/sample-1.svg'}"`));
      if (layout === 9) assert.equal((html.match(/aria-pressed="true" aria-controls=/g) || []).length, 2);
    }
  }
});

test('responsive rules use the preview container and preserve explicit motion-reduction overrides', () => {
  const stylesheet = postcss.parse(fs.readFileSync(path.join(root, 'src/styles/globals.css'), 'utf8'));
  function declarations(selector, context = null) {
    const values = {};
    stylesheet.walkRules(rule => {
      if (!rule.selectors.includes(selector)) return;
      const parent = rule.parent.type === 'atrule' ? `${rule.parent.name} ${rule.parent.params}` : null;
      if (parent !== context) return;
      rule.walkDecls(declaration => { values[declaration.prop] = declaration.value; });
    });
    return values;
  }
  assert.equal(declarations('.studio-premium-commerce-feature')['grid-template-columns'], 'minmax(0, 1fr)');
  assert.equal(declarations('.studio-premium-executive-hero')['grid-template-columns'], 'minmax(0, 1fr)');
  for (const selector of ['.studio-premium-commerce-feature', '.studio-premium-executive-depth']) assert.ok(declarations(selector, 'container studio (min-width: 760px)')['grid-template-columns']);
  assert.equal(declarations('.studio-premium-product-grid')['grid-template-columns'], 'repeat(2, minmax(0, 1fr))');
  assert.equal(declarations('.studio-premium-product-grid', 'container studio (min-width: 580px)')['grid-template-columns'], 'repeat(3, minmax(0, 1fr))');
  assert.equal(declarations('.studio-premium-collection-grid')['grid-template-columns'], 'minmax(0, 1fr)');
  assert.equal(declarations('.studio-premium-collection-grid', 'container studio (min-width: 580px)')['grid-template-columns'], 'repeat(3, minmax(0, 1fr))');
  assert.equal(declarations('.studio-premium-cinema-pick')['min-height'], '2.75rem');
  assert.equal(declarations('.studio-premium-storefront[data-motion="reduced"] .studio-premium-commerce-main-image').transform, 'none');
  assert.equal(declarations('.studio-premium-cinema-backdrop', 'media (prefers-reduced-motion: reduce)').transform, 'none');
});

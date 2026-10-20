// Run the studio's real transition callbacks with controlled hooks and real field
// schemas. No DOM renderer, added dependencies, network or checkout requests.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
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
let currentForm;
const originalLoad = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'react-hook-form') {
    return {
      ...originalLoad.call(this, request, ...rest),
      useForm: options => currentForm(options),
    };
  }
  return originalLoad.call(this, request, ...rest);
};

const Studio = require('../src/elements/business/shopify/shopify-store-studio.tsx').default;
const Gallery = require('../src/elements/business/shopify/shopify-template-gallery.tsx').default;
const Needs = require('../src/elements/business/shopify/shopify-package-needs.tsx').default;
const Picker = require('../src/elements/business/shopify/shopify-package-picker.tsx').default;
const Checkout = require('../src/elements/business/shopify/shopify-package-checkout.tsx').default;
const DraftControls = require('../src/elements/business/shopify/shopify-design-draft-controls.tsx').default;
const ThemeUpgrade = require('../src/elements/business/shopify/shopify-theme-upgrade.tsx').default;
const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const NextTier = require('../src/elements/business/shopify/shopify-package-next-tier.tsx').default;
const BusinessCategoryPicker = require('../src/elements/business/shopify/shopify-business-category-picker.tsx').default;
const { Dialog } = require('../src/components/ui/dialog.tsx');
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { shopifyWizardCopy: wizard } = require('../src/content/landing/shopify-wizard-content.ts');
const { ShopifyStudioSchema } = require('../src/schemas/shopify-studio-schema.ts');
const { SHOPIFY_CUSTOM_CATEGORY, shopifyBusinessCategoryCopy } = require('../src/content/landing/shopify-business-categories.ts');
Module._load = originalLoad;

function nodes(value, showClosedDialogs = false) {
  if (Array.isArray(value)) return value.flatMap(child => nodes(child, showClosedDialogs));
  if (!React.isValidElement(value)) return [];
  if (!showClosedDialogs && value.type === Dialog && !value.props.open) return [];
  return [value, ...nodes(value.props.children, showClosedDialogs)];
}
function text(value) {
  if (Array.isArray(value)) return value.map(text).join('');
  if (React.isValidElement(value)) return text(value.props.children);
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}
const tick = () => new Promise(resolve => setImmediate(resolve));

function harness() {
  const hooks = [];
  let formValues;
  const dirty = new Set();
  const errors = {};
  const stored = new Map();
  const form = options => {
    formValues ??= { ...options.defaultValues };
    return {
      register: (name, config = {}) => ({
        name,
        onChange: event => {
          formValues[name] = event.target.value;
          dirty.add(name);
          config.onChange?.(event);
        },
      }),
      watch: () => ({ ...formValues }),
      getValues: () => ({ ...formValues }),
      setValue: (name, value, config = {}) => {
        formValues[name] = value;
        if (config.shouldDirty) dirty.add(name);
      },
      resetField: (name, { defaultValue }) => {
        formValues[name] = defaultValue;
        dirty.delete(name);
      },
      getFieldState: name => ({ isDirty: dirty.has(name), invalid: Boolean(errors[name]) }),
      formState: { errors },
      clearErrors: names => names.forEach(name => delete errors[name]),
      setError: (name, value) => { errors[name] = value; },
      trigger: async names => {
        let valid = true;
        for (const name of names) {
          const result = ShopifyStudioSchema.shape[name].safeParse(formValues[name]);
          if (result.success) delete errors[name];
          else {
            valid = false;
            errors[name] = { message: result.error.issues[0].message };
          }
        }
        return valid;
      },
    };
  };
  function environment(action) {
    const old = {
      requestAnimationFrame: global.requestAnimationFrame,
      document: global.document,
      HTMLElement: global.HTMLElement,
      localStorage: global.localStorage,
    };
    global.requestAnimationFrame = () => 0;
    global.HTMLElement = class {};
    global.document = { activeElement: null, body: {}, getElementById: () => null };
    global.localStorage = { setItem: (key, value) => stored.set(key, value), getItem: key => stored.get(key) ?? null };
    try { return action(); }
    finally { Object.assign(global, old); }
  }
  function tree() {
    let cursor = 0;
    const old = { useState: React.useState, useRef: React.useRef, useEffect: React.useEffect };
    React.useState = initial => {
      const index = cursor++;
      if (!(index in hooks)) hooks[index] = typeof initial === 'function' ? initial() : initial;
      return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }];
    };
    React.useRef = initial => {
      const index = cursor++;
      if (!(index in hooks)) hooks[index] = { current: initial };
      return hooks[index];
    };
    React.useEffect = () => {};
    currentForm = form;
    try { return Studio({ copy: studioCopy, plans: studioPlans }); }
    finally { Object.assign(React, old); }
  }
  const all = () => nodes(tree());
  const component = type => all().find(node => node.type === type);
  const button = label => all().find(node => typeof node.props.onClick === 'function'
    && (text(node) === label || text(node).startsWith(`${label} · $`)));
  const act = async action => {
    // Keep browser stubs alive across asynchronous validation continuations.
    const old = { requestAnimationFrame: global.requestAnimationFrame, document: global.document, HTMLElement: global.HTMLElement, localStorage: global.localStorage };
    global.requestAnimationFrame = () => 0;
    global.HTMLElement = class {};
    global.document = { activeElement: null, body: {}, getElementById: () => null };
    global.localStorage = { setItem: (key, value) => stored.set(key, value), getItem: key => stored.get(key) ?? null };
    try { await action(); await tick(); }
    finally { Object.assign(global, old); }
  };
  return {
    all, component, button, act,
    content: () => text(tree()),
    stage: () => {
      const nav = all().find(node => node.type === 'nav');
      return nodes(nav).find(node => node.props['aria-current'] === 'step')?.key;
    },
    click: async label => {
      const target = button(label);
      assert.ok(target, `Missing action: ${label}`);
      assert.ok(!target.props.disabled, `Disabled action: ${label}`);
      await act(() => target.props.onClick());
    },
    navigate: async label => {
      const nav = all().find(node => node.type === 'nav');
      const target = nodes(nav).find(node => node.key === label);
      assert.ok(target, `Missing step: ${label}`);
      assert.ok(!target.props.disabled, `Disabled step: ${label}`);
      await act(() => target.props.onClick());
    },
    submit: async () => {
      const target = all().find(node => node.type === 'form');
      assert.ok(target, 'Expected the stage form');
      await act(() => target.props.onSubmit({ preventDefault() {} }));
    },
    setField: (name, value) => { tree(); formValues[name] = value; dirty.add(name); },
    changeBusiness: async (businessType, category, customCategory = '') => {
      const picker = component(BusinessCategoryPicker);
      assert.ok(picker, 'Expected the business category picker');
      await act(() => picker.props.onChange(businessType, category, customCategory));
    },
    chooseReference: async layout => {
      const gallery = component(Gallery);
      assert.ok(gallery, 'Expected the reference gallery');
      const category = gallery.props.categoryFilter ?? 'Fashion';
      const index = studioTemplates.findIndex(item => item.category === category && item.layout === layout);
      assert.ok(index >= 0, `Missing reference layout ${layout} in ${category}`);
      await act(() => gallery.props.onSelect(index));
      const select = button(wizard.previewAction);
      assert.ok(select);
      await act(() => select.props.onClick());
      return studioTemplates[index];
    },
    previewReference: async layout => {
      const gallery = component(Gallery);
      assert.ok(gallery, 'Expected the reference gallery');
      const category = gallery.props.categoryFilter ?? 'Fashion';
      const index = studioTemplates.findIndex(item => item.category === category && item.layout === layout);
      assert.ok(index >= 0, `Missing reference layout ${layout} in ${category}`);
      await act(() => gallery.props.onSelect(index));
    },
    closePreview: async () => {
      const dialog = component(Dialog);
      assert.ok(dialog?.props.open, 'Expected the open reference preview');
      await act(() => dialog.props.onOpenChange(false));
    },
    changeNeeds: async (count, features) => {
      const needs = component(Needs);
      assert.ok(needs);
      assert.equal(needs.props.discovery, true);
      await act(() => needs.props.onChange(count, features));
    },
    addNeed: async id => {
      const needs = component(Needs);
      assert.ok(needs);
      const originalId = React.useId;
      let controls;
      React.useId = () => 'journey-needs';
      try { controls = Needs(needs.props); }
      finally { React.useId = originalId; }
      const choice = nodes(controls).find(node => node.type === 'input' && node.props.value === id);
      assert.ok(choice, `Missing feature: ${id}`);
      assert.equal(choice.props.checked, false, `${id} should be outside the selected package`);
      assert.ok(!choice.props.disabled, `${id} should be available as an upgrade`);
      await act(() => choice.props.onChange({ target: { checked: true } }));
    },
    selectPackage: async index => {
      const picker = component(Picker);
      assert.ok(picker);
      await act(() => picker.props.onSelect(index));
    },
    saved: () => {
      const draft = component(DraftControls);
      assert.ok(draft);
      environment(() => draft.props.onSave());
      return JSON.parse([...stored.values()][0]);
    },
  };
}

test('premium design selection opens needs without confirming its package or showing an upgrade', async () => {
  const h = harness();
  assert.equal(h.stage(), 'Design');
  assert.equal(h.component(Gallery).props.browseAll, true);
  assert.equal(h.component(Picker), undefined);
  const reference = await h.chooseReference(8);
  assert.equal(h.stage(), 'Store needs');
  assert.equal(h.component(Needs).props.discovery, true);
  assert.ok(h.component(Needs).props.featureIds.includes('theme-top-tier'));
  assert.equal(h.component(ThemeUpgrade).props.pending, null);
  assert.equal(h.component(Checkout), undefined);
  assert.equal(h.saved().packageName, null);
  assert.equal(h.saved().templateId, reference.id);
  await h.submit();
  assert.equal(h.stage(), 'Package');
  assert.equal(h.component(Picker).props.confirmed, false);
  assert.ok(h.content().includes('Top Tier'));
});

test('recommendation combines reference, product setup and features before explicit package confirmation', async () => {
  const h = harness();
  const reference = await h.chooseReference(0);
  await h.changeNeeds('50', ['currencies', 'reviews']);
  await h.submit();
  assert.equal(h.stage(), 'Package');
  const headings = h.all().filter(node => node.type === 'h4').map(text);
  assert.ok(headings.includes('Executive'));
  assert.equal(h.component(Picker).props.confirmed, false);
  await h.click(wizard.confirmPackage);
  assert.equal(h.stage(), 'Your brand');
  assert.equal(h.saved().packageName, 'Executive');
  await h.submit();
  assert.equal(h.stage(), 'Checkout');
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.package.name, 'Executive');
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.needs.productCount, '50');
  assert.deepEqual(brief.needs.featureIds, ['currencies', 'reviews']);
  assert.equal(brief.needs.scopeConfirmed, true);
});

test('an incompatible downgrade is rejected without discarding premium reference, features or brand choices', async () => {
  const h = harness();
  const reference = await h.chooseReference(8);
  await h.changeNeeds('250', ['reviews', 'custom-code']);
  await h.submit();
  await h.click(wizard.confirmPackage);
  h.setField('brand', 'Retained brand');
  h.setField('headline', 'Retained headline');
  await h.click(wizard.compare);
  await h.selectPackage(0);
  assert.equal(h.component(Picker).props.selected, 5);
  assert.equal(h.component(Picker).props.confirmed, true);
  assert.ok(h.content().includes(wizard.lowerPackage));
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.package.name, 'Top Tier');
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.needs.productCount, '250');
  assert.ok(brief.needs.featureIds.includes('custom-code'));
  assert.ok(brief.needs.featureIds.includes('theme-top-tier'));
  assert.equal(brief.business.brand, 'Retained brand');
  assert.equal(brief.business.headline, 'Retained headline');
});

test('package-first entry keeps its included gallery and can explore premium designs without an automatic upgrade', async () => {
  const h = harness();
  await h.click(wizard.compare);
  await h.selectPackage(1);
  await h.click(wizard.packageContinue);
  assert.equal(h.component(Gallery).props.packageName, 'Growth');
  assert.equal(h.component(Gallery).props.browseAll, false);
  await h.click(wizard.allDesigns);
  assert.equal(h.component(Gallery).props.browseAll, true);
  await h.chooseReference(8);
  assert.equal(h.component(ThemeUpgrade).props.pending, null);
  assert.equal(h.saved().packageName, null);
  await h.submit();
  assert.equal(h.component(Picker).props.confirmed, false);
  await h.click(wizard.confirmPackage);
  assert.equal(h.saved().packageName, 'Top Tier');
});

test('choosing an excluded review feature upgrades selected Growth to Pro and retains reference and product setup', async () => {
  const h = harness();
  const reference = await h.chooseReference(2);
  await h.changeNeeds('50', []);
  await h.submit();
  await h.click(wizard.confirmPackage);
  assert.equal(h.saved().packageName, 'Growth');
  await h.navigate('Store needs');
  assert.equal(h.component(Needs).props.packageSelected, true);
  await h.addNeed('reviews');
  const updated = h.component(Needs).props;
  assert.equal(updated.packageIndex, 3);
  assert.equal(updated.packageSelected, true);
  assert.equal(updated.productCount, '50');
  assert.deepEqual(updated.featureIds, ['reviews', 'theme-growth']);
  assert.equal(updated.pending, null);
  assert.equal(h.saved().packageName, 'Pro');
  assert.deepEqual(h.saved().featureIds, ['reviews']);
  assert.equal(h.saved().templateId, reference.id);
  await h.submit();
  assert.equal(h.component(Picker).props.confirmed, true);
  assert.equal(h.component(Picker).props.selected, 3);
  assert.ok(h.all().filter(node => node.type === 'h4').map(text).includes('Pro'));
  assert.match(text(h.button(wizard.confirmPackage)), /\$1,499/);
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.package.name, 'Pro');
  assert.equal(brief.package.price, 1499);
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.needs.designLayout, 2);
  assert.equal(brief.needs.productCount, '50');
  assert.deepEqual(brief.needs.featureIds, ['reviews', 'theme-growth']);
  assert.equal(brief.needs.scopeConfirmed, true);
});

test('increased product setup participates in an immediate package upgrade alongside explicit features', async () => {
  const h = harness();
  const reference = await h.chooseReference(2);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.navigate('Store needs');
  await h.changeNeeds('250', ['reviews', 'theme-growth']);
  assert.equal(h.component(Needs).props.packageIndex, 4);
  assert.equal(h.component(Needs).props.packageSelected, true);
  assert.equal(h.saved().packageName, 'Executive');
  assert.equal(h.saved().templateId, reference.id);
  assert.equal(h.saved().productCount, '250');
  assert.deepEqual(h.saved().featureIds, ['reviews']);
  await h.submit();
  assert.match(text(h.button(wizard.confirmPackage)), /\$2,499/);
});

test('clearing explicit requests and reducing product setup retain a selected Executive package', async () => {
  const h = harness();
  const reference = await h.chooseReference(0);
  await h.changeNeeds('250', ['reviews', 'campaign-page']);
  await h.submit();
  await h.click(wizard.confirmPackage);
  assert.equal(h.saved().packageName, 'Executive');
  await h.navigate('Store needs');
  await h.changeNeeds('10', []);
  assert.equal(h.component(Needs).props.packageIndex, 4);
  assert.equal(h.component(Needs).props.packageSelected, true);
  assert.deepEqual(h.component(Needs).props.featureIds, []);
  assert.equal(h.saved().packageName, 'Executive');
  assert.deepEqual(h.saved().featureIds, []);
  assert.equal(h.saved().templateId, reference.id);
  await h.submit();
  assert.ok(h.all().filter(node => node.type === 'h4').map(text).includes('Executive'));
  assert.match(text(h.button(wizard.confirmPackage)), /\$2,499/);
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.package.name, 'Executive');
  assert.equal(brief.package.price, 2499);
  assert.equal(brief.needs.productCount, '10');
  assert.deepEqual(brief.needs.featureIds, []);
});

test('unmatched updates preserve the prior package and requirements while blocking confirmation and checkout', async () => {
  for (const [productCount, featureIds] of [
    ['more', ['reviews']],
    ['50', ['reviews', 'unknown-request']],
  ]) {
    const h = harness();
    await h.chooseReference(2);
    await h.submit();
    await h.click(wizard.confirmPackage);
    await h.navigate('Store needs');
    await h.changeNeeds(productCount, featureIds);
    const updated = h.component(Needs).props;
    assert.equal(updated.packageIndex, 1, 'Do not invent a package for unmatched scope');
    assert.equal(updated.packageSelected, false);
    assert.equal(updated.productCount, productCount);
    assert.deepEqual(updated.featureIds, [...featureIds, 'theme-growth']);
    assert.equal(updated.pending, null);
    await h.submit();
    assert.equal(h.component(Picker).props.selected, 1);
    assert.equal(h.component(Picker).props.confirmed, false);
    assert.equal(h.button(wizard.confirmPackage).props.disabled, true);
    assert.deepEqual(h.all().filter(node => node.type === 'h4').map(text), []);
    assert.equal(h.component(NextTier), undefined);
    assert.equal(h.component(Checkout), undefined);
    assert.ok(h.content().includes(wizard.customReview));
  }
});

test('features chosen before package selection continue to recommend without confirming a package', async () => {
  const h = harness();
  await h.chooseReference(2);
  await h.changeNeeds('250', ['reviews']);
  assert.equal(h.component(Needs).props.packageSelected, false);
  assert.equal(h.saved().packageName, null);
  assert.deepEqual(h.saved().featureIds, ['reviews']);
  await h.submit();
  assert.equal(h.component(Picker).props.confirmed, false);
  assert.ok(h.all().filter(node => node.type === 'h4').map(text).includes('Executive'));
  assert.match(text(h.button(wizard.confirmPackage)), /\$2,499/);
  assert.equal(h.component(Checkout), undefined);
});

test('custom scope, redesign and more than 500 products retain the reference and stop fixed-price confirmation', async () => {
  for (const scope of [
    { productCount: 'more' },
    { projectType: 'Redesign my store' },
    { additionalRequirements: 'Connect a custom warehouse system' },
  ]) {
    const h = harness();
    const reference = await h.chooseReference(8);
    if (scope.projectType) h.setField('projectType', scope.projectType);
    if (scope.additionalRequirements) h.setField('additionalRequirements', scope.additionalRequirements);
    await h.changeNeeds(scope.productCount ?? '50', ['reviews']);
    await h.submit();
    assert.equal(h.stage(), 'Package');
    assert.ok(h.content().includes(wizard.customReview));
    assert.equal(h.button(wizard.confirmPackage).props.disabled, true);
    assert.equal(h.component(Checkout), undefined);
    const saved = h.saved();
    assert.equal(saved.templateId, reference.id);
    assert.deepEqual(saved.featureIds, ['reviews']);
    assert.equal(saved.productCount, scope.productCount ?? '50');
    assert.equal(saved.projectType, scope.projectType ?? 'New store');
  }
});

test('checkout contact validation still requires contact and business details after the design-first flow', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  assert.equal(h.stage(), 'Checkout');
  let valid;
  await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
  assert.equal(valid, false);
  for (const [name, value] of Object.entries({
    name: 'Test Owner', email: 'owner@example.com', phone: '+1 415 555 0123',
    brand: 'Example Store', brief: 'Clothes and accessories for families.',
  })) h.setField(name, value);
  await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
  assert.equal(valid, true);
});

test('returning to a previously visited checkout cannot bypass review after scope stops matching', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  assert.equal(h.stage(), 'Checkout');
  await h.navigate('Store needs');
  await h.changeNeeds('more', ['reviews']);
  await h.navigate('Checkout');
  assert.equal(h.stage(), 'Package');
  assert.equal(h.component(Checkout), undefined);
  assert.equal(h.component(Picker).props.confirmed, false);
  assert.equal(h.button(wizard.confirmPackage).props.disabled, true);
  assert.ok(h.content().includes(wizard.customReview));
});

test('resuming an unconfirmed premium draft preserves its reference and needs without inventing a purchase selection', async () => {
  const h = harness();
  const premium = await h.chooseReference(8);
  h.setField('projectType', 'Redesign my store');
  await h.changeNeeds('250', ['reviews', 'custom-code']);
  const saved = h.saved();
  assert.equal(saved.packageName, null);
  await h.click(wizard.compare);
  await h.click(wizard.allDesigns);
  await h.chooseReference(0);
  h.setField('projectType', 'New store');
  await h.changeNeeds('10', []);
  const draft = h.component(DraftControls);
  await h.act(() => draft.props.onResume());
  assert.equal(h.stage(), 'Store needs');
  assert.equal(h.component(Needs).props.productCount, '250');
  assert.deepEqual(h.component(Needs).props.featureIds, ['reviews', 'custom-code', 'theme-top-tier']);
  const resumed = h.saved();
  assert.equal(resumed.templateId, premium.id);
  assert.equal(resumed.layout, 8);
  assert.equal(resumed.projectType, 'Redesign my store');
  assert.equal(resumed.packageName, null);
  await h.submit();
  assert.equal(h.button(wizard.confirmPackage).props.disabled, true);
  assert.equal(h.component(Checkout), undefined);
});

test('keeping an explicitly chosen larger package discloses its exact total in the confirmation action', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.submit();
  await h.selectPackage(5);
  assert.match(text(h.button(wizard.confirmPackage)), /\$4,999/);
  await h.click(wizard.confirmPackage);
  await h.submit();
  assert.equal(h.component(Checkout).props.brief.package.name, 'Top Tier');
  assert.equal(h.component(Checkout).props.brief.package.price, 4999);
});

test('exploring all references previews each design minimum without replacing a confirmed higher package', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.submit();
  await h.selectPackage(4);
  await h.click(wizard.confirmPackage);
  assert.equal(h.saved().packageName, 'Executive');
  await h.navigate('Design');
  assert.equal(h.component(Gallery).props.browseAll, true);
  for (const [layout, packageName, packageIndex] of [
    [0, 'Beginner', 0],
    [2, 'Growth', 1],
    [3, 'Level Up', 2],
  ]) {
    await h.previewReference(layout);
    const preview = h.component(Preview);
    assert.ok(preview);
    assert.equal(preview.props.layout, layout);
    assert.equal(preview.props.packageName, packageName);
    assert.equal(preview.props.plan, packageIndex);
    assert.equal(h.saved().packageName, 'Executive');
    await h.closePreview();
  }
});

test('included-reference previews keep the confirmed package capabilities', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.submit();
  await h.selectPackage(4);
  await h.click(wizard.confirmPackage);
  await h.navigate('Design');
  await h.click(wizard.includedDesigns);
  assert.equal(h.component(Gallery).props.browseAll, false);
  for (const layout of [0, 2, 3]) {
    await h.previewReference(layout);
    const preview = h.component(Preview);
    assert.equal(preview.props.layout, layout);
    assert.equal(preview.props.packageName, 'Executive');
    assert.equal(preview.props.plan, 4);
    assert.equal(h.saved().packageName, 'Executive');
    await h.closePreview();
  }
});

test('choosing the optional next tier updates the main reviewed package and exact confirmation total', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.changeNeeds('125', ['campaign-page', 'promotional-banners']);
  await h.submit();
  assert.ok(h.all().filter(node => node.type === 'h4').map(text).includes('Pro'));
  assert.match(text(h.button(wizard.confirmPackage)), /\$1,499/);
  const optional = h.component(NextTier);
  assert.ok(optional);
  assert.equal(optional.props.packageIndex, 3);
  assert.equal(h.component(Picker).props.confirmed, false);
  const card = NextTier(optional.props);
  assert.equal(h.component(Picker).props.confirmed, false);
  const choose = nodes(card).find(node => node.type === 'button');
  assert.ok(choose);
  assert.equal(text(choose), 'Choose Executive');
  await h.act(() => choose.props.onClick());
  assert.equal(h.stage(), 'Package');
  const reviewedHeadings = h.all().filter(node => node.type === 'h4').map(text);
  assert.ok(reviewedHeadings.includes('Executive'));
  assert.ok(!reviewedHeadings.includes('Pro'));
  assert.match(text(h.button(wizard.confirmPackage)), /\$2,499/);
  assert.equal(h.component(Picker).props.selected, 4);
  assert.equal(h.component(Picker).props.confirmed, true);
  assert.equal(h.component(NextTier), undefined);
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.package.name, 'Executive');
  assert.equal(brief.package.price, 2499);
  assert.equal(brief.needs.productCount, '125');
  assert.ok(brief.needs.featureIds.includes('campaign-page'));
  assert.ok(brief.needs.featureIds.includes('promotional-banners'));
});

test('a service category reaches its service reference and checkout brief without changing the business classification', async () => {
  const h = harness();
  await h.changeBusiness('services', 'Professional services');
  assert.equal(h.component(Gallery).props.categoryFilter, 'Professional services');
  await h.previewReference(2);
  const preview = h.component(Preview).props;
  assert.equal(preview.values.businessType, 'services');
  assert.equal(preview.values.businessCategory, 'Professional services');
  assert.equal(preview.packageName, 'Growth');
  await h.closePreview();
  const reference = await h.chooseReference(2);
  await h.changeNeeds('50', ['newsletter']);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.business.businessType, 'services');
  assert.equal(brief.business.businessCategory, 'Professional services');
  assert.equal(brief.business.customCategory, '');
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.package.name, 'Growth');
  assert.equal(brief.needs.productCount, '50');
  assert.ok(brief.needs.featureIds.includes('newsletter'));
});

test('a custom service category survives save, resume and checkout with its exact label', async () => {
  const h = harness();
  const customCategory = 'Mobile pet grooming / at-home care';
  await h.changeBusiness('services', SHOPIFY_CUSTOM_CATEGORY, customCategory);
  assert.equal(h.component(Gallery).props.categoryFilter, 'Services');
  const reference = await h.chooseReference(3);
  await h.changeNeeds('75', ['reviews']);
  const saved = h.saved();
  assert.equal(saved.businessType, 'services');
  assert.equal(saved.businessCategory, SHOPIFY_CUSTOM_CATEGORY);
  assert.equal(saved.customCategory, customCategory);
  await h.navigate('Design');
  await h.changeBusiness('products', 'Fashion');
  await h.chooseReference(0);
  await h.act(() => h.component(DraftControls).props.onResume());
  assert.equal(h.stage(), 'Store needs');
  assert.equal(h.component(Needs).props.productCount, '75');
  assert.ok(h.component(Needs).props.featureIds.includes('reviews'));
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.business.businessType, 'services');
  assert.equal(brief.business.businessCategory, SHOPIFY_CUSTOM_CATEGORY);
  assert.equal(brief.business.customCategory, customCategory);
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.package.name, 'Pro');
  assert.equal(brief.needs.designLayout, 3);
});

test('changing a confirmed business category resets the reference choice while retaining package, layout and needs', async () => {
  const h = harness();
  await h.chooseReference(2);
  await h.changeNeeds('50', ['reviews']);
  await h.submit();
  await h.selectPackage(4);
  await h.click(wizard.confirmPackage);
  await h.navigate('Design');
  await h.changeBusiness('services', 'Fitness services');
  const gallery = h.component(Gallery).props;
  assert.equal(gallery.categoryFilter, 'Fitness services');
  assert.equal(gallery.packageName, 'Executive');
  assert.equal(gallery.selected, -1, 'The replacement reference still needs an explicit choice');
  assert.equal(h.button(wizard.selectedAction), undefined);
  const saved = h.saved();
  assert.equal(saved.packageName, 'Executive');
  assert.equal(saved.layout, 2);
  assert.equal(studioTemplates.find(item => item.id === saved.templateId).category, 'Fitness services');
  assert.equal(saved.productCount, '50');
  assert.deepEqual(saved.featureIds, ['reviews']);
  const reference = await h.chooseReference(2);
  assert.equal(h.component(Needs).props.packageSelected, true);
  assert.equal(h.component(Needs).props.packageIndex, 4);
  assert.equal(h.component(Needs).props.productCount, '50');
  assert.ok(h.component(Needs).props.featureIds.includes('reviews'));
  await h.submit();
  assert.match(text(h.button(wizard.confirmPackage)), /\$2,499/);
  await h.click(wizard.confirmPackage);
  await h.submit();
  assert.equal(h.component(Checkout).props.brief.package.name, 'Executive');
  assert.equal(h.component(Checkout).props.brief.design.template, reference.name);
});

test('a blank custom category blocks package review and returning to an already visited checkout', async () => {
  const h = harness();
  await h.changeBusiness('services', SHOPIFY_CUSTOM_CATEGORY, '   ');
  await h.chooseReference(0);
  await h.submit();
  assert.equal(h.stage(), 'Design');
  assert.equal(h.component(Checkout), undefined);
  assert.equal(h.component(Picker), undefined);
  assert.ok(h.content().includes(shopifyBusinessCategoryCopy.customRequired));
  await h.changeBusiness('services', SHOPIFY_CUSTOM_CATEGORY, 'Local appliance repair');
  await h.chooseReference(0);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  assert.equal(h.stage(), 'Checkout');
  await h.navigate('Design');
  await h.changeBusiness('services', SHOPIFY_CUSTOM_CATEGORY, '');
  await h.navigate('Checkout');
  assert.equal(h.stage(), 'Design');
  assert.equal(h.component(Checkout), undefined);
  assert.ok(h.content().includes(shopifyBusinessCategoryCopy.customRequired));
});

test('a business offering both products and services previews service identity but preserves both in checkout', async () => {
  const h = harness();
  await h.changeBusiness('both', 'Beauty services');
  await h.previewReference(0);
  assert.equal(h.component(Preview).props.values.businessType, 'services');
  assert.equal(h.component(Preview).props.values.businessCategory, 'Beauty services');
  await h.closePreview();
  const reference = await h.chooseReference(0);
  await h.submit();
  await h.click(wizard.confirmPackage);
  const embeddedPreview = h.component(Preview);
  assert.equal(embeddedPreview.props.values.businessType, 'services');
  assert.equal(embeddedPreview.props.values.businessCategory, 'Beauty services');
  await h.submit();
  const brief = h.component(Checkout).props.brief;
  assert.equal(brief.business.businessType, 'both');
  assert.equal(brief.business.businessCategory, 'Beauty services');
  assert.equal(brief.design.template, reference.name);
});

test('mounted checkout validation rejects a custom category cleared after the earlier review', async () => {
  const h = harness();
  await h.changeBusiness('services', SHOPIFY_CUSTOM_CATEGORY, 'Local appliance repair');
  await h.chooseReference(0);
  await h.submit();
  await h.click(wizard.confirmPackage);
  await h.submit();
  for (const [name, value] of Object.entries({
    name: 'Test Owner', email: 'owner@example.com', phone: '+1 415 555 0123',
    brand: 'Local Care', brief: 'Appliance repairs for local households.',
  })) h.setField(name, value);
  let valid;
  await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
  assert.equal(valid, true);
  h.setField('customCategory', '   ');
  await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
  assert.equal(valid, false);
  assert.equal(h.stage(), 'Design');
  assert.equal(h.component(Checkout), undefined);
  assert.ok(h.content().includes(shopifyBusinessCategoryCopy.customRequired));
});

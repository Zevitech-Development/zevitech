// Run the studio's real transition callbacks with controlled hooks and real field
// schemas. No DOM renderer, added dependencies, network or checkout requests.
require('./setup-next-image.cjs');
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

require('./setup-next-dynamic.cjs');
const Studio = require('../src/elements/business/shopify/shopify-store-studio.tsx').default;
const Gallery = require('../src/elements/business/shopify/shopify-template-gallery.tsx').default;
const Picker = require('../src/elements/business/shopify/shopify-package-picker.tsx').default;
const NextTier = require('../src/elements/business/shopify/shopify-package-next-tier.tsx').default;
const Checkout = require('../src/elements/business/shopify/shopify-package-checkout.tsx').default;
const DraftControls = require('../src/elements/business/shopify/shopify-design-draft-controls.tsx').default;
const ThemeUpgrade = require('../src/elements/business/shopify/shopify-theme-upgrade.tsx').default;
const Preview = require('../src/elements/business/shopify/shopify-studio-preview.tsx').default;
const BusinessCategoryPicker = require('../src/elements/business/shopify/shopify-business-category-picker.tsx').default;
const { Dialog } = require('../src/components/ui/dialog.tsx');
const { studioCopy, studioPlans } = require('../src/content/landing/shopify-studio-content.ts');
const { studioTemplates } = require('../src/content/landing/shopify-studio-templates.ts');
const { shopifyWizardCopy: wizard } = require('../src/content/landing/shopify-wizard-content.ts');
const { ShopifyStudioSchema } = require('../src/schemas/shopify-studio-schema.ts');
const { getThemeMinimumPackage } = require('../src/lib/shopify-theme-access.ts');
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
    && (text(node) === label || text(node).startsWith(`${label} · $`) || (text(node).startsWith(`${label} `) && text(node).includes(' · $'))));
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


const planIndex = name => studioPlans.findIndex(plan => plan.name === name);
const contact = { name: 'Alex Morgan', email: 'alex@example.com', phone: '+1 302 217 6872', brand: 'Morgan Goods', brief: 'Handmade leather goods for busy professionals.' };
async function reachCheckout(h) {
  if (!h.component(Picker)?.props.confirmed) await h.selectPackage(0);
  await h.click(wizard.confirmPackage);
  assert.equal(h.stage(), 'Details & payment');
  for (const [name, value] of Object.entries(contact)) h.setField(name, value);
  const previousFetch = global.fetch;
  global.fetch = async () => ({ ok: true, json: async () => ({ ok: true, leadId: 'lead-12345678-1234-1234-1234-123456789abc' }) });
  try { await h.act(() => h.component(Checkout).props.onValidate()); } finally { global.fetch = previousFetch; }
  const checkout = h.component(Checkout);
  assert.ok(checkout, 'Expected the inline checkout');
  return checkout;
}

test('the journey has three customer steps and starts on design without a package or checkout', () => {
  const h = harness();
  assert.deepEqual(wizard.steps, ['Choose a design', 'Choose a package', 'Details & payment']);
  assert.equal(h.stage(), 'Choose a design');
  assert.equal(h.component(Gallery).props.browseAll, true);
  assert.equal(h.component(Picker), undefined);
  assert.equal(h.component(Checkout), undefined);
});

test('choosing a design leaves package selection to the customer and highlights Top Tier', async () => {
  const h = harness();
  const reference = await h.chooseReference(8);
  const minimum = planIndex(getThemeMinimumPackage(8));
  assert.equal(studioPlans[minimum].name, 'Beginner');
  assert.equal(h.stage(), 'Choose a package');
  const picker = h.component(Picker);
  assert.equal(picker.props.minimumIndex, minimum);
  assert.equal(picker.props.recommendedIndex, planIndex('Top Tier'));
  assert.equal(picker.props.selected, minimum);
  assert.equal(picker.props.confirmed, false);
  assert.equal(picker.props.designName, reference.name);
  assert.equal(h.component(ThemeUpgrade).props.pending, null);
  assert.equal(h.component(Checkout), undefined);
  assert.ok(h.button(wizard.choosePackage).props.disabled);
});

test('a premium design can be selected with Beginner and checkout preserves the design', async () => {
  const h = harness();
  const reference = await h.chooseReference(8);
  await h.selectPackage(0);
  assert.equal(h.component(Picker).props.selected, 0);
  const checkout = await reachCheckout(h);
  assert.equal(checkout.props.brief.package.name, 'Beginner');
  assert.equal(checkout.props.brief.design.template, reference.name);
  assert.equal(checkout.props.brief.needs.designLayout, 8);
});

test('a preselected package can be upgraded and checkout receives the exact package and design', async () => {
  const h = harness();
  const reference = await h.chooseReference(2);
  const minimum = planIndex(getThemeMinimumPackage(2));
  assert.equal(h.component(Picker).props.selected, minimum);
  await h.selectPackage(3);
  assert.equal(text(h.button(wizard.confirmPackage)), wizard.confirmPackage);
  const checkout = await reachCheckout(h);
  const brief = checkout.props.brief;
  assert.equal(brief.package.name, 'Pro');
  assert.equal(brief.package.price, 1499);
  assert.equal(brief.design.template, reference.name);
  assert.equal(brief.needs.scopeConfirmed, true);
  assert.ok(h.content().includes(wizard.afterCheckout));
});

test('the single checkout action validates and saves contact details before opening payment; failed saves can retry', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.selectPackage(0);
  await h.click(wizard.confirmPackage);
  assert.ok(h.component(Checkout), 'The single checkout action is available on the details step');
  assert.ok(!h.content().includes('Save details & continue to checkout'));
  let requests = 0;
  const previousFetch = global.fetch;
  global.fetch = async () => { requests++; return { ok: false }; };
  try {
    let valid;
    await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
    assert.equal(valid, false);
    assert.equal(requests, 0, 'Invalid contact fields must not be submitted');
    for (const [name, value] of Object.entries(contact)) h.setField(name, value);
    await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
    assert.equal(valid, false, 'Failed persistence must block payment preparation');
    assert.ok(h.content().includes(wizard.leadError));
    global.fetch = async () => ({ ok: true, json: async () => ({ ok: true, leadId: 'lead-12345678-1234-1234-1234-123456789abc' }) });
    await h.act(() => h.component(Checkout).props.onValidate());
    assert.ok(h.component(Checkout));
    assert.equal(h.component(Checkout).props.brief.business.email, contact.email);
  } finally { global.fetch = previousFetch; }
});

test('redesigns and migrations continue to a quote request instead of fixed-price checkout', async () => {
  const h = harness();
  h.setField('projectType', 'Redesign my store');
  await h.chooseReference(0);
  await h.selectPackage(0);
  assert.equal(h.stage(), 'Choose a package');
  assert.ok(h.content().includes(wizard.customReview));
  assert.ok(h.button(wizard.quoteAction));
  await h.click(wizard.quoteContinue);
  assert.equal(h.stage(), 'Details & payment');
  assert.equal(h.component(Checkout), undefined, 'No card payment for quote requests');
  assert.ok(h.button(wizard.quoteSubmit));
  assert.ok(h.all().some(node => node.props?.name === 'existingStore'));
});

test('checkout validation sends the full lead once before payment', async () => {
  const h = harness();
  const calls = [];
  global.fetch = async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); return { ok: true, json: async () => ({ ok: true, leadId: "lead-12345678-1234-1234-1234-123456789abc" }) }; };
  try {
    await h.chooseReference(0);
    await h.selectPackage(0);
    await h.click(wizard.confirmPackage);
    for (const [name, value] of Object.entries(contact)) h.setField(name, value);
    await h.act(() => h.component(Checkout).props.onValidate());
    let valid;
    await h.act(async () => { valid = await h.component(Checkout).props.onValidate(); });
    await h.act(async () => { await h.component(Checkout).props.onValidate(); });
    assert.equal(valid, true);
    assert.equal(calls.length, 1, 'An unchanged lead is sent once');
    assert.equal(calls[0].url, '/api/shopify-lead');
    assert.equal(calls[0].body.intent, 'checkout');
    for (const [name, value] of Object.entries(contact)) assert.equal(calls[0].body[name], value);
    assert.equal(calls[0].body.packageName, studioPlans[h.component(Picker)?.props.selected ?? 0]?.name ?? calls[0].body.packageName);
  } finally { delete global.fetch; }
});

test('package-first entry shows that package’s designs and keeps the chosen package', async () => {
  const h = harness();
  await h.click(wizard.compare);
  assert.equal(h.stage(), 'Choose a package');
  assert.equal(h.component(Picker).props.minimumIndex, 0);
  await h.selectPackage(1);
  await h.click(wizard.packageContinue);
  assert.equal(h.component(Gallery).props.packageName, 'Growth');
  assert.equal(h.component(Gallery).props.browseAll, false);
  await h.chooseReference(0);
  assert.equal(h.component(Picker).props.selected, 1);
  assert.equal(h.component(Picker).props.confirmed, true);
});

test('branding is an optional side step that returns to checkout', async () => {
  const h = harness();
  await h.chooseReference(0);
  await reachCheckout(h);
  await h.click(wizard.brandingOptional);
  assert.equal(h.component(Checkout), undefined);
  assert.ok(h.all().some(node => node.props?.name === 'brand'));
  await h.submit();
  assert.ok(h.component(Checkout), 'Expected to return to checkout');
});

test('a saved design resumes on the package step with its package', async () => {
  const h = harness();
  const reference = await h.chooseReference(8);
  await h.selectPackage(0);
  const draft = h.saved();
  assert.equal(draft.templateId, reference.id);
  assert.equal(draft.packageName, 'Beginner');
  await h.act(() => h.component(DraftControls).props.onResume());
  assert.equal(h.stage(), 'Choose a package');
  assert.equal(h.component(Picker).props.selected, planIndex('Beginner'));
});

test('a blank custom category is caught before checkout', async () => {
  const h = harness();
  await h.chooseReference(0);
  await h.selectPackage(0);
  h.setField('businessCategory', SHOPIFY_CUSTOM_CATEGORY);
  h.setField('customCategory', '');
  await h.click(wizard.confirmPackage);
  assert.equal(h.stage(), 'Choose a design');
  assert.ok(h.content().includes(shopifyBusinessCategoryCopy.customRequired));
});

test('a locked package shows the designs that package can build and keeps that package', async () => {
  const h = harness();
  await h.chooseReference(8);
  const picker = h.component(Picker);
  assert.equal(typeof picker.props.onLockedSelect, 'function');
  await h.act(() => picker.props.onLockedSelect(1));
  assert.equal(h.stage(), 'Choose a design');
  assert.equal(h.component(Gallery).props.packageName, 'Growth');
  assert.equal(h.component(Gallery).props.browseAll, false);
  await h.chooseReference(0);
  assert.equal(h.component(Picker).props.selected, 1);
  assert.equal(text(h.button(wizard.confirmPackage)), wizard.confirmPackage);
});

test('chosen design is changed from the header, not duplicate package gallery links', async () => {
  const h = harness();
  await h.chooseReference(0);
  assert.equal(h.component(Picker).props.onViewDesigns, undefined);
  assert.equal(h.button(wizard.allDesigns), undefined);
  await h.selectPackage(3);
  await h.click(wizard.changeTheme);
  assert.equal(h.stage(), 'Choose a design');
  assert.equal(h.component(Gallery).props.packageName, 'Pro');
});


test('optional feature upgrade appears below packages and only changes the plan on selection', async () => {
  const h = harness();
  const reference = await h.chooseReference(9);
  assert.equal(h.component(NextTier), undefined);
  await h.selectPackage(0);
  const upgrade = h.component(NextTier);
  assert.ok(upgrade);
  assert.equal(upgrade.props.packageIndex, 0);
  assert.equal(h.component(Picker).props.selected, 0);
  const all = h.all();
  assert.ok(all.findIndex(node => node.type === NextTier) > all.findIndex(node => node.type === Picker));
  await h.act(() => upgrade.props.onSelect(1));
  assert.equal(h.component(Picker).props.selected, 1);
  const checkout = await reachCheckout(h);
  assert.equal(checkout.props.brief.design.template, reference.name);
  assert.equal(checkout.props.brief.package.name, 'Growth');
});

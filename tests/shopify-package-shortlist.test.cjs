// Focused comparison checks. No provider, browser or network calls.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const Module = require('node:module');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};

require.extensions['.ts'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};

const { getShopifyPackageShortlist } = require('../src/lib/shopify-package-shortlist.ts');
const { studioPlans } = require('../src/content/landing/shopify-studio-content.ts');

function names(plans, recommendedName, selectedName) {
  return getShopifyPackageShortlist(
    plans,
    plans.findIndex((plan) => plan.name === recommendedName),
    plans.findIndex((plan) => plan.name === selectedName),
  ).map((index) => plans[index].name);
}

test('every recommendation keeps the current selection and at most one other alternative', () => {
  for (let recommended = 0; recommended < studioPlans.length; recommended++) {
    for (let selected = 0; selected < studioPlans.length; selected++) {
      const result = getShopifyPackageShortlist(studioPlans, recommended, selected);
      assert.equal(result[0], recommended);
      assert.ok(result.includes(selected));
      assert.equal(new Set(result).size, result.length);
      assert.equal(result.length, recommended === selected ? 2 : 3);
      assert.ok(result.every((index) => Number.isInteger(index) && index >= 0 && index < studioPlans.length));
      assert.equal(result.filter((index) => index !== recommended && index !== selected).length, 1);
    }
  }
});

test('the public comparison keeps all packages without a valid recommendation', () => {
  const all = studioPlans.map((_, index) => index);
  for (const recommended of [undefined, null, -1, 0.5, studioPlans.length, NaN, Infinity]) {
    assert.deepEqual(getShopifyPackageShortlist(studioPlans, recommended, 5), all);
  }
});

test('alternatives use actual price distance and keep distant manual choices', () => {
  assert.deepEqual(names(studioPlans, 'Growth', 'Growth'), ['Growth', 'Beginner']);
  assert.deepEqual(names(studioPlans, 'Pro', 'Pro'), ['Pro', 'Level Up']);
  assert.deepEqual(names(studioPlans, 'Growth', 'Top Tier'), ['Growth', 'Top Tier', 'Beginner']);
  assert.deepEqual(names(studioPlans, 'Growth', 'Beginner'), ['Growth', 'Beginner', 'Level Up']);
  assert.deepEqual(names(studioPlans, 'Top Tier', 'Beginner'), ['Top Tier', 'Beginner', 'Executive']);
});

test('reordered package records preserve the same named recommendation, selection and alternative', () => {
  const reordered = [...studioPlans].reverse();
  for (const recommended of studioPlans) {
    for (const selected of studioPlans) {
      assert.deepEqual(
        names(reordered, recommended.name, selected.name),
        names(studioPlans, recommended.name, selected.name),
      );
    }
  }
});

test('equal price distances prefer the cheaper alternative consistently', () => {
  const plans = [
    { name: 'Higher', price: 150 },
    { name: 'Recommended', price: 100 },
    { name: 'Lower', price: 50 },
  ];
  assert.deepEqual(names(plans, 'Recommended', 'Recommended'), ['Recommended', 'Lower']);
  assert.deepEqual(names([...plans].reverse(), 'Recommended', 'Recommended'), ['Recommended', 'Lower']);
});

test('changed needs recompute the shortlist without discarding the manually selected package', () => {
  assert.deepEqual(names(studioPlans, 'Growth', 'Top Tier'), ['Growth', 'Top Tier', 'Beginner']);
  assert.deepEqual(names(studioPlans, 'Pro', 'Top Tier'), ['Pro', 'Top Tier', 'Level Up']);
  assert.deepEqual(names(studioPlans, 'Executive', 'Top Tier'), ['Executive', 'Top Tier', 'Pro']);
});

test('short lists and invalid selected indices never produce out-of-bounds or duplicate cards', () => {
  assert.deepEqual(getShopifyPackageShortlist([], 0, 0), []);
  assert.deepEqual(getShopifyPackageShortlist(studioPlans.slice(0, 1), 0, 0), [0]);
  assert.deepEqual(getShopifyPackageShortlist(studioPlans.slice(0, 2), 0, 1), [0, 1]);
  for (const selected of [-1, 0.5, studioPlans.length, NaN, Infinity]) {
    assert.deepEqual(getShopifyPackageShortlist(studioPlans, 1, selected), [1, 0]);
  }
});

test('shortlisting leaves package order, prices and scope untouched', () => {
  const before = structuredClone(studioPlans);
  getShopifyPackageShortlist(studioPlans, 4, 0);
  assert.deepEqual(studioPlans, before);
});

// A large catalogue must release offscreen storefronts without changing layout.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText, filename);
const Thumbnail = require('../src/elements/business/shopify/shopify-live-thumbnail.tsx').default;

test('thumbnail mounts only near the viewport, preserves height, remounts and cleans up observers', () => {
  const originals = { useState: React.useState, useRef: React.useRef, useEffect: React.useEffect, ResizeObserver: global.ResizeObserver, IntersectionObserver: global.IntersectionObserver };
  const states = [], element = {}, ref = { current: element };
  let cursor = 0, mounted = false, cleanup, intersect, resize, disconnected = 0;
  const observe = node => assert.equal(node, element);
  global.ResizeObserver = class { constructor(callback) { resize = callback; } observe = observe; disconnect() { disconnected++; } };
  global.IntersectionObserver = class { constructor(callback, options) { if (options.rootMargin === '200px') intersect = callback; else assert.equal(options.rootMargin, '800px'); } observe = observe; disconnect() { disconnected++; } };
  React.useState = initial => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = value; }]; };
  React.useRef = () => ref;
  React.useEffect = effect => { if (!mounted) { mounted = true; cleanup = effect(); } };
  const render = () => { cursor = 0; return Thumbnail({ referenceId: 'atelier-editorial' }); };
  try {
    const initial = render();
    assert.match(initial.props.className, /h-\[28rem\]/);
    assert.equal(initial.props.children, false);
    intersect([{ isIntersecting: true }]);
    assert.ok(render().props.children, 'nearby storefront is mounted');
    assert.equal(disconnected, 0, 'visibility stays observed after first intersection');
    resize([{ contentRect: { width: 360.2 } }]);
    assert.equal(render().props.children.props.style['--thumbnail-scale'], 360 / 1100);
    intersect([{ isIntersecting: false }]);
    const sleeping = render();
    assert.equal(sleeping.props.children, false, 'offscreen storefront and effects are released');
    assert.equal(sleeping.props.className, initial.props.className, 'wrapper dimensions stay unchanged');
    intersect([{ isIntersecting: true }]);
    assert.ok(render().props.children, 'scrolling back restores the actual storefront');
    cleanup();
    assert.equal(disconnected, 3);
  } finally { Object.assign(React, { useState: originals.useState, useRef: originals.useRef, useEffect: originals.useEffect }); global.ResizeObserver = originals.ResizeObserver; global.IntersectionObserver = originals.IntersectionObserver; }
});

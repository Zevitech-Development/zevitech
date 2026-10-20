// Native select compatibility checks. No browser, network or provider calls.
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

const StudioSelect = require('../src/elements/business/shopify/shopify-studio-select.tsx').default;
const options = [
  React.createElement('option', { key: 'US', value: 'US' }, 'United States'),
  React.createElement('option', { key: 'CA', value: 'CA' }, 'Canada'),
];

test('native form attributes, labels and selected options survive the styled wrapper', () => {
  const markup = renderToStaticMarkup(React.createElement('label', { htmlFor: 'billing-country' },
    'Country',
    React.createElement(StudioSelect, {
      id: 'billing-country',
      name: 'country',
      required: true,
      autoComplete: 'country',
      defaultValue: 'CA',
      'aria-describedby': 'country-help',
    }, options),
  ));
  assert.equal((markup.match(/<select\b/g) || []).length, 1);
  assert.match(markup, /<label for="billing-country">Country/);
  assert.match(markup, /<select[^>]*id="billing-country"[^>]*name="country"[^>]*required=""[^>]*autoComplete="country"[^>]*aria-describedby="country-help"/);
  assert.match(markup, /<option value="CA" selected="">Canada<\/option>/);
  assert.doesNotMatch(markup, /<button\b|role="(?:button|combobox)"|tabindex=/i);
});

test('controlled values, event handlers and form refs reach the native select unchanged', () => {
  const calls = [];
  const ref = React.createRef();
  const onChange = event => calls.push(event.target.value);
  const onBlur = () => calls.push('blur');
  const tree = StudioSelect.render({ name: 'industry', value: 'CA', onChange, onBlur, children: options }, ref);
  const field = React.Children.toArray(tree.props.children).find(child => child.type === 'select');
  assert.ok(field);
  assert.equal(field.ref, ref);
  assert.equal(field.props.name, 'industry');
  assert.equal(field.props.value, 'CA');
  assert.equal(field.props.onChange, onChange);
  assert.equal(field.props.onBlur, onBlur);
  field.props.onChange({ target: { value: 'US' } });
  field.props.onBlur();
  assert.deepEqual(calls, ['US', 'blur']);
});

test('the decorative inset arrow cannot capture clicks or overlap reserved select text', () => {
  const markup = renderToStaticMarkup(React.createElement(StudioSelect, {
    disabled: true,
    defaultValue: 'US',
    className: 'pr-1 text-xs min-h-8',
    wrapperClassName: 'mt-2',
  }, options));
  const field = markup.match(/<select\b[^>]*>/)[0];
  assert.match(field, /disabled=""/);
  assert.match(field, /min-h-12 appearance-none pr-12 text-base/);
  assert.doesNotMatch(field, /(?:^| )pr-1(?: |")|(?:^| )text-xs(?: |")|(?:^| )min-h-8(?: |")/);
  assert.match(markup, /aria-hidden="true" class="pointer-events-none absolute right-3 top-1\/2/);
  assert.match(markup, /<svg[^>]*aria-hidden="true"[^>]*focusable="false"/);
  assert.match(field, /focus-visible:ring-2/);
});

// Generate a real planning PDF with the project's embedded fonts. No network or payment calls.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { PDFDocument, PDFPage } = require('pdf-lib');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
require.extensions['.ts'] = function (module, filename) {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};
const { createProjectBriefPdf } = require('../src/lib/shopify-project-brief-pdf.ts');

test('the real project PDF records the package total and both payment stages without claiming payment', async () => {
  const input = {
    createdAt: '2026-10-20T00:00:00Z',
    plan: { name: 'Growth', price: 599, products: 30, features: ['Customised store design'] },
    business: {
      projectType: 'New store', businessType: 'Service business', businessCategory: 'Creative & digital',
      brand: 'Example Studio', brief: 'An example creative business.', existingStore: '',
      name: 'Example Customer', email: 'customer@example.com', phone: '+1 (202) 555-0123',
    },
    design: {
      reference: 'Form & Field Studio Spotlight', layout: 'Spotlight', palette: 'Ocean',
      priorities: [], references: '', requirements: '',
    },
    assets: { logoName: '', productNames: [] },
    fonts: {
      regular: fs.readFileSync(path.join(root, 'public/store-studio/fonts/Inter-Regular.ttf')),
      bold: fs.readFileSync(path.join(root, 'public/store-studio/fonts/Inter-Bold.ttf')),
    },
  };
  const drawn = [];
  const originalDraw = PDFPage.prototype.drawText;
  PDFPage.prototype.drawText = function (value, ...args) {
    drawn.push(value);
    return originalDraw.call(this, value, ...args);
  };
  let bytes;
  try {
    bytes = await createProjectBriefPdf(input);
  } finally {
    PDFPage.prototype.drawText = originalDraw;
  }
  const document = await PDFDocument.load(bytes);
  assert.ok(document.getPageCount() > 0);
  const text = drawn.join(' ');
  assert.match(text, /Total package price/);
  assert.match(text, /\$599 USD/);
  assert.match(text, /Due at checkout — 40% upfront/);
  assert.match(text, /\$239\.60 USD/);
  assert.match(text, /Due after delivery — 60% balance/);
  assert.match(text, /\$359\.40 USD/);
  assert.match(text, /Planning brief — not a payment receipt/);
  assert.match(text, /does not confirm a payment/);
});

// Server tests render synchronously: resolve next/dynamic imports to the real component.
const Module = require('node:module');
const path = require('node:path');
const originalLoad = Module._load;
Module._load = function (request, parent, ...rest) {
  if (request === 'next/dynamic') {
    const dynamic = loader => {
      const match = loader.toString().match(/require\((["'`])(.+?)\1\)/);
      if (!match) throw new Error('Unsupported dynamic import in tests');
      const resolved = Module._resolveFilename(match[2], parent);
      return require(resolved).default;
    };
    return { __esModule: true, default: dynamic };
  }
  return originalLoad.call(this, request, parent, ...rest);
};
module.exports = { root: path.resolve(__dirname, '..') };

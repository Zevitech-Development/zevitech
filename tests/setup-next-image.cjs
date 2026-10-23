// Mirrors next.config.mjs image domains so server-rendered tests accept the same remote photography.
// Next inlines this value as an object at build time, so the test environment provides an object too.
const { imageConfigDefault } = require('next/dist/shared/lib/image-config');
process.env = { ...process.env, __NEXT_IMAGE_OPTS: { ...imageConfigDefault, domains: ['i.pinimg.com', 'images.unsplash.com'] } };

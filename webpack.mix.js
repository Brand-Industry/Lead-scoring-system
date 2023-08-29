const mix = require('laravel-mix');
require('laravel-mix-purgecss');

const basePath = './src/resources';
mix.js(`${basePath}/src/systemleads.js`, `${basePath}/dist/js`).react().setPublicPath(basePath);
if (mix.inProduction()) {
  mix.purgeCss({
    content: [`${basePath}/**/*.jsx`],
    safelist: { deep: [/accordion*/, /table*/, /collapse/, /show/, /react-datepicker*/] }
  });
}

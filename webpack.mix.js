const mix = require("laravel-mix");
require("laravel-mix-purgecss");

const basePath = "./src/resources";

// mix.webpackConfig({
//   stats: {
//     children: true,
//   },
// });

mix
  .sass(`${basePath}/src/styles/app.scss`, "./src/web/css/")
  .js(`${basePath}/src/systemleads.js`, `./src/web/js`)
  .react();
if (mix.inProduction()) {
  mix.purgeCss({
    content: [`${basePath}/**/*.jsx`],
    safelist: {
      deep: [/accordion*/, /table*/, /collapse/, /show/, /react-datepicker*/],
    },
  });
}

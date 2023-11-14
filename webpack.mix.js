const mix = require("laravel-mix");
const purgeCss = require("@fullhuman/postcss-purgecss");
const optionsApp = [];
const basePath = "./src/resources";

// mix.webpackConfig({
//   stats: {
//     children: true,
//   },
// });

if (mix.inProduction()) {
  optionsApp.push(
    purgeCss({
      content: [`${basePath}/**/*.jsx`, "./src/templates/**/*.twig"],
      safelist: {
        deep: [
          /accordion*/,
          /table*/,
          /collapse/,
          /show/,
          /react-datepicker*/,
          /col-lg-4/,
          /gy-4/,
          /modal*/,
          /leadSystem*/,
          /fade/,
          /show/,
        ],
      },
    })
  );
}

mix.sass(`${basePath}/src/styles/app.scss`, "./src/web/css/", {}, optionsApp);

mix.js(`${basePath}/src/systemleads.js`, `./src/web/js`).react();

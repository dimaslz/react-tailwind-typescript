/* eslint-disable */
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    // return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const purgeCSS = purgecss({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.html",
    "./src/**/*.tsx",
    "./src/**/*.jsx",
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  // defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ["html", "tsx"],
    },
  ],
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgeCSS] : []),
  ],
};
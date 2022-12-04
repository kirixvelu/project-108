const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false });

  eleventyConfig.addLayoutAlias("main", "layouts/main");
  eleventyConfig.addLayoutAlias("page", "layouts/page");
  eleventyConfig.addLayoutAlias("article", "layouts/article");

  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/**/*");

  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/manifest.json");
  eleventyConfig.addPassthroughCopy("./src/apple-touch.png");
  eleventyConfig.addPassthroughCopy("./src/android-chrome.png");

  eleventyConfig.addPassthroughCopy({
    "node_modules/svg-icon-sprite/dist/svg-icon-sprite.js":
      "assets/svg-icon-sprite.js",
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/_11ty/imageShortcode").imageShortcode
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });

  /* Creating a collection of blog posts by filtering based on folder and filetype */
  eleventyConfig.addCollection("blog", (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
  });
  eleventyConfig.addCollection(
    "categoryList",
    require("./src/_11ty/getCategoryList")
  );
  eleventyConfig.addCollection(
    "categories",
    require("./src/_11ty/createCategories")
  );

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  });

  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
  };
};

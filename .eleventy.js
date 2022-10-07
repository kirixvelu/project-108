const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false });

  eleventyConfig.addLayoutAlias("page", "layouts/page");
  eleventyConfig.addLayoutAlias("article", "layouts/article");

  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("./src/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("./src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("./src/android-chrome-512x512.png");

  eleventyConfig.addPassthroughCopy("./src/4x5.pdf");
  eleventyConfig.addPassthroughCopy("./src/8x11.pdf");
  eleventyConfig.addPassthroughCopy("./src/404.md");

  eleventyConfig.addPassthroughCopy("./src/assets/icons");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/sprite.svg");
  eleventyConfig.addPassthroughCopy({
    "node_modules/svg-icon-sprite/dist/svg-icon-sprite.js":
      "assets/svg-icon-sprite.js",
  });
  eleventyConfig.addPassthroughCopy("./src/assets/social-image.jpg");

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/_11ty/imageShortcode").imageShortcode
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "America/Toronto",
    })
      .setLocale("en")
      .toLocaleString(DateTime.DATE_FULL);
  });

  /* Creating a collection of blogposts by filtering based on folder and filetype */
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
    files: "./_site/assets/**/*.css",
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

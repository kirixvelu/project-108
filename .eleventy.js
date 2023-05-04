const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const searchFilter = require("./src/_11ty/searchFilter.js");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false });

  eleventyConfig.addLayoutAlias("main", "layouts/main");
  eleventyConfig.addLayoutAlias("base", "layouts/base");
  eleventyConfig.addLayoutAlias("page", "layouts/page");
  eleventyConfig.addLayoutAlias("search", "layouts/search");
  eleventyConfig.addLayoutAlias("article", "layouts/article");
  eleventyConfig.addLayoutAlias("report", "layouts/report");

  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/**/*");

  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/kiri-vadivelu.jpg");
  eleventyConfig.addPassthroughCopy("./src/kiri-vadivelu-for-mayor.jpg");

  eleventyConfig.addFilter("search", searchFilter);

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/_11ty/imageShortcode").imageShortcode
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("iso8601", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addCollection("tagGroup", function (collectionApi) {
    return collectionApi.getFilteredByTags("news", "priority");
  });

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

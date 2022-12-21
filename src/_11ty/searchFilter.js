const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("description");
    this.addField("excerpt");
    this.setRef("id");
  });

  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      description: page.template.frontMatter.data.description,
      excerpt: page.template.frontMatter.data.excerpt,
    });
  });

  return index.toJSON();
};

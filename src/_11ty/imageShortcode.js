const Image = require("@11ty/eleventy-img");

const imageShortcode = async (
  relativeSrc,
  alt,
  className,
  widths = [null, 400, 800, 1200],
  formats = ["jpg"],
  sizes = "(min-width: 100px)"
) => {
  const imageMetadata = await Image(relativeSrc, {
    widths,
    formats,
    outputDir: "./_site/assets/images/generated/",
    urlPath: "/assets/images/generated/",
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  if (className) {
    imageAttributes["class"] = className;
  }

  return Image.generateHTML(imageMetadata, imageAttributes);
};

module.exports.imageShortcode = imageShortcode;

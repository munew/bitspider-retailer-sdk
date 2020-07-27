// jsdoc configuration - https://jsdoc.app/about-configuring-jsdoc.html
module.exports = {
  plugins: ["plugins/markdown"],
  recurseDepth: 10,
  source: {
    includePattern: ".+\\.js(doc|x)?$",
    excludePattern: "(^|\\/|\\\\)_",
  },
  sourceType: "module",
  tags: {
    allowUnknownTags: true,
    dictionaries: ["jsdoc", "closure"],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};

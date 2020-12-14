"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var code = "\n<template>\n  <div>\n    <prism>{{ code }}</prism>\n    <prism language=\"javascript\"></prism>\n  </div>\n</template>\n<script>\nimport Prism from 'vue-prismjs'\nimport 'prismjs'\nexport default {\n  data() {\n    return {\n      code: '<strong>html code</strong>',\n      otherCode: 'const foo = \"javascript code\"'\n    }\n  },\n  components: { Prism }\n}\n</script>\n\n";
var _default = code;
exports["default"] = _default;
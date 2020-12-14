"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _highlight = _interopRequireDefault(require("highlight.js"));

var _vue = _interopRequireDefault(require("vue"));

require("highlight.js/styles/color-brewer.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var install = function install(Vue) {
  Vue.directive('highlight', {
    deep: true,
    bind: function bind(el, binding) {
      // on first bind, highlight all targets
      var targets = el.querySelectorAll('code');
      targets.forEach(function (target) {
        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value;
        }

        console.log(12312);

        _highlight["default"].highlightBlock(target);
      });
    },
    componentUpdated: function componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      var targets = el.querySelectorAll('code');
      targets.forEach(function (target) {
        if (typeof binding.value === 'string') {
          target.textContent = binding.value;

          _highlight["default"].highlightBlock(target);
        }
      });
    }
  });
};

_vue["default"].use(install);

var _default = install;
exports["default"] = _default;
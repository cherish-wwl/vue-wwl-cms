"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

var _axios = _interopRequireDefault(require("axios"));

require("./utils/highlight");

var _src = _interopRequireDefault(require("../src"));

require("./mocks");

require("./common.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 使用 Vue.use 安装开发的组件库
_vue["default"].use(_src["default"]);

_vue["default"].prototype.$axios = _axios["default"];
_vue["default"].config.productionTip = false;
/* eslint-disable no-new */

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});
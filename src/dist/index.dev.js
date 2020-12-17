"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WButton", {
  enumerable: true,
  get: function get() {
    return _wButton["default"];
  }
});
Object.defineProperty(exports, "WInfiniteScroll", {
  enumerable: true,
  get: function get() {
    return _wInfiniteScroll["default"];
  }
});
Object.defineProperty(exports, "WWaterfall", {
  enumerable: true,
  get: function get() {
    return _wWaterfall["default"];
  }
});
Object.defineProperty(exports, "WInfiniteWater", {
  enumerable: true,
  get: function get() {
    return _wInfiniteWater["default"];
  }
});
exports["default"] = void 0;

var _wButton = _interopRequireDefault(require("./components/w-button"));

var _wInfiniteScroll = _interopRequireDefault(require("./components/w-infiniteScroll"));

var _wWaterfall = _interopRequireDefault(require("./components/w-waterfall"));

var _wInfiniteWater = _interopRequireDefault(require("./components/w-infiniteWater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var components = [_wButton["default"], _wInfiniteScroll["default"], _wWaterfall["default"], _wInfiniteWater["default"]]; // 官方原文：Vu\\e.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象

var install = function install(Vue) {
  components.forEach(function (component) {
    // Vue.component：注册或获取全局组件
    // Vue.component(component.name, component)
    Vue.use(component);
  });
}; // 在全局引入组件库时，使用 Vue.use 安装插件，必须提供 install 方法，这里 export default 就是用于 Vue.use


var _default = {
  install: install
};
exports["default"] = _default;
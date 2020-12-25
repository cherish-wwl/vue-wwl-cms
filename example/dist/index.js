"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var axios_1 = require("axios");
require("./utils/highlight");
var vue_wwl_cms_min_js_1 = require("../dist/vue-wwl-cms.min.js");
require("./mocks");
require("./common.css");
console.log('MyComponent', vue_wwl_cms_min_js_1["default"]);
// 使用 Vue.use 安装开发的组件库
vue_1["default"].use(vue_wwl_cms_min_js_1["default"]);
vue_1["default"].prototype.$axios = axios_1["default"];
vue_1["default"].config.productionTip = false;
var app = new vue_1["default"]({
    el: '#app',
    router: router_1["default"],
    components: { App: App_vue_1["default"] },
    template: '<App/>'
});
exports["default"] = app;

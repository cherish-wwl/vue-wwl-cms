"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
require("./utils/highlight");
var src_1 = require("../src");
require("./mocks");
require("./common.css");
// 使用 Vue.use 安装开发的组件库
vue_1["default"].use(src_1["default"]);
// Vue.prototype.$axios = axios
vue_1["default"].config.productionTip = false;
var app = new vue_1["default"]({
    el: '#app',
    router: router_1["default"],
    components: { App: App_vue_1["default"] },
    template: '<App/>'
});
exports["default"] = app;

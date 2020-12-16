"use strict";
exports.__esModule = true;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var axios_1 = require("axios");
require("./utils/highlight");
// import MyComponent from '../src'
require("./mocks");
require("./common.css");
// 使用 Vue.use 安装开发的组件库
// Vue.use(MyComponent)
vue_1["default"].prototype.$axios = axios_1["default"];
vue_1["default"].config.productionTip = false;
/* eslint-disable no-new */
new vue_1["default"]({
    el: '#app',
    router: router_1["default"],
    components: { App: App_vue_1["default"] },
    template: '<App/>'
});

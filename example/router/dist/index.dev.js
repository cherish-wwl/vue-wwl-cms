"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home"));

var _components = _interopRequireDefault(require("../components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/',
    name: 'home',
    component: _Home["default"],
    redirect: '/button',
    children: [{
      path: '/button',
      name: 'button',
      component: _components["default"].exampleButton
    }, {
      path: '/infinteScroll',
      name: 'infinteScroll',
      component: _components["default"].exampleInfinteScroll
    }, {
      path: '/waterfall',
      name: 'waterfall',
      component: _components["default"].exampleWaterfall
    }, {
      path: '/infinteWater',
      name: 'infinteWater',
      component: _components["default"].exampleInfinteWater
    }]
  }]
});

exports["default"] = _default;
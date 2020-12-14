"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infinteScroll = void 0;
var html = "\n<w-infiniteScroll style=\"height:200px;\" @loadMore=\"loadingMore\" :bottom=\"50\">\n  <ul>\n    <li class=\"demo-item\" v-for=\"i in count\" :key=\"i\">{{i}}</li>\n  </ul>\n</w-infiniteScroll>\n\n";
var html1 = "\n<w-infiniteScroll style=\"height:200px;\" disabled @loadMore=\"loadingMore1\">\n  <ul>\n    <li class=\"demo-item demo2\" v-for=\"i in count2\" :key=\"i\">{{i}}</li>\n  </ul>\n</w-infiniteScroll>\n\n";
var html2 = "\n<div v-infinite-scroll=\"loadingMore2\" :data-infinite-disabled='disabled' data-infinite-bottom=\"20\" style=\"height:200px; overflow-y:auto\">\n  <ul>\n    <li class=\"demo-item\" v-for=\"i in count3\" :key=\"i\">{{i}}</li>\n  </ul>\n</div>\n\n";
var html3 = "\n<div v-infinite-scroll=\"loadingMore2\" data-infinite-disabled='disabled' data-infinite-bottom=\"20\" style=\"height:200px; overflow-y:auto\">\n  <ul>\n    <li class=\"demo-item\" v-for=\"i in count3\" :key=\"i\">{{i}}</li>\n  </ul>\n</div>\n\n";
var infinteScroll = {
  html: html,
  html1: html1,
  html2: html2,
  html3: html3
};
exports.infinteScroll = infinteScroll;
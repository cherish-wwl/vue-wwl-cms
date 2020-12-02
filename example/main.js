// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import hljs from 'highlight.js/lib/core'
// import javascript from 'highlight.js/lib/languages/javascript'

import MyComponent from '../src'
import './mocks'
import './common.css'
import 'highlight.js/styles/github.css'

// hljs.registerLanguage('javascript', javascript)
Vue.use(hljs.vuePlugin)

// 使用 Vue.use 安装开发的组件库
Vue.use(MyComponent)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

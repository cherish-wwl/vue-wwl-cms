import Vue from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'
import './utils/highlight'
import MyComponent from '../dist/vue-wwl-cms.min.js'
import './mocks'
import './common.css'

console.log('MyComponent',MyComponent)
// 使用 Vue.use 安装开发的组件库
Vue.use(MyComponent)
Vue.prototype.$axios = axios
Vue.config.productionTip = false



const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default app

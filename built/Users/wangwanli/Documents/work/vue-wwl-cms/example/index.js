import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import axios from 'axios'
// import './utils/highlight'
// import MyComponent from '../src'
// import './mocks'
// import './common.css'
// 使用 Vue.use 安装开发的组件库
// Vue.use(MyComponent)
// Vue.prototype.$axios = axios
Vue.config.productionTip = false;
var app = new Vue({
    el: '#app',
    router: router,
    components: { App: App },
    template: '<App/>'
});
export default app;

//# sourceMappingURL=index.js.map

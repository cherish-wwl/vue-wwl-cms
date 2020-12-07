
import WButton from './components/w-button'
import WInfiniteScroll from './components/w-infiniteScroll'
import WWaterfall from './components/w-waterfall'
import WInfiniteWater from './components/w-infiniteWater'

const components = [
  WButton,
  WInfiniteScroll,
  WWaterfall,
  WInfiniteWater
]
// 官方原文：Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
const install = function (Vue) {
  components.forEach(component => {
    // Vue.component：注册或获取全局组件
    // Vue.component(component.name, component)
    Vue.use(component)
  })
}

// 在全局引入组件库时，使用 Vue.use 安装插件，必须提供 install 方法，这里 export default 就是用于 Vue.use
export default {
  install
}
export {
  WButton,
  WInfiniteScroll,
  WWaterfall,
  WInfiniteWater
}

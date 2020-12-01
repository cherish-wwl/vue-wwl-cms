import main from './src/main'
import wInfiniteDirective from './src/directive'
main.install = function (Vue) {
  Vue.component(main.name, main)
  Vue.directive(wInfiniteDirective.name, wInfiniteDirective)
}
export default main
export {
  wInfiniteDirective
}

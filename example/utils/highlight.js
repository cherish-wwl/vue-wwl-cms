import hljs from 'highlight.js'
import Vue from 'vue'
import 'highlight.js/styles/color-brewer.css'

const install = function (Vue) {
  Vue.directive('highlight', {
    deep: true,
    bind (el, binding) {
      // on first bind, highlight all targets
      let targets = el.querySelectorAll('code')

      targets.forEach(target => {
        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value
        }
        console.log(12312)
        hljs.highlightBlock(target)
      })
    },
    componentUpdated (el, binding) {
      // after an update, re-fill the content and then highlight
      let targets = el.querySelectorAll('code')
      targets.forEach(target => {
        if (typeof binding.value === 'string') {
          target.textContent = binding.value
          hljs.highlightBlock(target)
        }
      })
    }
  })
}

Vue.use(install)

export default install

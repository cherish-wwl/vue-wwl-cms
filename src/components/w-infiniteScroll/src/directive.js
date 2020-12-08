
import _ from 'lodash'

const attributes = {
  infiniteBottom: 0,
  infiniteDisabled: false
}

const scroll = function (cb, vm) {
  const { infiniteBottom, infiniteDisabled } = this.dataset

  const attrs = Object.assign({}, attributes, {
    infiniteBottom: Number(infiniteBottom),
    infiniteDisabled: (typeof vm[infiniteDisabled] === 'undefined') ? (infiniteDisabled === 'false' ? false : Boolean(infiniteDisabled)) : vm[infiniteDisabled]
  })
  // console.log('attrs', attrs)
  if (attrs.infiniteDisabled) return
  const { clientHeight, scrollTop, scrollHeight } = this
  if (clientHeight + scrollTop + attrs.infiniteBottom > scrollHeight) {
    cb()
  }
}
export default {
  name: 'InfiniteScroll',
  inserted (el, binding, node) {
    const loadingData = binding.value
    const container = el
    container &&
      container.addEventListener('scroll', _.debounce(scroll.bind(container, loadingData, node.context), 100))
  },
  unbind (el) {
    const container = el
    container && container.removeEventListener('scroll', scroll)
  }
}

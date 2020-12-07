<template>
  <div ref="scroll" class="w_infiniteScroll" >
    <slot></slot>
    <slot name="loading" v-if="!noMore">
      <div class="loading" >
        Loading
      </div>
    </slot>
    <slot name="noMore" v-if="noMore">
      <div class="noMore" >
        No More
      </div>
    </slot>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'WInfiniteScroll',
  props: {
    bottom: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    noMore: Boolean
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    scrollContent () {
      return this.$refs.scroll
    }
  },
  mounted () {
    // console.log(this.scrollContent)
    this.scrollContent && this.scrollContent.addEventListener('scroll', _.debounce(this.scroll, 100))
  },
  methods: {
    scroll () {
      if (this.disabled) return
      // console.log('可视区域高度', this.scrollContent.clientHeight, this.scrollContent.offsetHeight)
      // console.log('已滚动高度', this.scrollContent.scrollTop)
      // console.log('总区域高度', this.scrollContent.scrollHeight)
      const { clientHeight, scrollTop, scrollHeight } = this.scrollContent
      // console.log('scroll', clientHeight + scrollTop, scrollHeight - this.bottom)
      if (clientHeight + scrollTop >= scrollHeight - this.bottom) {
        this.loading = true
        this.$emit('loadMore', () => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style scoped>
.w_infiniteScroll{
  overflow-y: auto;
  height: 100%;
}
.loading, .noMore{
  text-align: center;
}
</style>

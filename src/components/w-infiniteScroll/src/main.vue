<template>
  <div ref="scroll" class="w_infiniteScroll">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WInfiniteScroll',
  props: {
    bottom: {
      type: Number,
      default: 0
    },
    disabled: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    scrollContent () {
      return this.$refs.scroll
    }
  },
  mounted () {
    // console.log(this.scrollContent)
    this.scrollContent && this.scrollContent.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll () {
      if (this.disabled) return
      // console.log('可视区域高度', this.scrollContent.clientHeight)
      // console.log('已滚动高度', this.scrollContent.scrollTop)
      // console.log('总区域高度', this.scrollContent.scrollHeight)
      const { clientHeight, scrollTop, scrollHeight } = this.scrollContent
      if (clientHeight + scrollTop + this.bottom > scrollHeight) {
        this.$emit('loadMore')
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
</style>

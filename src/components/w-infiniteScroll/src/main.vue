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
    container: {
      type: String,
      default: ''
    },
    bottom: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    noMore: Boolean
  },
  data () {
    return {
      loading: true,
      isMounted: false
    }
  },
  computed: {
    scrollContent () {
      if (!this.isMounted) return
      if (this.container) {
        let target = ''
        if (typeof this.container === 'object') {
          target = this.container.$el || this.container
        } else if (typeof this.container === 'string') {
          if (this.container === 'html' || this.container === 'window') {
            target = window
          } else {
            target = document.querySelectorAll(this.container)[0]
          }
        }
        return target
      }
      return this.$refs.scroll
    }
  },
  mounted () {
    this.isMounted = true
    this.$nextTick(() => {
      this.scrollContent.addEventListener('scroll', _.debounce(this.scroll, 100), true)
    })
  },
  methods: {
    scroll () {
      if (this.disabled) return
      let content = this.scrollContent
      if (!this.scrollContent.clientHeight) content = document.documentElement || document.body
      const { clientHeight, scrollTop, scrollHeight } = content
      if (clientHeight + scrollTop >= scrollHeight - this.bottom) {
        this.loading = true
        this.$emit('loadMore', () => {
          this.loading = false
        })
      }
    }
  },
  beforeDestroy () {
    this.scrollContent.scrollTop = 0
    this.scrollContent.removeEventListener('scroll', this.scroll)
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

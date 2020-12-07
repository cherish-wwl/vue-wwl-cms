<template>
  <w-infiniteScroll  @loadMore="loadingMore" :noMore="noMore" :bottom="bottom">
    <w-waterfall :list="list" :videoCover="videoCover" >
      <template slot-scope="{ item }">
        <slot :item="item"></slot>
      </template>
    </w-waterfall>
    <template v-slot:noMore>
      <slot name="noMore"></slot>
    </template>
    <template v-slot:loading>
      <slot name="loading"></slot>
    </template>
  </w-infiniteScroll>
</template>

<script>
import WInfiniteScroll from '../../w-infiniteScroll'
import WWaterfall from '../../w-waterfall'
export default {
  name: 'WInfiniteWater',
  props: {
    videoCover: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    WInfiniteScroll,
    WWaterfall
  },
  methods: {
    loadingMore () {
      console.log('iW')
      this.$emit('loadMore')
    }
  }
}
</script>

<style>

</style>

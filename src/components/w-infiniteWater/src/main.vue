<template>
  <w-infiniteScroll  @loadMore="loadingMore" :noMore="noMore" :bottom="bottom + ($refs.waterfall && $refs.waterfall.MinBottom || 0)" :container="container">
    <w-waterfall
      ref="waterfall"
      :list="list"
      :videoCover="videoCover"
      :imgBaseWidth="imgBaseWidth"
      :width="width"
      :gap="gap"
      :maxCols="maxCols"
      :bgap="bgap"
      :props="props" >
      <template slot-scope="{ item }">
        <slot :item="item"></slot>
      </template>
      <template v-slot:image="{ item }">
        <slot name="image" :item="item || {}"></slot>
      </template>
      <template v-slot:video="{ item }">
        <slot name="video" :item="item || {}"></slot>
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
    container: {
      type: String,
      default: ''
    },
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
    },
    imgBaseWidth: {
      type: Number,
      default: 270
    },
    width: { // 容器宽度
      type: Number
    },
    gap: {
      type: Number,
      default: 15
    },
    mgap: {
      type: Number,
      default: 8
    },
    maxCols: {
      type: Number,
      default: 5
    },
    bgap: {
      type: Number,
      default: 15
    },
    props: {
      type: Object,
      default () {
        return {
          id: 'id',
          title: 'title',
          content: 'content',
          image: 'image',
          video: 'video'
        }
      }
    }
  },
  components: {
    WInfiniteScroll,
    WWaterfall
  },

  methods: {
    loadingMore (cb) {
      if (this.$refs.waterfall.isPreloading) return
      this.$emit('loadMore')
      cb()
    }
  }
}
</script>

<style>
 ul{
   list-style: none;
 }
 img, video{
   width: 100%;
 }
</style>

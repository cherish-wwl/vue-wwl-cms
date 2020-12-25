<template>
  <div>
    <h1>WInfinteWater</h1>
    <br />
    <h3>基础用法</h3>
    <!-- <w-infiniteWater :list="list2" style="height:800px;" @loadMore="loadingMore" :noMore="noMore" :bottom="50">
    </w-infiniteWater> -->

    <br />
    <h3>无限滚动 + 瀑布流 + 视频 {{list3.length}}</h3>
    <w-infiniteWater :list="list3" container="html" :props="{ id: 'id',
          title: 'title',
          content: 'content',
          image: 'cover',
          video: 'video'}" @cardClick="cardClick" @loadMore="loadingVideo" videoCover :noMore="noMore1" :bottom="50" mode="video" >
      <template v-slot:image="{ item }">
        <img class="example-image" :src="item.cover"/>
      </template>
      <template v-slot:video="{ item }">
        <video class="example-video" :src="item.video"/>
      </template>
    </w-infiniteWater>

    <br />
  </div>
</template>

<script>
export default {
  name: 'example-waterfall',
  data () {
    return {
      list2: [],
      pagenum: 1,
      pagenum1: 1,
      pagesize: 10,
      noMore: false,
      list3: [],
      noMore1: false
    }
  },
  mounted () {
    this.$axios.get('/mock/waterfall', {params: {pagenum: this.pagenum, pagesize: this.pagesize}}).then(res => {
      this.list2 = res.data.data
      this.pagenum += 1
    })
    this.loadingVideo()
  },
  methods: {
    loadingMore () {
      if (this.noMore) return
      this.$axios.get('/mock/waterfall', {params: {pagenum: this.pagenum++, pagesize: this.pagesize}}).then(res => {
        console.log('loadingMore', this.pagenum, res.data.data)
        if (res.data.data.length < this.pagesize) {
          this.noMore = true
        }
        this.list2 = [...this.list2, ...res.data.data]
      })
    },
    loadingVideo () {
      if (this.noMore1) return
      this.$axios.get('/mock/waterfall/video', {params: {pagenum: this.pagenum1++, pagesize: this.pagesize}}).then(res => {
        console.log('loadingVideo', this.pagenum1, res.data.data)
        if (res.data.data.length < this.pagesize) {
          this.noMore1 = true
        }
        this.list3 = [...this.list3, ...res.data.data]
      })
    },
    cardClick (index, item) {
      console.log(index, item)
    }
  }

}
</script>

<style>

</style>

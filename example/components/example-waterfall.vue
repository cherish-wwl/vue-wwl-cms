<template>
  <div>
    <h1>WWaterfall</h1>
    <br />
    <h3>基础用法</h3>
    <br />
    <w-waterfall :list="list">
      <template slot-scope="{ item }">
        <div class="w_wf_inner">
          <div class="w_wf_image">
            <img :src="item.image" />
          </div>
          <div class="w_wf_detail dafda">
            <h3>123123{{item.title}}</h3>
            <p>123123123123{{item.content}}</p>
          </div>
        </div>
      </template>
    </w-waterfall>
    <br />
    <h3>无限滚动 + 瀑布流 </h3>
    <w-infiniteWater :list="list2" style="height:800px;" @loadMore="loadingMore" :noMore="noMore" :bottom="50">
      <template slot-scope="{ item }">
        <div class="w_wf_inner">
          <div class="w_wf_image">
            <img :src="item.image" />
          </div>
          <div class="w_wf_detail dafda">
            <h3>123123{{item.title}}</h3>
            <p>123123123123{{item.content}}</p>
          </div>
        </div>
      </template>
      <template v-slot:loading>
        loading1231231
      </template>
      <template v-slot:noMore>
        noMore  aaaaa
      </template>

    </w-infiniteWater>

    <br />
    <h3>无限滚动 + 瀑布流 + 视频</h3>
    <w-infiniteWater :list="list3" style="height:800px;" @loadMore="loadingVideo" videoCover :noMore="noMore1" :bottom="50" mode="video" />

    <!-- <w-infiniteScroll style="height:800px;" @loadMore="loadingMore" :noMore="noMore" :bottom="50">
      <w-waterfall :list="list2"></w-waterfall>
    </w-infiniteScroll> -->
    <br />
  </div>
</template>

<script>
import Login from '../../../../workspace/pc-miner/src/components/Login.vue'
export default {
  components: { Login },
  name: 'example-waterfall',
  data () {
    return {
      list: [],
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
      // console.log(res)
      this.list = res.data.data
      this.list2 = res.data.data
      this.pagenum += 1
    })
    this.loadingVideo()
  },
  methods: {
    loadingMore () {
      if (this.noMore) return
      this.$axios.get('/mock/waterfall', {params: {pagenum: this.pagenum, pagesize: this.pagesize}}).then(res => {
        console.log('loadingMore', this.pagenum, res.data.data)
        if (res.data.data.length < this.pagesize) {
          this.noMore = true
        }
        this.list2 = [...this.list2, ...res.data.data]
        this.pagenum += 1
      })
    },
    loadingVideo () {
      console.log('loadingVideo12312')
      if (this.noMore1) return
      this.$axios.get('/mock/waterfall/video', {params: {pagenum: this.pagenum1, pagesize: this.pagesize}}).then(res => {
        console.log('loadingVideo', this.pagenum1, res.data.data)
        if (res.data.data.length < this.pagesize) {
          this.noMore1 = true
        }
        this.list3 = [...this.list3, ...res.data.data]
        this.pagenum1 += 1
      })
    }
  }

}
</script>

<style>

</style>

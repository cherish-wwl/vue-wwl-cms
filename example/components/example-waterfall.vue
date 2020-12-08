<template>
  <div>
    <h1>WWaterfall</h1>
    <br />
    <h3>基础用法</h3>
    <br />
    <w-waterfall :list="list"></w-waterfall>
    <br />
  </div>
</template>

<script>
export default {
  name: 'example-infinteWater',
  data () {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10,
      noMore: false
    }
  },
  mounted () {
    this.$axios.get('/mock/waterfall', {params: {pagenum: this.pagenum, pagesize: this.pagesize}}).then(res => {
      console.log(res)
      this.list = res.data.data
      this.list2 = res.data.data
      this.pagenum += 1
    })
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
    }

  }

}
</script>

<style>

</style>

<template>
  <div>
    <h1>WWaterfall</h1>
    <br />
    <h3>基础用法</h3>
    <br />
    <w-waterfall :list="list"  videoCover :noMore="noMore"></w-waterfall>
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
    })
  }

}
</script>

<style>

</style>

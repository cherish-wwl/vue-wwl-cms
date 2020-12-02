<template>
  <div>
    <w-waterfall :list="list"></w-waterfall>
  </div>
</template>

<script>
export default {
  name: 'example-waterfall',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$axios.get('/mock/waterfall').then(res => {
      console.log(res)
      this.list = res.data.data
    })
  }
}
</script>

<style>

</style>

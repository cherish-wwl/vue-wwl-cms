<template>
  <div class="container h_100">
    <div class="aside h_100">
        <ul>
          <li v-for="item in routes" :key="item.name">
            <router-link :to="{name:item.name}">{{item.name}}</router-link>
          </li>
        </ul>
    </div>
    <div class="main h_100">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      routes: []
    }
  },
  created () {
    console.log(this.$router.options.routes)
    this.routes = this.$router.options.routes[0].children
  }
}
</script>
<style scoped>
.container{
  min-height: 100vh;
  padding: 20px;
}
.aside{
  width: 200px;
  float: left;
}
.main{
  margin-left: 200px;
  /* overflow: hidden; */
}
</style>

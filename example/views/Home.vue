<template>
  <div class="container" :class="{isOpen:isOpen}">
    <div class="aside" >
      <div class="inner">
        <div class="menu">
          <ul>
            <li v-for="item in routes" class="section" :key="item.name">
              <router-link :to="{name:item.name}">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <header class="mobile-menu">
        <span @click="isOpen=!isOpen" >{{isOpen ? '收起':'展开'}}</span>
      </header>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isOpen: false,
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
  background-color: #f7f7f6;
  overflow-x: hidden;
}
.aside{
  width: 200px;
  float: left;
}
.main{
  margin-left: 200px;
  /* overflow: hidden; */
}
.mobile-menu{
  display: none;
}
.section{
 text-transform: capitalize
}

@media screen and (max-width:768px) {
  .mobile-menu{
    display: block;
  }
  .aside{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    pointer-events: none;
  }
  .aside .inner{
    transform: translate3d(-300px,0, 0);

    height: 100%;

    transition:  transform .3s;
  }
  .aside .inner .menu {
    opacity: 0;
    transition: opacity 0s linear .3s;
    padding: 20px;
        height: 100%;
  }
  .main{
    transform: translate3d(-200px,0,0);
    transition: transform .3s;
    width: 100%;
  }
  .isOpen .aside .inner{
    transform: translateZ(0);
  }
  .isOpen .aside .inner .menu {
    background-color: blanchedalmond;

    opacity: 1;

    transition: opacity .3s linear .2s;
  }
  .isOpen .main{
    position: relative;
    transform: translateX(0);
    width: 100%;
  }

}
</style>

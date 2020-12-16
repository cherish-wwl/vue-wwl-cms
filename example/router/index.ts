import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Button from '../components/example-button.vue'
import cmsp from '../components'
Vue.use(Router)
console.log('cmsp', cmsp)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/button',
      children: [
        {
          path
          : '/button',
          name: 'button',
          component: cmsp.exampleButton
        },
        {
          path: '/infinteScroll',
          name: 'infinteScroll',
          component: cmsp.exampleInfinteScroll
        },
        {
          path: '/waterfall',
          name: 'waterfall',
          component: cmsp.exampleWaterfall
        },
        {
          path: '/infinteWater',
          name: 'infinteWater',
          component: cmsp.exampleInfinteWater
        }
      ]
    }
  ]
})

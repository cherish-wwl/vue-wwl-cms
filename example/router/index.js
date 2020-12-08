import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import cmsp from '../components'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/button',
      children: [
        {
          path: '/button',
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

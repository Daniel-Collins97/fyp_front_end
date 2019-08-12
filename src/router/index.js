import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Stats from '@/components/Stats';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {title: 'Home'}
    },
    {
      path: '/Stats',
      name: 'Statistics',
      component: Stats,
      meta: {title: 'Stats'}
    }
  ]
})

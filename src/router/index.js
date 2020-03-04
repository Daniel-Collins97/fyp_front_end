import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import Stats from '@/components/Stats';
import Users from '@/components/Users';
import Games from '@/components/Games';
import UserView from '@/components/UserView';
import StatsView from '@/components/StatsView';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/Stats',
      name: 'Statistics',
      component: Stats,
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users
    },
    {
      path: '/Games',
      name: 'Games',
      component: Games,
    },
    {
      path: '/User-View',
      name: 'UserView',
      component: UserView,
      props: route => ({ ctx: route.params.ctx }),
    },
    {
      path: '/Stats-View',
      name: 'Statistics View',
      component: StatsView,
      props: route => ({ctx: route.params.ctx }),
    }
  ]
})

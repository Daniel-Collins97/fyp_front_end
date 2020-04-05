import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import Stats from '@/components/Stats';
import Users from '@/components/Users';
import Games from '@/components/Games';
import UserView from '@/components/UserView';
import StatsView from '@/components/StatsView';
import AddUser from '@/components/AddUser';
import AddGame from '@/components/AddGame';

Vue.use(Router)

const router = new Router({
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
      path: '/Add-User',
      name: 'AddUser',
      component: AddUser,
    },
    {
      path: '/Add-Game',
      name: 'AddGame',
      component: AddGame,
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
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    // eslint-disable-next-line no-undef
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // eslint-disable-next-line no-undef
  NProgress.done()
})

export default router

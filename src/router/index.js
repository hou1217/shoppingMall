import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'

import Detail from '@/views/Detail'

import Fail from '@/views/Fail'
import Login from '@/views/Login'
import md5 from 'js-md5'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home/:type',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: Detail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/fail',
      name: 'Fail',
      component: Fail,
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      redirect: '/home/recommend?category=推荐',
    },

  ]
})



export default router
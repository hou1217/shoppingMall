import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Detail from '@/views/Detail'
import Fail from '@/views/404'


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
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/404',
      name: '404',
      component: Fail,
    },
    {
      path: '/',
      meta: { redirect: true }
    },
    {
      path: '*',
      redirect: '/404'
    }

  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.redirect){
    next('/home/recommend?category=推荐')
  }else{
    next()
  }
})


export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import home from '../components/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/home',
      component: home
    }
  ]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    next('/login')
  } else {
    next()
  }
})

export default router

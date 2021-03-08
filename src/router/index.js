import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import home from '../components/home'
import welcome from '../components/welcome/welcome'
import users from '../components/users/users'
import rightsList from '../components/rights/rightsList'
import role from '../components/rights/role'

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
      component: home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: welcome
      }, {
        path: '/users',
        component: users
      }, {
        path: '/rights',
        component: rightsList
      }, {
        path: '/roles',
        component: role
      }]

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

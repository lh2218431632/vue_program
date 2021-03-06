import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import echarts from 'echarts'

import axios from 'axios'
// 在发送请求前，要在请求头上加上服务器的token
axios.interceptors.request.use(obj => {
  obj.headers.Authorization = window.sessionStorage.getItem('token')
  return obj
})
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

Vue.config.productionTip = false
Vue.prototype.$http = axios// 配置全局axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

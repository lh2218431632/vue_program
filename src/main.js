import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/login'

Vue.config.productionTip = false
Vue.prototype.$http = axios// 配置全局axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

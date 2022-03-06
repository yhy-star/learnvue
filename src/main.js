import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 一次性导入svg图片
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("assets/imgs", true, /\.svg$/)
requireAll(req)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

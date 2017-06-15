// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import App from './App'
import router from './router'
import store from './store'

import './assets/stylus/index.styl'

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})

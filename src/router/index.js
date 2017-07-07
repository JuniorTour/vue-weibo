import Vue from 'vue'
import Router from 'vue-router'
//引入主要页面。'@'的路径设置，见build/webpack.base.conf.js
// import Login from '@/pages/Login/Login.vue'
import Home from '@/pages/Home/Home.vue'
import Message from '@/pages/Message/Message.vue'
import Discovery from '@/pages/Discovery/Discovery.vue'
import Me from '@/pages/Me/Me.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: '', //2.5.0+新增的一个类，暂时设为空，详见：http://router.vuejs.org/en/api/router-link.html
  linkActiveClass: 'active-tab',
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/discovery',
      name: 'Discovery',
      component: Discovery
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})

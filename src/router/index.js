import Vue from 'vue'
import Router from 'vue-router'
//引入主要页面。'@'的路径设置，见build/webpack.base.conf.js
import Login from '@/pages/Login/Login.vue'
import NotFound from '@/pages/404/404.vue'
import Home from '@/pages/Home/Home.vue'
import Message from '@/pages/Message/Message.vue'
import Discovery from '@/pages/Discovery/Discovery.vue'
import Me from '@/pages/Me/Me.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active-tab',
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    // 因组件结构的原因，登录页和404页面没有放在App.vue下，
    //  而是通过prod-server.js的设置（第16行）做成了独立的一个页面
    {
      path: '',
      name: 'Login',
      title: '登录',
      component: Login
    },
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
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

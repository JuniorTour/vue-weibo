<template>
  <div id="app">
    <top-header></top-header>
    <div class="tab-group">
      <div class="tab">
        <router-link to="/home">首页</router-link>
        <router-link to="/message">消息</router-link>
        <router-link to="/discovery">发现</router-link>
        <router-link to="/me">我</router-link>
      </div>
    </div>
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    'top-header': header
  },
  watch: {
    '$route' (to, from) {
        //用数组的索引标记路由的深度
      const routerOrder = ['/home', '/message', '/discovery', '/me']
      const toDepth = routerOrder.indexOf(to.path)
      const fromDepth = routerOrder.indexOf(from.path)

      // 参考vue-router官方文档，根据路由深度，来判断是该从右侧进入还是该从左侧进入
      this.transitionName = toDepth < fromDepth ? 'slide-to-left' : 'slide-to-right'
    }
  }
}
</script>

<style lang="stylus">
  /*路由跳转动画*/
  .slide-to-left-enter-active,.slide-to-right-leave-active,.slide-to-left-leave-active,.slide-to-right-enter-active
    transition all .2s linear
  .slide-to-left-enter,.slide-to-left-leave
    transform translate(-100%)
  .slide-to-right-enter,.slide-to-right-leave
    transform translate(100%)

  #app
    color: red
    a
      color: #000

  .home
    background-color blue
  .message
    background-color red
  .discovery
    background-color green
  .me
    background-color yellow
</style>

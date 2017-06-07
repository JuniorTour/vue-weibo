<template>
  <div id="app">
    <top-header></top-header>
    <div class="tab-group">
        <router-link to="/home" class="tab">首页</router-link>
        <router-link to="/message" class="tab">消息</router-link>
        <router-link to="/discovery" class="tab">发现</router-link>
        <router-link to="/me" class="tab">我</router-link>
    </div>
    <div class="main-content">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
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
    /*opacity 0*/
    transform translate(-100%)
  .slide-to-right-enter,.slide-to-right-leave
    /*opacity 0*/
    transform translate(100%)

  #app
    .tab-group
      width 100%
      margin-bottom 10px
      background-color #f5f5f5
      -webkit-box-shadow 0 1px 2px rgba(0,0,0,.15)
      box-shadow 0 1px 2px rgba(0,0,0,.15)
      display -wbekit-flex
      display flex
      /*flex-flow nowrap row*/
      z-index 1
      .tab
        flex 1
        display: block
        font-size: .875rem
        font-weight:700
        text-align center
        line-height: 40px
        color: #5d5d5d
        position: relative
      .active-tab
        color #ff8200
        font-size: .9275rem
        &:before
          content ' '
          width 100%
          height 2px
          background-color: #ff8200;
          position: absolute
          bottom 0
          left 0
          z-index 2

  .home
    background-color blue
  .message
    background-color red
  .discovery
    background-color green
  .me
    background-color yellow
</style>

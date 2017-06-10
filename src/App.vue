<template>
  <div id="app">
    <div class="head-part">
      <top-header></top-header>
      <div class="tab-group">
        <router-link to="/home" class="tab">首页</router-link>
        <router-link to="/message" class="tab">消息</router-link>
        <router-link to="/discovery" class="tab">发现</router-link>
        <router-link to="/me" class="tab">我</router-link>
      </div>
    </div>
    <div class="main-body">
      <transition :name="transitionName">
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
    transition all .3s ease-out
  /*进入的组件什么也不做，只是保持透明，准备替代离开的组件。*/
  .slide-to-left-enter,.slide-to-left-enter-active
    opacity 0
  /*离开的元素向左过渡位移离开，并逐渐透明。*/
  .slide-to-left-leave-active
    transform translate(-80%)
    opacity 0

  .slide-to-right-enter,.slide-to-right-enter-active
    opacity 0
  .slide-to-right-leave-active
    transform translate(80%)
    opacity 0
    /*仍有bug，当向右滑动时，页面会自动变宽。
    用给父元素声明overflow hidden解决了。*/

  body
    background-color #f2f2f2
  #app
    .head-part
      position: fixed
      top 0
      left 0
      width:100%
      z-index 20
    .tab-group
      width 100%
      max-width 100%
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

    .main-body
      padding 94px 0 0 0
      position relative
      overflow hidden
      .home
        /*background-color blue*/
      .message
        background-color red
      .discovery
        background-color green
      .me
        background-color yellow
</style>

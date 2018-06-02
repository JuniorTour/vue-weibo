<template>
  <div id="app">
    <div class="head-part" v-show="!hideHeadPart">
      <top-header @toUpdateWeibo="updateWeibo()"></top-header>
      <div class="tab-group">
        <router-link to="/home" class="tab">首页</router-link>
        <router-link to="/message" class="tab">消息</router-link>
        <router-link to="/discovery" class="tab">发现</router-link>
        <router-link to="/me" class="tab">我</router-link>
      </div>
    </div>
    <div class="main-body">
      <transition :name="transitionName">
        <router-view ref="home"
                     @hideAppAddTip="hideAddTip"></router-view>
      </transition>
    </div>
    <div v-show="showAddTip" class="add-to-home-tip txt-cut">
      <i class="close-add-tip-icon" @click.prevent="hideAddTip()">×</i>
      <section class="icon-block"></section>
      <span>添加到主屏幕，不会迷路哦~</span>
    </div>
  </div>
</template>

<script>
import header from './components/header/header.vue'

export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-left',
      pageVerticalPos: 0,
      showAddTip: (!this.isStandAlone && !this.isWebView())
    }
  },
  components: {
    'top-header': header
  },
  watch: {
    '$route' (to, from) {
        // 用数组的索引标记路由的深度
      const routerOrder = ['/home', '/message', '/discovery', '/me']
      const toDepth = routerOrder.indexOf(to.path)
      const fromDepth = routerOrder.indexOf(from.path)

      //  根据路由深度来判断该显示哪个方向的过渡动画
      this.transitionName = toDepth < fromDepth ? 'slide-to-left' : 'slide-to-right'
    }
  },
  methods: {
    updateWeibo() {
      //参考：https://cn.vuejs.org/v2/guide/components.html#子组件索引
      this.$refs.home.updateContent()
      /*这种方法确实可行，但个人感觉不是很优雅。
       文档里也提到：“$refs 只在组件渲染完成后才填充，并且它是非响应式的。
       它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。”，

       不知道还有没有更优雅的方式？*/
    },
    isStandAlone() {
      return navigator.standalone !== undefined ? navigator.standalone : false;
    },
    isWebView() {
      // BUG 微信微博的webview还是没判断出来。。。
      /*Done.
      After debug, I found it is caused by the computed property - isWebView.
      Due to some reason, personally I think is the cache of computed property,
      the value is wrong during page render stage,
      so the data prop depend on the isWebView will get wrong value during the page is rendering too.

      After change it to method, the isWebView doesn't have cache, so that the value will be right,
      even in the reder stage.*/
      let userAgent = window.navigator.userAgent.toLowerCase();
      let isWechat = /MicroMessenger/i.test(userAgent),
        isWeibo = /WeiBo/i.test(userAgent)

      return (isWechat || isWeibo);
    },
    hideAddTip() {
      this.showAddTip = false
    }
  },
  computed: {
    hideHeadPart() {
      return this.$route.path === '/';
    }
  }
}
</script>

<style lang="stylus">

  // https://css-tricks.com/intro-to-vue-5-animations/
  /*Now, we could just use <transition> out of the box.
  This will give us a v- prefix for some transition hooks we can use in our CSS.
  1. It will offer enter/leave which is the position that the animation starts with on the first frame,
  2. enter-active/leave-active while the animation is running- this is the one you’d place the animation properties themselves on,
  3. and enter-to/leave-to, which specifies where the element should be on the last frame.*/

  /* Vue.js 过渡之我的理解
  1. Vue.js 的过渡将元素处理为 5 个状态：默认状态、进入中和离开中、进入后状态和离开后状态。
  2. 默认状态，即v-enter 和 v-leave 通常不需要设置，会默认利用该元素初始的状态。
  3. 进入后状态和离开后状态，即v-enter-to 和 v-leave-to 才是我们通常需要关注之处，
      这两个状态分别声明设置了元素进入动画/过渡后的最后一帧和离开后的最后一帧。
  4. 进入中和离开中，即v-enter-active 和 v-leave-active，这两个状态包含了动画/过渡触发的全过程，
      即这两个类会在动画/过渡触发的全过程存在于元素上，故通常用来声明transition和animation属性。*/

  /*路由跳转动画*/
.slide-to-left-enter-active
  transition all .3s ease-out .2s
.slide-to-left-leave-active
  transition all .3s ease-out

.slide-to-left-enter
  transform translate(-80%)
  opacity 0
.slide-to-left-leave-to
  transform translate(80%)
  opacity 0

// 为了便于理解，我在此处没有合并这两个过渡
.slide-to-right-enter-active
  transition all .3s ease-out .2s
.slide-to-right-leave-active
  transition all .3s ease-out

.slide-to-right-enter
  transform translate(80%)
  opacity 0
.slide-to-right-leave-to
  transform translate(-80%)
  opacity 0

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
    display flex
    z-index 1
    overflow hidden
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

  .add-to-home-tip
    position: fixed
    bottom 10px
    left 50%
    transform: translateX(-50%)
    font-size: .9275rem
    background-color #f8f8f8
    text-align: center
    line-height: 50px
    padding 0 10px 0 60px
    border: 1px solid #d2caca
    border-radius 5px
    z-index: 21
    overflow visible
    .close-add-tip-icon
      width: 18px
      line-height: 18px
      font-size: 16px
      position: absolute
      top 0
      right 0
    .icon-block
      width 40px
      height 40px
      background url("../static/img/favicon-min.jpg") 0 0 / contain no-repeat
      border-radius 5px
      position: absolute
      top 5px
      left 10px
    &:after
      content ''
      width 0
      height 0
      border solid rgba(0,0,0,0)
      border-width 10px
      border-top-color #d2caca
      position: absolute
      bottom -21px
      left 50%
      transform: translateX(-11px)
</style>

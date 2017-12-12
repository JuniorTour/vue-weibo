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
    <div class="main-body" v-show="!switchPicViewer">
      <transition :name="transitionName">
        <router-view ref="home" @hideAppAddTip="hideAddTip()"></router-view>
      </transition>
    </div>
    <picture-viewer v-show="switchPicViewer"></picture-viewer>
    <div v-show="showAddTip" class="addToHomeTip txt-cut">
      <i class="close-add-tip-icon" @click.prevent="hideAddTip()">x</i>
      <section class="icon-block"></section>
      <span>添加到主屏幕，不会迷路哦~</span></div>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import pictureViewer from './components/pictureViewer/pictureViewer.vue'

export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-left',
      pageVerticalPos: 0,
      // 通过navigator.standalone判断是否是主屏访问
      showAddTip: navigator.standalone !== undefined ? !navigator.standalone : false
    }
  },
  components: {
    'top-header': header,
    'picture-viewer': pictureViewer
  },
  watch: {
    '$route' (to, from) {
        // 用数组的索引标记路由的深度
      const routerOrder = ['/home', '/message', '/discovery', '/me']
      const toDepth = routerOrder.indexOf(to.path)
      const fromDepth = routerOrder.indexOf(from.path)

      //  根据路由深度来判断该显示哪个方向的过渡动画
      this.transitionName = toDepth < fromDepth ? 'slide-to-left' : 'slide-to-right'
    },
    switchPicViewer: function (val, oldVal) {
      if (val === false) {
        this.resetPagePos()
      } else if (val === true) {
        this.pageVerticalPos = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      }
    }
  },
  methods: {
    resetPagePos() {
      // TODO change components, no reset.
      this.$nextTick(function () {
        window.scrollTo(0, this.pageVerticalPos)
      })
    },
    updateWeibo() {
      //参考：https://cn.vuejs.org/v2/guide/components.html#子组件索引
      this.$refs.home.updateContent()
      /*这种方法确实可行，但个人感觉不是很优雅。
       文档里也提到：“$refs 只在组件渲染完成后才填充，并且它是非响应式的。
       它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。”，

       不知道还有没有更优雅的方式？*/
    },
    hideAddTip() {
      this.showAddTip = false
    }
  },
  computed: {
    switchPicViewer() {
      return this.$store.state.switchPicViewer
    },
    hideHeadPart() {
//      debugger
      return this.$route.path === '/'
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
    transform translate(80%)
    opacity 0

  .slide-to-right-enter,.slide-to-right-enter-active
    opacity 0
  .slide-to-right-leave-active
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

  .addToHomeTip
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
      font-size: 12px
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

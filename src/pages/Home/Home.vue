<template>
  <div class="home">
    <loading v-show="topIsLoading"></loading>

    <picture-viewer v-show="switchPicViewer"></picture-viewer>

    <comment-window
      v-if="showCommentWindow"
      @closeCommentWindow="closeCommentWindow"></comment-window>

    <div class="content-tip no-text-select" v-show="noNew">
      <span>这会儿还没有新微博，等会再来刷刷看吧(｡･ω･｡)！</span>
    </div>
    <div class="top-tip" v-if="hasTopTip">
      <a class="to-top-tip">
        <i class="iconfont icon-hot"></i>
        <p class="top-tip-content txt-cut">{{topTip.text}}<i class="iconfont icon-right-arrow"></i></p>
      </a>
    </div>
    <div class="card" v-for="(item,index) in weiboContent.card_group">
      <div class="card-main">
        <header class="card-header">
          <div class="header-bg" v-if="typeof item.mblog.cardid!=='undefined'"></div>
          <a class="avatar" :href="item.mblog.user.profile_url">
            <div class="avatar-wrapper border-around-1px">
              <img class="avatar-img" :src="item.mblog.user.profile_image_url">
              <i class="iconfont" :class="calculateVerifiedClass(item.mblog.user.verified_type)"></i>
            </div>
          </a>
          <div class="user-info">
            <a :href="item.mblog.user.profile_url" class="user-name txt-l txt-cut">{{item.mblog.user.screen_name}}</a>
            <div class="publish-data txt-xs">
              <span class="publish-created-at">{{item.mblog.created_at}}</span>
              <span class="publish-source">来自{{item.mblog.source}}</span>
            </div>
          </div>
          <a class="card-operate">
            <i class="iconfont icon-down-arrow"></i>
          </a>
        </header>
        <section class="card-body">
          <p class="default-content" v-html="item.mblog.text"></p>
          <div v-if="item.mblog.pics.length===1" class="single-pic">
            <img :src="item.mblog.pics[0].url">
          </div>
          <ul v-if="item.mblog.pics.length>=2" class="pic-list">
            <li v-for="(eachPic,index) in item.mblog.pics" @click="openPicViewer(eachPic.url)"><img :src=eachPic.url></li>
          </ul>
          <div class="retweet" v-if="item.mblog.retweeted_status!==undefined">
            <p>
              <a :href="item.mblog.retweeted_status.user.profile_url"
                 class="retweet-user">@{{item.mblog.retweeted_status.user.screen_name}}</a>：{{item.mblog.retweeted_status.text}}
          </p>
            <div v-if="item.mblog.retweeted_status.pics.length===1" class="single-pic">
              <img :src="item.mblog.retweeted_status.pics[0].url"
                   @click="openPicViewer(item.mblog.retweeted_status.pics[0].url)">
            </div>
            <ul v-if="item.mblog.retweeted_status.pics.length>=2" class="pic-list">
              <li v-for="(eachPic,index) in item.mblog.retweeted_status.pics"><img :src=eachPic.url></li>
            </ul>
          </div>
        </section>
      </div>
      <footer class="card-footer border-1px border-top-1px txt-s no-text-select">
        <a class="forward"
              @click.prevent="openCommentWindow()">
          <i class="iconfont icon-forward"></i>
          {{item.mblog.reposts_count}}
        </a>
        <i class="separate-line"></i>
        <a class="comment"
             @click.prevent="openCommentWindow()">
          <i class="iconfont icon-comment"></i>
          {{item.mblog.comments_count}}
        </a>
        <i class="separate-line"></i>
        <a class="like" @click.prevent="likeIt($event, item)" :class="{'liked': item.mblog.favorited===true}">
          <i class="iconfont icon-like"></i>
          {{item.mblog.attitudes_count}}
        </a>
      </footer>
    </div>
    <transition name="like"
                           v-on:before-enter="beforeLikeEnter"
                           v-on:enter="likeEnter"
                           v-on:after-enter="afterLikeEnter">
      <div class="like-animation-wrapper" v-show="showLikeAnimationWrapper">
        <i class="iconfont icon-like"></i>
      </div>
    </transition>
    <loading v-show="bottomIsLoading"></loading>
    <div class="content-tip no-text-select" v-show="noMore" @click="updateContent()">
      <span>没有更多微博了QAQ，点我刷新看看吧！</span>
      <a class="iconfont icon-refresh"></a>
    </div>
  </div>
</template>

<script>
  import loading from '../../components/loading/loading.vue'
  import commentWindow from '../../components/commentWindow/commentWindow.vue'
  import pictureViewer from '../../components/pictureViewer/pictureViewer.vue'

  export default {
    name: 'home',
    data(){
      return {
        //要使用实例的属性，需要在这初始化声明
        hasTopTip: false,
        topTip: {},
        weiboContent: {},
        showPicViewer: this.$store.state.switchPicViewer,
        pagePos: 0,
        topIsLoading: true,
        bottomIsLoading: false,
        noMore: false,
        noNew: false,
        showLikeAnimationWrapper: false,
        clickedLikeBtnPos: {
          pageX: 0,
          pageY: 0
        },
        showCommentWindow: false
      }
    },
    components: {
      loading,
      'comment-window': commentWindow,
      'picture-viewer': pictureViewer
    },
    created() {
      this.$http.get('apis/weibo-content?targetCursor=1', {id: 0}).then(res => {
        /*res.body.data和res.data.data，哪一个才是最佳实践？
        * .body 是vue-resource 的API，res.data未知？*/
        if (res.body.errorNum !== 0) {
          console.log('Get data error at created()!')
          return;
        }
        this.weiboContent = res.data.data  //微博的所有内容

        let tempTopTip = res.data.data.card_group[0]
        if (tempTopTip.mod_type === 'mod/clientTopTips') {
          this.topTip = res.data.data.card_group.shift()
          this.hasTopTip = true
        }
        this.bottomIsLoading = true
        setTimeout(() => {
          //故意推迟，以展示加载动画效果
          this.topIsLoading = false
        }, 600)
      })

      this.addScrollEvent()
    },
    methods: {
      calculateVerifiedClass: function (verifiedType) {
        let tempOutcome = ''
        switch (verifiedType) {
          case -1:
            tempOutcome = 'no-verified'
            break
          case 0:
            tempOutcome = 'icon-yellow-v'
            break
          case 1:
            tempOutcome = 'icon-blue-v'
            break
        }
        return tempOutcome
      },
      openPicViewer(targetPicUrl) {
//        this.$store.commit('disableBodyScroll');
        this.$store.commit('openPicViewer', {targetPicUrl: targetPicUrl})
      },
      addScrollEvent() {
        // 监听滚动事件，判断是否接近页面，触发加载旧微博
        /*可以通过以下两句分别对比使用事件防抖前后的事件触发次数：*/
        //window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('scroll', this.myDebounce(this.handleScroll, 500))
      },
      handleScroll() {
        let pageHeight = Math.max(document.documentElement.clientHeight,
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight)

        let windowScrollHeight = window.scrollY || window.pageYOffset
        if (windowScrollHeight + window.innerHeight > pageHeight - 100) {
          this.hideAppAddTip()
          this.getContent()
        }
      },
      getContent() {
        let nextCursor = this.weiboContent.next_cursor
        if (nextCursor !== -1) {
          let targetUrl = '/apis/weibo-content' + '?targetCursor=' + nextCursor
          this.$http.get(targetUrl).then((res) => {
            if (res.body.errorNum === 0) {
              //把已有的微博和加载的旧微博合并
              this.weiboContent.card_group = this.weiboContent.card_group.concat(res.data.data.card_group)
              // 更新下一个目标的id，用于后续更新
              this.weiboContent.next_cursor = res.data.data.next_cursor
            } else {
              console.log('getContent() error!')
            }
          })
        } else {
          this.noMore = true
          this.bottomIsLoading = false
        }
      },
      updateContent() {
        this.topIsLoading = true
        this.hideAppAddTip()
        this.scrollToTop()

        let previousCursor = this.weiboContent.previous_cursor
        if (previousCursor !== -1) {
          let targetUrl = '/apis/weibo-content' + '?targetCursor=' + previousCursor
          this.$http.get(targetUrl).then((res) => {
            if (res.body.errorNum === 0) {
              // console.log('res.data.data.card_group = ', res.data.data.card_group)
              //把新的微博和已有的微博合并
              let _this = this
              this.weiboContent.card_group = res.data.data.card_group.concat(_this.weiboContent.card_group)
              this.weiboContent.previous_cursor = res.data.data.previous_cursor
              //故意延迟消失，以展示效果
              setTimeout(() => {
                this.topIsLoading = false
              }, 500)
            } else {
              console.log('updateContent() error!')
            }
          })
        } else {
          setTimeout(() => {
            this.noNew = true
            this.topIsLoading = false
          }, 500)
          setTimeout(() => {
            this.noNew = false
          }, 3000)
        }
      },
      scrollToTop() {
        window.scrollTo(0, 0)
      },
      myDebounce(func, wait) {
        let timeout;
        return function () {
          clearTimeout(timeout)
          timeout = setTimeout(func, wait)
          /*一个事件发生wait毫秒后，不再触发该事件，才执行相应的处理函数。*/
        }
      },
      likeIt(e, item) {
        // 保存点击位置，用于设置动画块的起始位置：
        this.clickedLikeBtnPos.pageX = e.pageX - parseInt(window.scrollX)
        this.clickedLikeBtnPos.pageY = e.pageY - parseInt(window.scrollY)

        if (item.mblog.favorited === false) {
          //显示点赞动画：
          this.showLikeAnimationWrapper = true
          // 点赞数+1，并设置为已经赞了的状态
          /* vm.$set( target, key, value ) 用于设置对象的属性。
          如果对象是响应式的，确保属性被创建后也是响应式的，
          同时 **“触发视图更新” **。
          这个方法主要用于避开 Vue 不能检测属性被添加的限制。*/
          this.$set(item.mblog, 'attitudes_count', item.mblog.attitudes_count + 1)
          this.$set(item.mblog, 'favorited', true)
        } else {
          this.$set(item.mblog, 'attitudes_count', item.mblog.attitudes_count - 1)
          this.$set(item.mblog, 'favorited', false)
        }
      },
      beforeLikeEnter(el) {
        /*在动画块呈现之前，将其位置设置到点赞开始的位置上：*/
        el.style.transform = 'scale(0.1)'
        el.style.top = this.clickedLikeBtnPos.pageY + 'px'
        el.style.left = this.clickedLikeBtnPos.pageX + 'px'
      },
      likeEnter(el, done) {
        /* eslint-disable no-unused-vars*/
        /*TODO:Figure out 很奇怪！必须要触发一次重绘才能实现位置移动的过渡效果？？？*/
        let rf = el.offsetHeight
        el.style.transform = 'scale(1)'
        el.style.top = '190px'
        el.style.left = '50%'
        done()
      },
      afterLikeEnter(el) {
        //动画结束后，隐藏该动画块（需要enter钩子中调用done()）：
        this.showLikeAnimationWrapper = false
      },
      hideAppAddTip() {
        this.$emit('hideAppAddTip')
      },
      preventBgScroll() {
        // setTimeout(0) to avoid flash when the page scroll to top
        setTimeout(() => {
          this.$store.commit('storePagePos');
          this.$store.commit('disableBodyScroll');
        }, 0)
      },
      allowBgScroll () {
        setTimeout(() => {
          this.$store.commit('enableBodyScroll');
          this.$store.commit('restorePagePos');
        }, 0)
      },
      openCommentWindow() {
        /*TODO:BUG Prevent scrolling when overlaid. (Headache!!!)
        Read the 23 in ../../notes/Summary-of-experience for detail.*/
        this.preventBgScroll();
        this.showCommentWindow = true;
      },
      closeCommentWindow() {
        this.allowBgScroll();
        this.showCommentWindow = false;
      }
    },
    computed: {
      switchPicViewer() {
        return this.$store.state.switchPicViewer;
      }
    }
  }
</script>

<style scoped lang="stylus">
.top-tip
  width 100%
  background-color #fed
  .to-top-tip
    height 2.75em
    display: flex
    align-items: center
    padding-left .75rem
    .icon-hot
      color: #ff8200
      margin-top -5px
      font-size: 22px
    .top-tip-content
      font-size: .875rem
      color: #FF8200;
      padding 0 .6875rem
      line-height: 1.5rem
      .iconfont
        margin-left: .5rem
        font-size: 0.775rem

.card-main:active
  background-color #ebebeb

.card-header
  display: flex
  .header-bg
    background-image url("../../../static/img/card-header-bg-headline.png")
    width: 100%
    height: 60px
    background-repeat: no-repeat
    background-position: top right
    background-size: 100% auto
    position: absolute
    top -4px
    left 0
  .avatar
    margin .75rem 0 .5rem .75rem
    display flex
    position relative
    .avatar-img
      width 2.125rem
      height 2.125rem
      border-radius 50%
      vertical-align top
      display block
    .no-verified
      display none
    .icon-yellow-v,.icon-blue-v
      position: absolute
      right: -.125rem
      bottom: -.125rem

.user-info
  max-width 16rem
  display: flex
  justify-content center
  flex-direction column
  padding: .6875rem .6875rem 0
  line-height: 1rem
  .user-name
    color #333
  .publish-data
    color #929292
    .publish-source
      padding-left .5rem

.card-operate
  position: absolute
  top: 0
  right: 0
  width: 3.75rem
  height: 3.375rem
  &:active
    background-color #ebebeb
  .icon-down-arrow
    position: absolute
    top .5rem
    right .5rem


.card-body
  padding: .25rem .75rem .625rem
  line-height 1.35rem
.pic-list
  margin-top .4375rem
  width: 15.5rem
  overflow hidden
  & li
    float: left
  & img
    width 4.75rem
    height 4.75rem
    margin-right .25rem

.single-pic
  margin-top .3125rem
  max-height 12.5rem
  overflow hidden
  text-align left
  & img
    width: 11.25rem
    vertical-align top

.retweet
  padding: .625rem
  margin .4375rem -.75rem -.75rem
  background-color #f7f7f7

.card-footer
  width: 100%
  display: flex
  align-items center
  background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#dadada),color-stop(50%,#dadada),color-stop(50%,rgba(0, 0, 0, 0)))
  background-image: -webkit-linear-gradient(top,#dadada 0,#dadada 50%,rgba(0, 0, 0, 0) 50%)
  background-image: linear-gradient(to bottom, #dadada 0, #dadada 50%, rgba(0, 0, 0, 0) 50%)
  /*从上到下，在1px的高度之中，从#dadada开始，直到0.5px时，将剩余的下半部分0.5px设置为透明，
  从而实现视觉上的0.5px。*/
  -webkit-background-size: 100% 1px
  background-size: 100% 1px
  background-repeat: no-repeat
  background-position: top
  & > a
    color #929292
    flex:1
    text-align center
    padding: .375rem 0
    display: inline-block
    height: 1.5rem
    line-height: 1.5rem
    &:active
      background-color #ebebeb


.liked
  color red !important

.like-animation-wrapper
  width: 50px
  height 50px
  line-height 50px
  text-align center
  color: #ff8200
  background-color: #f5f5f5
  border: 1px solid #eee
  border-radius 50%
  position: fixed
  transition all .3s linear
  margin-left -25px
  .icon-like
    font-size 32px

.content-tip
  width 100%
  text-align center
  min-height 50px
  margin-bottom .5625rem
  &:active
    background-color #ebebeb
  span
    display inline-block
    font-size .75rem
    line-height 19px
    color #7c7c7c
    margin 14px 0

.like-enter-to
  // like动画最后一帧，即结束时，给图标添加上转动的动画
  animation: like-rotate .8s .4s

@keyframes like-rotate {
  0% {
    transform: rotate(30deg)
  }
  20% {
    transform: rotate(-30deg)
  }
  40% {
    transform: rotate(30deg)
  }
  60% {
    transform: rotate(0deg)
  }
}

@media (min-width: 600px) {
  // m.weibo.com没有很完美的解决微博卡片标题背景挂件比例失调的问题，
  // 只是在大屏幕下粗暴的隐藏掉了。
  // 相比之下，我认为下面这个方法虽然多了一些代码，但至少没有因噎废食。
  .card-header .header-bg {
    background-size 50%
  }
}
</style>

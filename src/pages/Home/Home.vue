<template>
  <div class="home">
    <div class="top-tip" v-if="hasTopTip">
      <a href="#" class="to-top-tip">
        <i class="iconfont icon-huo"></i>
        <a class="top-tip-content txt-cut">{{topTip.text}}<i class="iconfont icon-xiangyoujiantou"></i></a>
      </a>
    </div>
    <div class="card" v-for="(item,index) in weiboContent.card_group">
      <header class="card-header">
        <a class="avatar" :href="item.mblog.user.profile_url">
          <div class="avatar-wrapper border-1px">
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
          <i class="iconfont icon-xiangxiajiantou"></i>
        </a>
      </header>
      <section class="card-body">
        <p class="default-content">{{item.mblog.text}}</p>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return {
        //要使用实例的属性，需要在这初始化声明
        topTip: {},
        weiboContent: {},
        hasTopTip: false
      }
    },
    /*此处也可以在mounted之中用$nextTick调用methods的方法，来初始化weiboContent。详见 http://dwz.cn/65ocqi
     * 但我个人结合生命周期图认为，created早于mounted，用于初始化视图，应该首选created！*/
    created() {
      /*https://segmentfault.com/q/1010000006915580
       * 放在目录里并不意味能通过http访问。
       * 要么另起web服务serve这个目录，要么放在static目录里，因为dev-server对该目录文件实现了http访问。*/
      // this.$http.get('static/data/weibo-content.json', {id: 0}).then(res => {
      //等价于：
      this.$http.get('apis/weibo-content', {id: 0}).then(res => {
        /*res.body.data和res.data.data，哪一个才是最佳实践？*/
        if (res.body.errorNum !== 0) {
          console.log('Get data error!')
          return;
        }
        this.weiboContent = res.data.data  //微博的所有内容
        console.log('this.weiboContent:', this.weiboContent)
        let tempTopTip = res.data.data.card_group[0]
        if (tempTopTip.mod_type === 'mod/clientTopTips') {
          this.topTip = res.data.data.card_group.shift() //公告是card_group[0]，用shift方法弹出
          this.hasTopTip = true
          console.log('this.topTip:', this.topTip)
        }
        console.log('card_group:', this.weiboContent.card_group)
      })
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
        console.log('verifiedType : ' + tempOutcome)
        return tempOutcome
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
    .icon-huo
      color: #f00
      margin-top -5px
      font-size: 20px
    .top-tip-content
      font-size: .875rem
      color: #FF8200;
      padding 0 .6875rem
      .iconfont
        font-size: 0.775rem;  //iconfont没选好，文字对不齐

.card-header
  display: flex

.card a
  color: #598abf
.card
  width 100%
  background-color #fff
  margin-bottom .5625rem
  position: relative
  .avatar
    margin .75rem 0 .5rem .75rem
    display flex
    position relative;
    .avatar-wrapper
      position: relative
      &:before
        /*border-1px-hack
        http://jinlong.github.io/2015/05/24/css-retina-hairlines/*/
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        border: .0625rem solid #e4e4e4;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        /*width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;*/
    & .avatar-img
      width 2.125rem
      border-radius 50%
      vertical-align top
      display block
    .no-verfied
      display none
    .icon-yellow-v,.icon-blue-v
      position: absolute;
      right: -.125rem;
      bottom: -.125rem;
  .user-info
    max-width 16rem /*避免名字过长*/
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
    .icon-xiangxiajiantou
      position: absolute
      top .5rem
      right .5rem

.card-body
  padding: .25rem .75rem .625rem
</style>

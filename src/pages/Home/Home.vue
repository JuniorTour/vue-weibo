<template>
  <div class="home">
    <div class="top-tip">
    <i class="iconfont icon-huo"></i>
    <span class="top-tip-content">{{topTip.text}}</span>
    <i class="iconfont icon-xiangyoujiantou"></i>
    </div>
    <div class="card" v-for="(item,index) in weiboContent.card_group">
      <div class="user-name">{{item.mblog.text}}</div>
      <h2>{{index}}</h2>
      <!--<div class="card-header">-->
      <!--<div class="avatar">-->
      <!--<img :src="item.mblog.user.profile_image_url">-->
      <!--<i class="iconfont" :class="verifiedType"></i>-->
      <!--</div>-->
      <!--<div class="user-name">{{item.mblog.user.screen_name}}</div>-->
      <!--<div class="publish-time">{{item.mblog.created_at}}</div>-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
//    mounted: function () {
//      console.log('mounted!')
//      this.contentInitiate()
//    },
    data(){
      return {
        //要使用实例的属性，需要在这初始化声明
        topTip: {},
        weiboContent: {}
      }
    },
    /*此处也可以在mounted之中用$nextTick调用methods的方法，来初始化weiboContent。详见 http://dwz.cn/65ocqi
     * 但我个人结合生命周期图认为，created早于mounted，用于初始化视图，应该首选created！*/
    created() {
      /*https://segmentfault.com/q/1010000006915580
       * 放在目录里并不意味能通过http访问。
       * 要么另起web服务serve这个目录，要么放在static目录里，因为dev-server对该目录文件实现了http访问。*/
//        this.$http.get('static/data/weibo-content.json', {id: 0}).then(res => {
      this.$http.get('apis/weibo-content', {id: 0}).then(res => {
//          console.log(res)
        /*res.body.data和res.data.data，哪一个才是最佳实践？*/
        if (res.body.errorNum !== 0) {
          console.log('Data get error!')
          return;
        }
        this.topTip = res.data.data.card_group.shift() //公告是card_group[0]，用shift方法弹出
        this.weiboContent = res.data.data  //微博的内容在card_group[1]及之后
        console.log('this.weiboContent:')
        console.log(this.weiboContent)
        console.log('card_group:')
        console.log(this.weiboContent.card_group)
        console.log('this.topTip:')
        console.log(this.topTip)
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>

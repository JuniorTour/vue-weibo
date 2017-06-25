<template>
  <div class="header">
    <div v-if="pagePos==='Home'" class="user-and-group">
      <p class="user-title txt-cut">帅到被人砍___</p>
      <i class="iconfont icon-down-arrow"></i>
    </div>
    <div v-if="pagePos==='Message'" class="msg-header">
      <h1>消息</h1>
    </div>
    <div class="icon-group">
      <a class="iconfont icon-compose"></a>
      <a class="iconfont icon-search"></a>
      <a v-if="pagePos==='Home'" class="iconfont icon-refresh"></a>
      <a v-if="pagePos==='Message'" class="iconfont icon-msg"></a>
      <a v-if="pagePos==='Me'" class="iconfont icon-gear"></a>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'header',
    computed: {
      //值须为函数
      pagePos() {
        return this.$store.state.pagePos
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    width:100%
    height 44px
    line-height 44px
    color #333
    background-color #fff

    .user-and-group
      max-width 40%
      position relative
      float: left
      padding 0 12px

      .user-title
        font-size 1.125rem

      .icon-down-arrow
        font-size: .8215rem
        color: #f07c10;
        position absolute
        top 0
        right -8px

    .icon-group
      float: right;
      /*padding 0 12px*/
      a.iconfont
        vertical-align: top
        display inline-block
        width: 46px
        font-size: 22px
        height: 44px
        line-height: 44px
        color: #444
        text-align: center
        &:active
          background-color #ebebeb
</style>

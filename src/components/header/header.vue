<template>
  <div class="header">
    <div v-show="pageName==='Home'" class="user-and-group">
      <p class="user-title txt-cut">帅到被人砍___</p>
      <i class="iconfont icon-down-arrow"></i>
    </div>
    <div v-show="pageName!=='Home'" class="common-header">
      <h1>{{processPageName}}</h1>
    </div>
    <div class="icon-group">
      <a class="iconfont icon-compose"></a>
      <a class="iconfont icon-search"></a>
      <a v-show="pageName==='Home'" class="iconfont icon-refresh" @click.prevent="updateContent()"></a>
      <a v-show="pageName==='Message'" class="iconfont icon-msg"></a>
      <a v-show="pageName==='Me'" class="iconfont icon-gear"></a>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'header',
    methods: {
      updateContent() {
        this.$emit('toUpdateWeibo')
      }
    },
    computed: {
      pageName() {
        return this.$route.name
      },
      processPageName() {
        let ret = this.$route.name
        switch (ret) {
          case 'Message':
            ret = '消息'
            break;
          case 'Discovery':
            ret = '发现'
            break;
          case 'Me':
            ret = '我'
            break;
        }
        return ret
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
    overflow hidden
    .common-header
      display: inline-block
      color #5d5d5d
      background-image url("../../../static/img/favicon.png")
      background-repeat no-repeat
      background-size 29px auto
      background-position 12px 9px
      padding-left 50px

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

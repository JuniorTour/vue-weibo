<template>
  <div class="header">
    <div class="user-and-group">
      <p class="user-title txt-cut">JuniorTour</p>
      <i class="iconfont icon-xiangxiajiantou"></i>
    </div>
    <div class="icon-group">
      <a class="iconfont icon-xie"></a>
      <a class="iconfont icon-sousuo"></a>
      <a class="iconfont icon-shuaxin"></a>
    </div>
  </div>
</template>

<script>
export default{}
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

      .icon-xiangxiajiantou
        font-size: .8215rem
        color: #f07c10;
        position absolute
        top 0
        right -8px

    .icon-group
      float: right;
      /*padding 0 12px*/
      a.iconfont
        display inline-block
        width: 46px
        font-size: 22px
        height: 44px
        line-height: 44px
        color: #444
        text-align: center
</style>

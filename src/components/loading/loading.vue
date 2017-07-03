<template>
  <div class="loading">
    <span>加载中...</span>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  .loading
    width 100%
    text-align center
    min-height 50px
    span
      display inline-block
      font-size .75rem
      line-height 19px
      color #7c7c7c
      background-image url("../../../static/img/loading.gif")
      background-repeat no-repeat
      background-size 19px auto
      padding-left 25px
      margin 14px 0
</style>

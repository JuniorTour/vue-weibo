<template>
<div class="picture-viewer">
  <div class="picture-window">
    <img src="../../../static/img/eg-img/red-apricot-min.jpeg">
  </div>
  <div class="picture-ctrl-bar">
    <button class="close-viewer">关闭</button>
    1/1
    <button class="viewer-zan-button"><i class="iconfont icon-like"></i>999{{likeNum}}</button>
  </div>
</div>
</template>

<script>

</script>

<style scoped lang="stylus">
.picture-viewer
  color: #fff
  display: flex
  align-items: center
  & button
    width:72px
    height 32px
    line-height 30px
    text-align center
    font-size: 16px
    color #fff
    background-color rgba(128,128,128,.4)
    border none
    border-radius 2px

.picture-window img
    max-width 100%

.picture-ctrl-bar
  width: 100%
  box-sizing border-box
  text-align center
  line-height 1
  position: absolute
  bottom 30px
  left 0
  padding 0 15px
  .close-viewer
    float: left
  .viewer-zan-button
    float: right
</style>

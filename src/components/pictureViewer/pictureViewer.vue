<template>
<div class="picture-viewer">
  <div class="picture-window">
    <img src="../../../static/img/eg-img/green-shade-min.jpg">
  </div>
  <div class="picture-ctrl-bar">
    <button class="close-viewer" @click.prevent="closePictureViewer">关闭</button>
    1/1


    <button class="viewer-zan-button"><i class="iconfont icon-like"></i>999</button>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  //Use as a event bus:
  export default new Vue({
    name: 'pictureViewer',
    data() {
      return {}
    },
    methods: {
      closePictureViewer: function () {
        this.$emit('switchPicViewer')
      }
    }
  })
</script>

<style scoped lang="stylus">
.picture-viewer
  background-color #000
  position: absolute
  z-index 100
  top 0
  right 0
  bottom 0
  left 0
  color #fff
  display flex
  align-items center
  & button
    width 72px
    height 32px
    line-height 30px
    text-align center
    font-size 16px
    color #fff
    background-color rgba(128,128,128,.4)
    border none
    border-radius 2px

.picture-window img
    max-width 100%

.picture-ctrl-bar
  width 100%
  box-sizing border-box
  text-align center
  line-height 2rem
  position absolute
  bottom 30px
  left 0
  padding 0 15px
  .close-viewer
    float left
  .viewer-zan-button
    float right
</style>

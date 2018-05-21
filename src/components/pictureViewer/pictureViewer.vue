<template>
<div class="picture-viewer">
  <div class="picture-window">
    <img :src="targetPicUrl">
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
  import AlloyFinger from 'alloyfinger'
  import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
  Vue.use(AlloyFingerVue, { AlloyFinger: AlloyFinger });

  export default {
    name: 'pictureViewer',
    methods: {
      closePictureViewer() {
        this.$store.commit('enableBodyScroll');
        this.$store.commit('closePicViewer')
      }
    },
    computed: {
      targetPicUrl(){
        return this.$store.state.viewTargetPicUrl
      }
    }
  }
</script>

<style scoped lang="stylus">
.picture-viewer
  background-color #000
  position: fixed
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
    line-height 32px
    text-align center
    font-size 16px
    color #fff
    background-color rgba(128,128,128,.4)
    padding 0
    border none
    border-radius 2px

.picture-window
  width: 100%
  img
    max-width 100%
    width: 100%

.picture-ctrl-bar
  width 100%
  box-sizing border-box
  text-align center
  line-height 2rem
  position fixed
  bottom 30px
  left 0
  padding 0 15px
  .close-viewer
    float left
  .viewer-zan-button
    float right
</style>

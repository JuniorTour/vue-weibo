<template>
  <div class="comment-window-container">
    <header>
      <div class="header-part left-header">
        <span @click.prevent="closeCommentWindow()">×</span>
      </div>
      <div class="middle-header">
        <span>{{title}}</span>
      </div>
      <div class="header-part right-header">
        <button class="btn btn-sm btn-orange">发送</button>
      </div>
    </header>
    <div class="comment-main-body input-wrapper">
      <textarea name="main-textarea"
                id="main-input-textarea"
                cols="30"
                rows="10"
                placeholder="眼见何事，情系何方，身在何处，心思何人..."
                :value="content"></textarea>
    </div>
    <!--<footer>-->
      <!--<div>This is footer.</div>-->
    <!--</footer>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '评论',
      content: ''
    }
  },
  methods: {
    closeCommentWindow() {
      this.$emit('closeCommentWindow');
    }
  }
}
</script>

<style scoped lang="stylus">
.comment-window-container
  background-color #fff
  position: fixed;
  top 0
  left 0
  bottom 0
  right 0
  z-index: 999

header
  box-sizing border-box
  width: 100%;
  height: 48px;
  line-height: 16px
  padding: .65625rem .6rem;
  text-align: center;
  display: flex;
  justify-content space-between
  align-items: center;
  .header-part
    flex 1
  .left-header
    font-size: 26px;
    text-align left
  .right-header
    text-align: right

#main-input-textarea
  border none
  outline none
  resize: none;
  width: 100%;
  font-size: 1rem;
  margin-top: .65625rem;

.comment-main-body
  /*overflow-y: auto;*/
  padding: 0 .6rem;
  -webkit-overflow-scrolling:touch;

footer
  text-align: center;

</style>

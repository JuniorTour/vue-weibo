<template>
  <div class="message">
    <div class="data-content">
      <section class="card-list">
        <div class="msg-card border-1px border-bottom-1px">
          <a class="msg-icon-btn at-icon-wrapper">
            <i class="iconfont icon-at"></i>
          </a>
          <a class="msg-box txt-cut">
            <h3 class="txt-xl">@我的</h3>
          </a>
          <span class="msg-right-arrow">
          <i class="iconfont icon-right-arrow"></i>
        </span>
        </div>
        <div class="msg-card border-1px border-bottom-1px">
          <a class="msg-icon-btn at-icon-wrapper">
            <i class="iconfont icon-at"></i>
          </a>
          <a class="msg-box txt-cut">
            <h3 class="txt-xl">@我的</h3>
          </a>
          <span class="msg-right-arrow">
          <i class="iconfont icon-right-arrow"></i>
        </span>
        </div>
        <div class="msg-card border-1px border-bottom-1px">
          <a class="msg-icon-btn at-icon-wrapper">
            <i class="iconfont icon-at"></i>
          </a>
          <a class="msg-box txt-cut">
            <h3 class="txt-xl">@我的</h3>
          </a>
          <span class="msg-right-arrow">
          <i class="iconfont icon-right-arrow"></i>
        </span>
        </div>
        <div class="msg-card border-1px border-bottom-1px">
          <a class="msg-icon-btn at-icon-wrapper">
            <i class="iconfont icon-at"></i>
          </a>
          <a class="msg-box txt-cut">
            <h3 class="txt-xl">@我的</h3>
          </a>
          <span class="msg-right-arrow">
          <i class="iconfont icon-right-arrow"></i>
        </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'message',
    data() {
      return {
        weiboMsg: {}
      }
    },
    created() {
      this.$http.get('apis/weibo-msg', {id: 1}).then(res => {
        if (res.body.errorNum !== 0) {
          console.log('Get data error!')
          return
        }
        this.weiboMsg = res.data.data  //微博的所有内容
        console.log('this.weiboMsg : ', this.weiboMsg)
      })
    }
  }
</script>

<style scoped lang="stylus">
  .msg-card
    display: flex
    background-color #fff

  .msg-icon-btn
    display: block
    width 3rem
    height 3rem
    line-height: 3rem
    text-align: center
    margin: .5rem 0 .5rem .5rem
    .icon-at
      color: #fff
      font-size: 28px

  .at-icon-wrapper
    background-color #5bb4da

  .msg-box
    display: flex
    flex 1
    width: 100%
    flex-direction column
    justify-content center
    overflow: hidden
    padding .5rem .6875rem
    .txt-xl
      color: #333

  .msg-right-arrow
    display: flex
    align-items: center
    margin-right .75rem

</style>

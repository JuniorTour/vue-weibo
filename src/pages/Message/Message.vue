<template>
  <div class="message">
    <loading v-show="isLoading"></loading>
    <div class="data-content">
      <section class="card-list">
        <div v-ripple v-for="(item, index) in msgGroup" class="avatar-card border-1px border-bottom-1px">
          <a v-if="item.user===undefined" class="msg-icon-btn" :class="item.type+'-icon-wrapper'">
            <i class="iconfont" :class="'icon-'+item.type"></i>
          </a>
          <a v-else="" class="card-avatar">
            <img :src="item.user.avatar_large">
          </a>
          <a v-if="item.user===undefined"  class="avatar-card-content txt-cut">
            <h3 v-if="item.title" class="txt-xl mct-a txt-cut">{{item.title}}</h3>
          </a>
          <a v-else=""  class="avatar-card-content txt-cut">
            <h3 class="txt-xl mct-a txt-cut">{{item.user.screen_name}}</h3>
            <p class="sub-text txt-m mct-d txt-cut">{{item.text}}</p>
          </a>
          <span v-if="item.display_arrow===1" class="plus-content">
            <i class="iconfont icon-right-arrow"></i>
          </span>
          <span v-else="" class="plus-content">
            <span class="created-at txt-s mct-d">{{item.created_at}}</span>
            <i v-if="item.unread>0" class="unread-num">{{item.unread}}</i>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import loading from '../../components/loading/loading.vue'

  export default {
    name: 'message',
    data() {
      return {
        weiboMsg: {},
        msgGroup: {},
        isLoading: true
      }
    },
    components: {
      loading
    },
    created() {
      this.$http.get('apis/weibo-msg', {id: 1}).then(res => {
        if (res.body.errorNum !== 0) {
          console.log('Get data error!')
          return
        }
        this.weiboMsg = res.data.data  //微博的所有内容
        this.msgGroup = res.data.data.card_group
//        console.log('this.msgGroup : ', this.msgGroup)
        setTimeout(() => {
          //故意推迟，以显示加载动画效果
          this.isLoading = false
        }, 1000)
      })
    }
  }
</script>

<style scoped lang="stylus">
  .msg-icon-btn
    display block
    width 3rem
    height 3rem
    line-height 3rem
    text-align center
    margin .5rem 0 .5rem .5rem
    .iconfont
      color #fff
      font-size 28px

  .at-icon-wrapper
    background-color #5bb4da
  .comments-icon-wrapper
    background-color #35b87f
  .good-icon-wrapper
    background-color #ffa200
  .box-icon-wrapper
    background-color #5b99ee

  .created-at
    width 5rem
    position absolute
    top 15px
    right 7px
  .unread-num
    display inline-block
    min-width 1rem
    height 1rem
    line-height 1rem
    background-color #fe6431
    font-size 9px
    text-align center
    color #fff
    border-radius 50%
    margin 20px 7px 0 0
</style>

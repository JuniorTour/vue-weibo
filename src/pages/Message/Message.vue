<template>
  <div class="message">
    <loading v-show="isLoading"></loading>
    <div class="data-content">
      <section class="card-list">
        <div v-for="(item, index) in msgGroup"
             class="border-1px border-bottom-1px">
          <!--将需要隐藏的操作按钮放置在html中靠前的位置，同时通过相对定位将后续的元素从普通文档流中脱离出来，
          便可以优雅地实现覆盖的效果，而不用借助z-index的声明-->
          <div v-if="item.user!==undefined" class="control-block-wrapper">
            <div class="delete-btn" @click.stop="deleteMsg(item)">
              <p>删除</p>
            </div>
          </div>
          <div class="avatar-card main-msg-wrapper"
               v-ripple
               :class="{swiped: item.isSwiped}"
               v-finger:tap="tap.bind(this, item)"
               v-finger:swipe="swipe.bind(this, item)">
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

        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import loading from '../../components/loading/loading.vue'

  import Vue from 'vue'
  import AlloyFinger from 'alloyfinger'
  import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
  Vue.use(AlloyFingerVue, { AlloyFinger: AlloyFinger });

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
        this.weiboMsg = res.data.data
        this.msgGroup = res.data.data.card_group
        setTimeout(() => {
          //故意推迟，以显示加载动画效果
          this.isLoading = false
        }, 1000)
      })
    },
    methods: {
      tap(item, evt) {
        this.$set(item, 'isSwiped', false)
      },
      swipe (item, evt) {
        if (evt.direction === 'Left' && item.user !== undefined) {
          this.$set(item, 'isSwiped', true)
        }
      },
      deleteMsg (targetMsg) {
        this.msgGroup.splice(this.msgGroup.indexOf(targetMsg), 1)
      }
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

.main-msg-wrapper
  position: relative;
  transition: all .1s linear;
  &.swiped
    transform: translateX(-56px);

.control-block-wrapper
  width: 56px
  height:100%
  position: absolute;
  top 0
  right 0
  .delete-btn
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #f00;
    color: #fff;
    line-height: 64px;
</style>

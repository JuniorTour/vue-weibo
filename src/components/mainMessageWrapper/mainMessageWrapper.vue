<template>
  <div class="msg-box-wrapper">
    <!--将需要隐藏的操作按钮放置在html中靠前的位置，同时通过相对定位将后续的元素从普通文档流中脱离出来，
    便可以优雅地实现覆盖的效果，而不用借助z-index的声明-->
    <div v-if="item.user!==undefined" class="control-block-wrapper">
      <div class="delete-btn" @click.stop="deleteMsg(item)">
        <p>删除</p>
      </div>
    </div>
    <!-- Render as other elements with the 'tag' prop -->
    <v-touch class="avatar-card main-msg-wrapper"
         tag="div"
         v-ripple
         :enabled="item.user!==undefined"
         v-bind:style="{transform: 'translateX(' + swipedDistX + 'px)'}"
         v-on:pan="onPan"
         v-bind:pan-options="{ direction: 'horizontal', threshold: 15 }"
         v-on:panend="onPanEnd.call(this, $event, item)"
         @tap="onTap">
      <!--threshold:	Minimal pan distance required before recognizing.-->
      <a v-if="item.user===undefined" class="msg-icon-btn" :class="item.type+'-icon-wrapper'">
        <i class="iconfont" :class="'icon-'+item.type"></i>
      </a>
      <a v-else="" class="card-avatar">
        <img :src="item.user.avatar_large">
      </a>
      <a v-if="item.user===undefined" class="avatar-card-content txt-cut">
        <h3 v-if="item.title" class="txt-xl mct-a txt-cut">{{item.title}}</h3>
      </a>
      <a v-else="" class="avatar-card-content txt-cut">
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
    </v-touch>
  </div>
</template>

<script>
export default {
  name: 'main-message-wrapper',
  data() {
    return {
      controlBlockWidth: 56,
      swipedDistX: 0,
      prevDir: 2,
      timer: {}
    }
  },
  props: ['item'],
  methods: {
    updateEleStyle(func) {
      // 借助该API可以实现更为流畅的样式更新
      requestAnimationFrame(func);
    },
    onPan(evt) {
      /* 滑动直到显示出删除按钮，本函数触发次数：
       * AlloyFinger：                             10-60 （受滑动速度影响），视觉上能看到滑动时明显的卡顿。
       * 换成hammer.js后：                    10-40，滑动卡顿减轻了，但还是有。
       * requestAnimationFrame后：    10-30，视觉上非常流畅。*/

//      this.swipedDistX = parseInt(evt.deltaX);    // 直接更新样式，卡顿比较明显，不推荐

      /*BUG swiftly vertically pan will get a wrong deltaX in PC Chrome.
      * Only on PC, mobile is fine.*/
//      if (evt.deltaY >= 5 || evt.deltaY <= -5) {
//        return;
//      }

      let targetPos = evt.deltaX;
      // 模拟滑动越界时的阻力效果
      if (targetPos < -(this.controlBlockWidth)) {
        targetPos = Math.floor(targetPos / 5 - this.controlBlockWidth);
      }
      if (targetPos > 0) {
        targetPos = Math.floor(targetPos / 8);
      }

      this.updateEleStyle(() => {
        this.swipedDistX = targetPos;
      });
    },
    onPanEnd(evt, item) {
      let targetPos = 0;
      if (this.swipedDistX < -(this.controlBlockWidth / 2)) {
        targetPos = -(this.controlBlockWidth);
      } else {
        targetPos = 0;
      }

      this.updateEleStyle(() => {
        this.swipedDistX = targetPos;
      });
    },
    onTap(evt) {
      if (this.swipedDistX !== 0) {
        this.updateEleStyle(() => {
          this.swipedDistX = 0;
        });
      }
    },
    deleteMsg(targetItem) {
      this.$emit('deleteMsg', targetItem);
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
    z-index 9

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

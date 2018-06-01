<template>
<div class="me">
  <div class="profile-card card">
    <div class="avatar-card border-1px border-bottom-1px" v-ripple>
      <a class="card-avatar">
        <img src="../../../static/img/avatar/my-weibo-avatar.jpg">
      </a>
      <a class="avatar-card-content txt-cut">
        <h3 class="txt-s mct-a txt-cut">
          帅到被人砍___
          <section class="vip-icon-block">
          <i class="iconfont icon-crown"></i>
          <i class="iconfont icon-right-arrow"></i>
        </section>
        </h3>
        <p class="sub-text txt-s mct-d txt-cut">简介：春日游，杏花吹满头。</p>
      </a>
      <span class="plus-content">
          <i class="iconfont icon-right-arrow"></i>
      </span>
    </div>
    <footer class="avatar-card-footer no-text-select">
      <a class="box-col able-to-active">
        <p>90</p>
        <p>微博</p>
      </a>
      <i class="separate-line"></i>
      <a class="box-col able-to-active">
        <p>130</p>
        <p>关注</p>
      </a>
      <i class="separate-line"></i>
      <a class="box-col able-to-active">
        <p>26</p>
        <p>粉丝</p>
      </a>
    </footer>
  </div>
  <div class="card-line-group rubberBand"
           :class="{'intro-highlighted': toHighlightIntroStat}">
    <div class="intro-tooltip-wrapper caret-bottom"
             v-if="toShowStatIntro">
      <h2>看看这个项目的访问量吧~~</h2>
    </div>
    <section
      class="card-line card-4"
      @click.prevent="openStatCard()">
      <a>
        <i class="iconfont icon-friends"></i>
        <div class="content">统计</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
    <transition name="fade">
      <div
          class="statistics-card-wrapper"
          v-if="showStatCard"
          @click.self="closeStatCard()">
        <div class="statistics-card">
          <div class="close-btn" @click.stop="closeStatCard()">×</div>
          <h2>近况</h2>
          <h3>
            访问：
          </h3>
          <h3 class="total-visit-num" @click.stop="changeNum()">
            <i class="iconfont icon-famous-people"></i>
            {{animatedTotalVisit}}
            <span class="unit-char">次</span>
          </h3>
          <h3>
            时间：
          </h3>
          <p style="text-align: center;">{{statisticsData.start}} 至 {{statisticsData.end}}</p>
          <h3>
            最近：
          </h3>
          <div class="table-wrapper">
            <table class="ip-table">
              <thead>
              <tr>
                <td>IP</td>
                <td>时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="IP in statisticsData.recentIP">
                <td>{{IP.split(' - ')[0]}}</td>
                <td>{{IP.split(' - ')[1]}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-level"></i>
        <div class="content">微博等级<span class="mct-b txt-xs">Lv9</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-album"></i>
        <div class="content">我的相册<span class="mct-b txt-xs">(8)</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-collect"></i>
        <div class="content">我的收藏<span class="mct-b txt-xs">(5)</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-like"></i>
        <div class="content">赞<span class="mct-b txt-xs">(1218)</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
  </div>
  <div class="card-line-group">
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-gear"></i>
        <div class="content">设置</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
    <section class="card-line card-4" v-ripple @click="showStatIntro()">
      <a>
        <i class="iconfont icon-t"></i>
        <div class="content">再次介绍</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
  </div>

  <transition name="fade">
    <div class="stat-intro-wrapper"
             v-if="toShowStatIntro">
      <div class="intro-control-wrapper">
        <button class="btn btn-warning intro-confirm-btn" @click="hideStatIntro()">知道了！</button>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
  let TWEEN = window.TWEEN

export default {
  name: 'me',
  data() {
    return {
      showStatCard: false,
      statisticsData: {
        start: '',
        end: '',
        totalVisit: '0',
        recentIP: []
      },
      animatedTotalVisit: 0,
      toShowStatIntro: false,
      toHighlightIntroStat: false
    }
  },
  mounted: function () {
    let haveIntroducedStat = localStorage.getItem('haveIntroducedStat')
      ? JSON.parse(localStorage.getItem('haveIntroducedStat')) : false;
    if (!haveIntroducedStat) {
      this.showStatIntro()
    }
  },
  watch: {
    'statisticsData.totalVisit': function (newValue, oldValue) {
        let vm = this
        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }

        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function () {
            vm.animatedTotalVisit = this.tweeningNumber.toFixed(0)
          })
          .start()

        animate()
      }
  },
  methods: {
    changeNum() {
      this.statisticsData.totalVisit = Math.random() * (9999 - 10) + 10
    },
    openStatCard() {
      this.hideStatIntro()

      this.showStatCard = true

      this.getStatData()
    },
    closeStatCard() {
      this.showStatCard = false

      // 关闭后还原为0，用于展示动画效果
      this.statisticsData = 0
    },
    getStatData() {
      this.$http.get('apis/statistics').then(res => {
        if (res.body.errorNum === 0) {
          this.statisticsData = res.body.data
        } else {
          this.statisticsData.totalVisit = '获取数据失败！'
        }
      })
    },
    showStatIntro() {
      this.toShowStatIntro = true
      this.toHighlightIntroStat = true
    },
    hideStatIntro() {
      this.toShowStatIntro = false
      this.toHighlightIntroStat = false

      localStorage.setItem('haveIntroducedStat', 'true');
    },
    clearIntroLocalStorage() {
      localStorage.clear('haveIntroducedStat')
    }
  }
}
</script>

<style scoped lang="stylus">
.card a
  color #333

.avatar-card
  line-height: 1.125rem
  .card-avatar
    margin .625rem 0 .625rem .75rem
    img
      width:3.125rem
.vip-icon-block
  vertical-align: bottom
  overflow: hidden
  display: inline-block
  width 2.25rem
  height 1.125rem
  text-align center
  background-color rgba(223,223,223,.7)
  border-radius 3px
  margin-left .375rem
  .iconfont
    color #a2a2a2
    font-size: 12px
    line-height:1rem
  .icon-crown
    font-size: 14px


.avatar-card-footer
  display: flex
  .separate-line
    height 2.5rem
  .box-col
    font-size: .8125rem
    flex 1
    text-align center
    padding: .4375rem 0
    p
      height .75rem
    p:nth-child(2)
      margin-top .25rem

.icon-friends,.icon-level,.icon-collect
  background-color #FF8C16
.icon-album,.icon-gear
  background-color #35B87C
.icon-like, .icon-t
  background-color #F2695F


.fade-enter-active, .fade-leave-active
  transition: opacity 0.25s ease-out

.fade-enter, .fade-leave-to
  opacity: 0

.statistics-card-wrapper
  background-color rgba(0,0,0,.8)
  position: fixed;
  top 0
  bottom 0
  left 0
  right 0
  z-index: 999;

.statistics-card
  position: fixed
  top 50%
  left 50%
  width:70%;
  height: 313px
  transform translate(-50%,-50%)
  background-color #fafafa
  padding: 12px;
  border: 1px solid #bbb
  border-radius 3px
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 999
  .close-btn
    position: absolute;
    top: 3px;
    right: 8px;
    color: #bbb;
    font-size: 18px;
    padding: 4px;
  h2
    font-size: 24px
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
    margin: 6px 0;
    .icon-red-hot
      font-size: 18px
  h3
    color: #999;
    font-size: 16px;
    margin: 12px 0 6px;
  p
    font-size: 12px;


h3.total-visit-num
  color: #EF5A46
  font-size: 2rem;
  text-align center
  .iconfont
    font-size: 26px;
  .unit-char
    font-size: 12px

.table-wrapper
  width: 100%;
  overflow: auto;

.ip-table
  width: 100%
  font-size: 8px
  td
    padding 4px
  thead
    background-color #ccc
  tbody
    tr:nth-child(2n)
      background-color #eee

.stat-intro-wrapper
  position: fixed;
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0,0,0,.6)
  z-index: 9998;

.caret-bottom
  position: relative;
  &:after
    content ''
    position: absolute;
    bottom -11px
    left 10px
    width: 0
    height: 0
    border: 6px solid transparent
    border-top-color #ffc107

.intro-tooltip-wrapper
  position: absolute;
  top -50px
  left 20px
  min-width: 200px;
  max-width: 300px;
  height: 40px;
  color: #212529;
  text-align: center;
  background-color: #ffc107;
  border-color: #ffc107;
  border-radius 4px
  h2
    font-size: 16px;
    line-height: 28px;
    padding: 8px 12px;

.intro-confirm-btn
  position: fixed;
  top 83%
  left 50%
  transform translateX(-50%)

.intro-highlighted
  position: relative;
  z-index 99999 !important
  animation bounce 1s linear



@keyframes bounce {
  0%, 100%, 20%, 53%, 80% {
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%, 43% {
    transition-timing-function: cubic-bezier(0.755, .050, .855, .060);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transition-timing-function: cubic-bezier(0.755, .050, .855, .060);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

</style>

<template>
<div class="discovery">
  <div class="search-bar-wrapper">
    <i class="iconfont icon-search"></i>
    <form class="search-form" action="" method="get">
      <input @focus="focusSearchBar"
                    class="search-bar"
                    :class="{'search-bar-active':searchBarFocused}"
                    type="search"
                    placeholder="搜索">
      <button @click.prevent="blurSearchBar"
                      v-show="searchBarFocused"
                      class="cancel-search-btn">取消</button>
    </form>
  </div>
  <div v-show="searchBarFocused" class="hot-search card">
    <section class="card-line card-4" v-ripple>
      <a>
        <i class="iconfont icon-hot"></i>
        <div class="content">微博热搜榜<span class="mct-b txt-xs">每分钟更新一次</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </section>
    <section class="list-card card">
      <ul>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
        <li class="hot-search-li"><a>更多热门搜索</a></li>
      </ul>
    </section>
  </div>
  <div v-show="!searchBarFocused" class="discovery-main-content">
    <div class="hot-topic card">
      <section class="list-card">
        <ul>
          <li class="hot-search-li"><a>#热门话题#</a></li>
          <li class="hot-search-li"><a>#热门话题#</a></li>
          <li class="hot-search-li"><a>#热门话题#</a></li>
          <li class="hot-search-li"><a>更多热门话题</a></li>
        </ul>
      </section>
    </div>
    <div class="card-line-group">
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-hot icon-red-hot"></i>
          <div class="content">热门微博</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-friends"></i>
          <div class="content">名人</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
    </div>
    <div class="card-line-group">
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-t"></i>
          <div class="content">微博头条</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-film"></i>
          <div class="content">电影</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-music"></i>
          <div class="content">音乐</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-charity"></i>
          <div class="content">微公益</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
    </div>
    <div class="card-line-group">
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-crown"></i>
          <div class="content">会员</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-album"></i>
          <div class="content">相册</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
      <section class="card-line card-4" v-ripple>
        <a>
          <i class="iconfont icon-famous-people"></i>
          <div class="content">找Doge</div>
          <i class="iconfont icon-right-arrow"></i>
        </a>
      </section>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'discovery',
  data() {
    return {
      searchBarFocused: false
    }
  },
  methods: {
    focusSearchBar() {
      this.searchBarFocused = true
    },
    blurSearchBar() {
      this.searchBarFocused = false
      let searchBar = document.querySelector('.search-bar')
      searchBar.blur()
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/mixin.styl"
  .card a
    color #333

  .icon-friends, .icon-charity
    background-color #FF8C16
  .icon-hot, .icon-crown, .icon-film
    background-color #FF8200
  .icon-red-hot, .icon-famous-people
    background-color #F2695F
  .icon-t
    background-color #DB192D
  .icon-music,.icon-album
    background-color #35B87C

.search-bar-wrapper
  background-color #e3e4e6
  position: relative
  padding 7px 6px 7px 7px
  border: #dadada solid 1px
  margin -10px 0 10px 0
  .search-form
    display: flex
  .icon-search
    font-size:16px
    color: #828282
    position: absolute
    top 13px
    left 18px
  .search-bar
    flex 1
    width:100%
    height 26px //for ie11
    box-sizing border-box
    font-size: .875rem
    line-height: 26px
    color #000
    background-color #fff
    padding-left 35px
    border-radius 3px
    -webkit-appearance: none
  .search-bar-active
    width:80%
  .cancel-search-btn
    width: 60px
    height 100%
    font-size: 1.0625rem
    line-height: 26px
    color #929292
    text-shadow 0 1px 0 #fff
    background-color transparent
    padding 0
    border none
    border-radius 3px
    margin-left 6px
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)
    &:active
      color: #ff8200;
      background-color #ebebeb

.list-card
  font-size:0   //用于解决换行的空白符也会占据位置，导致50%宽度两个list无法并列
  border-bottom-1px()
.hot-search-li
  width: 50%
  font-size: 16px
  display: inline-block
  box-sizing border-box
  padding .5rem .5rem .5rem .75rem
  position: relative
  list-separator-horizontal()
  list-separator-vertical()
  & a
    cursor pointer
    display: block
    padding .25rem .25rem
</style>

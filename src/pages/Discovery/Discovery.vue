<template>
<div class="discovery">
  <!--没必要再搭建一个API了，所以只用了静态文本：-->
  <div class="search-bar-wrapper">
    <form class="search-form" action="" method="get">
      <i class="iconfont icon-search"></i>
      <input type="search" class="search-bar" placeholder="搜索">
    </form>
  </div>
  <div class="hot-search card">
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-hot"></i>
        <div class="content">微博热搜榜<span class="mct-b txt-xs">每分钟更新一次</span></div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
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
        <li class="hot-search-li"><a>帅到被人砍___</a></li>
      </ul>
    </section>
  </div>
  <div class="hot-topic card">
    <section class="list-card">
      <!--没必要再搭建一个API了，所以只用了静态文本：-->
      <ul>
        <li class="hot-search-li"><a>#热门话题#</a></li>
        <li class="hot-search-li"><a>#热门话题#</a></li>
        <li class="hot-search-li"><a>#热门话题#</a></li>
        <li class="hot-search-li"><a>#热门话题#</a></li>
      </ul>
    </section>
  </div>
  <div class="card">
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-hot icon-red-hot"></i>
        <div class="content">热门微博</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-friends"></i>
        <div class="content">名人</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
  </div>
  <div class="card">
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-t"></i>
        <div class="content">微博头条</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-film"></i>
        <div class="content">电影</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-music"></i>
        <div class="content">音乐</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-charity"></i>
        <div class="content">微公益</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
  </div>
  <div class="card">
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-crown"></i>
        <div class="content">会员</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-album"></i>
        <div class="content">相册</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
    <header class="card-header card-4">
      <a>
        <i class="iconfont icon-famous-people"></i>
        <div class="content">找Doge</div>
        <i class="iconfont icon-right-arrow"></i>
      </a>
    </header>
  </div>
</div>
</template>

<script>
export default {
  name: 'discovery'
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/mixin.styl";

.card
  margin-bottom .5625rem
  background-color #fff
  box-shadow: 0 1px 0.1875rem -0.125rem rgba(0,0,0,.2)
  &  a
    color #000

.card-4 a
    height 2rem
    display: flex
    align-items center
    padding .375rem 0 .375rem .75rem
  .content
    flex 1

.card-header
  color #fff
  border-bottom-1px()
  .iconfont
    color: #fff;
    width 24px
    height 24px
    text-align: center
    line-height: 24px
    font-size: 20px;
    margin-right .625rem

  .icon-friends
    background-color #FF8C16
  .icon-hot
    background-color #FF8200
  .icon-red-hot
    background-color #F2695F
  .icon-t
    background-color #DB192D
  .icon-film
    background-color #FF8200
  .icon-music,.icon-album
    background-color #35B87C
  .icon-charity
    background-color #FF8C16
  .icon-crown
    background-color #FF8200
  .icon-famous-people
    background-color #F2695F

  .icon-right-arrow
    font-size:16px
    color #ddd

.search-bar-wrapper
  background-color #e3e4e6
  position: relative
  padding 7px 6px 7px 7px
  border: #dadada solid 1px
  margin -10px 0 10px 0
  .icon-search
    font-size:16px
    color: #828282
    position: absolute
    top 11px
    left 18px
  .search-bar
    width:100%
    box-sizing border-box
    font-size: .875rem
    line-height: 24px
    color #000
    background-color #fff
    padding-left 35px
    border-radius 3px
    -webkit-appearance: none


.list-card
  font-size:0   //解决：换行的空白符也会占据位置，导致50%宽度两个list无法并列
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

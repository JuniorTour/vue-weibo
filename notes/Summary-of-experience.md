#制作过程中的经验总结：

#### 1. iconfont显示为方框的bug：
忘了加.iconfont类，(T^T)。
顺带一提，搜索过程中得知iconfont相关的路径问题也有可能涉及到webpack.base.conf.js的url-loader字体相关设置，详情自行搜索。

#### 2. 过渡的四个类必须全部设置后，过渡效果才能使用，否则不会自动切换class
v-enter,v-enter-active,v-leave,v-leave-active

#### 3. watch的是'$route'而非'$router'

#### 4. build/dev-server.js和相应的api请求json更新后都需要重启服务器

#### 5. 1px border的解决方案：
http://jinlong.github.io/2015/05/24/css-retina-hairlines/
已经有比较成熟的多种方案，主要区别在于：两条还是四条边框、是否支持圆角、用的是meta-viewport+initial-scale+rem还是transform:scale(0.5)。
有以下两种可用的思路：
1.淘宝-flexible：meta-viewport+initial-scale+rem
2.微博：伪类+transform: scale(0.5) transform-origin: left top
3.微博：用一条1px宽、高的背景色当做边框，设置渐变处理为0.5px。
    background-image: linear-gradient(to bottom,#dadada 0,#dadada 50%,rgba(0, 0, 0, 0) 50%);
    /*从上到下，在1px的高度之中，从#dadada开始，直到0.5px时，将剩余的下半部分0.5px设置为透明，
    从而实现视觉上的0.5px。*/
    -webkit-background-size: 100% 1px;
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top;

#### 6. 微博的api：
1. 信息流：https://m.weibo.cn/feed/friends?version=v4
滚动到底部后，根据上一次ajax之中的next_cursor: 4123631984750535，
来进行下一次请求：https://m.weibo.cn/feed/friends?version=v4&next_cursor=4123648333524769&page=1

2. 消息：https://m.weibo.cn/msg/index?format=cards

#### 7. IOS-Safari的:active伪类无效问题：
IOS safari浏览器对于:active有怪癖。
https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
我目前简单采取了给body添加ontouchstart事件的解决方案。

#### 8. WebStorm用regex和捕获组批量替换
如用“+word+”替换“word”：
  1.先勾选find框后的Regex选项
  2.在find框中：(\w+)
  3.在replace框中："$1"
$1就是匹配到的捕获组。

#### 9. methods的简洁写法：
methods: {
      closePictureViewer() {...}
}
这其实是es2015的新特性！

#### 10. 注意分清$router和$route！！！

#### 11. vue-resource的interceptors：

Vue.http.interceptors.push(function (request, next) {
  console.log('loading..............')
  this.isLoading = true
  next()
})

对于this.$http.interceptors.push有些疑惑，没有用上，好像是不能在组件内使用：
https://stackoverflow.com/questions/44683756/vue-resource-not-passing-token-in-request-headers/44684359#44684359
试了一下，在main.js中确实生效了。

文档中说：Interceptors can be defined globally and are used for ...
我认为应该是：Interceptors can be ONLY defined globally

又在网上搜索了一下“加载进度”的技术，其实很多实现方式都是“伪装的、假的、不精确”进度


#Bug记录：
1.卡片footer的两个间隔线在chrome58之中会因为页面宽度不同，呈现不同的宽度？？weibo.cn也是！

2.header的上下两栏之中，始终会有细微的距离，无法紧密贴合。weibo.cn也是！

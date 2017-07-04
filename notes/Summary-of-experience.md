#制作过程中的经验总结：

#### 1. iconfont显示为方框的bug：
忘了加.iconfont类，(T^T)。
顺带一提，搜索过程中得知iconfont相关的路径问题也有可能涉及到webpack.base.conf.js的url-loader字体相关设置，详情自行搜索。

#### 2. 过渡的四个类必须全部设置后，过渡效果才能使用，否则不会自动切换class
v-enter,v-enter-active,v-leave,v-leave-active

#### 3. 低级错误记录：
1. watch的是'$route'而非'$router'
2. 注意分清$router和$route！！！
3. 看清分号的范围，不要把method写到了methods{}之外，QAQ。
4. 不要多删除了export的{}！
5. 注意===判断时的类型，'1'!===1，字符1并不等于数字1。

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

#### 12. css很需要规范！

#### 13. stylus的mixin用法：
首先：需要在用到的组件import相应的mixin。
其次写入css声明时，需要带括号：border-bottom-1px()

#### 14. 高度相关js方法和属性：
> Window.innerHeight：浏览器窗口的视口（viewport）高度（以像素为单位），如果存在水平滚动条，则包括它。这个属性的值一直不变，都是667（iPhone6）

> Window.scrollY ：返回文档在垂直方向已滚动的像素值。**IE11尚不支持，window.pageYOffset可以用作替代。**

> window.scrollY + window.innerHeight ：当前文档底部到达的像素值。

> HTMLElement.offsetHeight 是一个只读属性，它返回**该元素的**像素高度，包括元素的边框、垂直内边距和元素的水平滚动条（如果存在且渲染的话）和元素的CSS高度。

> Element.scrollHeight是计量元素**内容**高度的只读属性，包括overflow样式属性导致的视图中不可见内容。没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同。包括元素的padding，但不包括元素的margin。

> Element.clientHeight返回元素**内部**的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.

https://stackoverflow.com/questions/9430070/get-page-height-in-js-cross-browser

> Element.getBoundingClientRect()方法返回元素的大小及其相对于**视口**的位置。
返回值是一个 DOMRect 对象，DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
![DOMRect 对象](https://mdn.mozillademos.org/files/15087/rect.png)

15. express.Router():
http://lostjs.com/2014/04/24/router-in-express-4/
http://expressjs.com/en/4x/api.html#router
"express.Router 可以认为是一个微型的只用来处理中间件与控制器的 app，它拥有和 app 类似的方法，例如 get、post、all、use 等等。"

16. build后的gzip：
修改config/index.js , productionGzip: true,
https://stackoverflow.com/questions/38587698/webpack-gzip-vs-express-gzip

17. node.js的path模块

path是node.js内置的package，用来处理路径的。

path 的 api 可见：
https://nodejs.org/api/path.html#path_path_resolve_paths
http://www.runoob.com/nodejs/nodejs-path-module.html

简单摘抄下：
path.join([path1][, path2][, ...])
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。
path.resolve([from ...], to)
将 to 参数解析为绝对路径。

#Bug记录：
1. 卡片footer的两个间隔线在chrome58之中会因为页面宽度不同，呈现不同的宽度？？weibo.cn也是！

2. header的上下两栏之中，始终会有细微的距离，无法紧密贴合。weibo.cn也是！

3. 在IOS的Safari中，type="search"的input默认有50%的圆角？？？：
https://developer.mozilla.org/zh-CN/docs/Web/CSS/-moz-appearance：
-webkit-appearance: none，粗鲁地解决了

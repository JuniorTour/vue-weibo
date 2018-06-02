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
5. 注意===判断时的类型，'1'!==1，字符1并不等于数字1。

#### 4. build/dev-server.js和相应的api所请求的json文件更新后都需要重启服务器

#### 5. 1px border的解决方案：
http://jinlong.github.io/2015/05/24/css-retina-hairlines/
已经有比较成熟的多种方案，主要区别在于：
两条还是四条边框、是否支持圆角、用的是meta-viewport+initial-scale+rem还是transform:scale(0.5)。

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

#### 7. Safari on iOS的`:active`伪类无效问题：
iOS safari浏览器对于:active有怪癖。
https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
我目前简单采取了给<body>添加ontouchstart事件的解决方案。

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

这其实是es2015的新特性

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

17. node.js的路径问题

- node.js的path模块

path是node.js内置的package，用来处理路径的。

path 的 api 可见：
https://nodejs.org/api/path.html#path_path_resolve_paths
http://www.runoob.com/nodejs/nodejs-path-module.html

简单摘抄下：
path.join([path1][, path2][, ...])
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。
path.resolve([from ...], to)
将 to 参数解析为绝对路径。

- __dirname returns the directory that the currently executing script is in.

18. git使用经验：
    1. `git clone <url>`

    2. `git config --global user.name "name" //设置你的用户名`
       `git config --global user.email "emil" //设置用户的email账号`
       这一步可选，但以后提交commit时，还得设置。

    3. 修改一些文件

    4. `git add <file_path>  //update what will be committed`
        或 `git checkout -- file.txt //丢弃工作区的修改`
        `git add .  //更新所有修改！`

    5. `git commit`

    6. 在vim中编辑修改信息，**退出编辑时：按下ctrl-c，输入`:q`或`:x`退出**
    https://stackoverflow.com/questions/11828270/how-to-exit-the-vim-editor

    修改信息成功commit了到本地仓库。

    7. `git push`
    会提示登录github，之后便会自动push到远程仓库，完成一次修改。

    如果此时，本地和远程不同步的话，就会拒绝 push，并提示：
     > To https://github.com/JuniorTour/vue-weibo.git
       ! [rejected]        master -> master (fetch first)
      error: failed to push some refs to 'https://github.com/JuniorTour/vue-weibo.git'
      hint: Updates were rejected because the remote contains work that you do
      hint: not have locally. This is usually caused by another repository pushing
      hint: to the same ref. You may want to first integrate the remote changes
      hint: (e.g., 'git pull ...') before pushing again.
      hint: See the 'Note about fast-forwards' in 'git push --help' for details.


20. 居中常用思路：
  1.
  ``` css
  p:a
  left:50%
  transform: translateX(-50%)
  ```
  2.
  ``` css
  p:a
  left:50%
  margin-left: -(元素的一半宽度)
  ```
  3. flex布局

21. Home.vue中的 created() {}

      /*此处也可以在mounted之中用$nextTick调用methods的方法，来初始化weiboContent。详见 http://dwz.cn/65ocqi
       * 但我个人结合生命周期图认为，created早于mounted，用于初始化视图，应该首选created！*/
      /*https://segmentfault.com/q/1010000006915580
       * 放在目录里并不意味能通过http访问。
       * 要么另起web服务serve这个目录，要么放在static目录里，因为dev-server对该目录文件实现了http访问。*/
      // this.$http.get('static/data/weibo-content.json', {id: 0}).then(res => {
      //等价于：目前的写法

22.  '@'的路径设置，见build/webpack.base.conf.js

23. 模态框出现时,禁止背景滚动问题

在实现评论和转发组件(commentWindow)时,遇到了这样一个需求:
当评论和转发组件出现时,需要禁止下层信息流的滚动.

         After researching this for a long time and trying every solution I think useful,
         I found there are mainly 3 kind of method:

         1. Add overflow: hidden; position: fixed/absolute; to the body/html or a wrapper.
         pro: Only CSS
         con: Not work on mobile Safari. May trigger scroll to top side effect.

         Many component lib chose to use this solution for their Modal component, eg: Bootstrap, Ant Design..
         But they also did not solve the bug on mobile safari.

         2. Use JS to prevent touch/scroll event.
         pro: Compatible with mobile Safari.
         con: A little complex(often more than 30 lines code).

         3. Use JS to record the position before overlay.
         pro: Compatible with mobile Safari.
         con: A little complex(often more than 20 lines code).

         Finally, I decided to use the 3rd one.

         Reference:
         https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi/41601290#41601290
         https://stackoverflow.com/questions/9280258/prevent-body-scrolling-but-allow-overlay-scrolling
         https://stackoverflow.com/questions/14270084/overflow-xhidden-doesnt-prevent-content-from-overflowing-in-mobile-browsers/24727026#24727026
         https://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened


#Bug记录：
1. 卡片footer的两个间隔线在chrome58之中会因为页面宽度不同，呈现不同的宽度？？weibo.cn也是！

2. header的上下两栏之中，始终会有细微的距离，无法紧密贴合。weibo.cn也是！

3. 在IOS的Safari中，type="search"的input默认有50%的圆角？？？：
https://developer.mozilla.org/zh-CN/docs/Web/CSS/-moz-appearance：
-webkit-appearance: none，粗鲁地解决了

4. vue-ripple-effect中的ripple.js的第5行const props声明会导致ios 9.3的Safari无法呈现页面，改为var即修复。

5. :active 相互覆盖问题：
.card的:active会和footer的active覆盖！
   .card:active
     background-color #ebebeb

是否只能用data-act-type加事件委托来实现:active？

6. 图片查看组件在路由跳转（如微信中的返回）时，没有关闭！

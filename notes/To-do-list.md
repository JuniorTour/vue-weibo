# To-do-list:大体完成后，逐步添加

~~1. 点击看大图功能，需要长图可以滑动查看：~~
  1. 尝试了在Home内通过body.appendChild(pictureViewer)插入，
  不行！插入的结果只是一个<picture-viewer></picture-viewer>，没有渲染。

  这本质上应该是一个组件间通信的问题！6/14
  2. 尝试了Event Bus，几乎可行，已经能实现APP和Home组件间通信！详见：https://www.w3ctrain.com/2016/08/02/text-overflow-mutiple-line/
  目前的难点在于，如何将pictureViewer插入到#app同级的地方。

  3. 放弃Event Bus，可以想象到日后不便于拓展维护。直接上Vuex！6/15
  文档里说：“Vuex就像眼镜，你会知道何时需要他。”真是精辟！

  **实现了！**6/15/17:49
  但是，用了直接给img绑定click事件的方式，会影响性能。
  微博源站使用了data-act-type，应该是利用了事件代理，考虑尝试！

  一个bug：打开了图片浏览器后，.main-body仍可以滑动。如果让.main-body暂时d:n，则会在关闭图片浏览器后，无法回到原来的页面位置。
  需要暂时存下页面位置，待关闭后再恢复吗？
  观察微博后，发现应该是这样做的。

2. safari中的:active尝试data-act-type:'hover'方案，应该需要借助事件代理

3. 卡片右上角.card-operate相关功能

4. 点赞动画

5. 下拉刷新

~~6. 滑动到底部更新内容，即无限滚动加载：~~
微博的API的做法是：
滚动到底部后，根据上一次ajax之中的next_cursor: 4123631984750535，
来进行下一次请求：https://m.weibo.cn/feed/friends?version=v4&next_cursor=4123648333524769&page=1

DOM的更新：我觉得可以通过给this.weiboContent
push()新内容来实现。

基本**实现**了，2017年7月1日22:31:00。

~~7. 登录页和404页面：~~
怎么独立成一个页面呢？

2017年7月4日13:27:15，想到了一个办法，在prod-server.js之中添加静态页面！

~~8. 卡片头部背景：~~
**实现了**，但是没有搞清楚json中的cardid:"star-035"字段和相应的图片url结果，是如何计算出来的？
难不成要在.vue之中，用switch语句判断？太复杂了吧！

9. 图片浏览器的缩放，长图滑动功能，以及图片数量索引功能

~~10. 禁止卡片footer文字选择~~

~~11. 加载中动画~~
**实现了！**在Message之中，但是没有做到**显示加载比例**，似乎vue-resource不便于实现记载进度？
而且从许多资料上看到，多数的加载进度都是“伪装的”？

12. 点击扩散的背景效果，见过几次，不知道从何而来：
水波涟漪效果：Ripple Effect

13. 尝试使用local storage 或其他缓存方案，模仿原生App，支持添加至桌面。

~~14. 事件防抖：debounce~~
https://github.com/mqyqingfeng/Blog/issues/22
简单地在Home更新中**用上了**，效果显著！！！

15. 生产环境下后端url直接访问支持 history 模式，如http://localhost:8080/home
http://router.vuejs.org/en/essentials/history-mode.html:

当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

16. 图片浏览支持缩放等各种手势

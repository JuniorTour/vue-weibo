#制作过程中的经验总结：

#### 1.iconfont显示为方框的bug：
忘了加.iconfont类，(T^T)。
顺带一提，搜索过程中得知iconfont相关的路径问题也有可能涉及到webpack.base.conf.js的url-loader字体相关设置，详情自行搜索。

#### 2.过渡的四个类必须全部设置后，过渡效果才能使用，否则不会自动切换class
v-enter,v-enter-active,v-leave,v-leave-active

#### 3.watch的是'$route'而非'$router'

#### 4.build/dev-server.js和相应的api请求json更新后都需要重启服务器

# vue-weibo


这是一个用Vue.js及相关插件模仿制作[新浪微博移动版(m.weibo.cn)](m.weibo.cn)的单页应用（SPA）项目。

使用了`vue-cli`作为搭建工具，主要使用了`vue.js@2.3.3`,`vue-resource@1.3.4`,`vue-router@2.3.1`,`vuex@2.3.1`等工具。

欢迎Issue、PR、邮件、微博等等各种交流！更欢迎点个`Star`:star2:以示鼓励，谢谢你！

# 预览Demo：

### [点击访问vue-weibo在线demo](http://juniortour.net:8080)

或扫码预览：

![vue-weibo在线地址二维码](./notes/vue-weibo-qr-cod.png)

## 动图预览：

### 基本功能：
![vue-weibo动图预览](./notes/vue-weibo-demonstration.gif)

### 路由、点赞动画、涟漪效果等演示：
![vue-weibo动图预览-2](./notes/vue-weibo-demonstration-2.gif)

# 基本功能：

刷新微博、加载旧微博、简单图片预览（准备实现缩放等手势功能）、模拟iOS滑动删除效果(swipe-out)、Tab页面切换、后台模拟数据、生产环境服务器支持、登录页面、404页面等...

# 运行项目：

``` nodejs
git clone https://github.com/JuniorTour/vue-weibo.git

cd vue-weibo

npm install       //推荐使用 cnpm 淘宝NPM镜像安装更快！

npm run dev       //开发环境中运行，构建完成后，自动访问http://localhost:8080/，自带热更新，便于开发。

npm run prod      //或生产环境中运行，资源经过压缩，访问更快。
```

# To-do List:

0. ~~点赞动画特效！~~  -2017/7/18
1.  ~~滑动删除消息~~  -2017/10/9. Refactored-2018/5/20
2. 图片预览功能完善及手势支持
4. local storage/service worker
5. ~~IOS手机添加至桌面功能~~ -2017/7/8
6. ~~登录页面、404页面及相应的路由~~ -2017/7/6
7. ~~ripple effect~~  -2017/7/8~
8. ~~优化整理代码，优质的代码就是最好的注释~~  -2017/12
9. 评论、转发功能  -2018/6/1
10. 考虑给发现和我两个tab也加上一些有趣的交互，~~展示统计数据~~
11. ~~完善登录页面组件及其功能~~  -2017/12/16
12. ~~完善prod-server~~ -2017/12/16
13. 下拉刷新

# 项目结构：

```
.
├── build/              # webpack config files
│   └── ...
├── config/
│   ├── index.js        # main project config
│   └── ...
├── notes/
│   └── ...             # 制作过程中的一些笔记。
├── src/
│   ├── assets/         # 字体、样式等module 资源 (会被webpack处理)
│   │   └── ...
│   ├── components/     # 局部组件
│   │   └── ...
│   ├── data/           # 模拟数据
│   │   └── ...
│   ├── pages/          # 主要页面组件
│   │   └── ...
│   ├── main.js         # app 入口文件
│   ├── App.vue         # 主要app组件
├── static/             # 图片等纯静态资源
├── test/
│   └── unit/                  # unit tests
│      ├── specs/              # test spec files
│      ├── index.js            # test build entry file
│      └── karma.conf.js       # test runner config file
├── .babelrc                    # babel config
├── .postcssrc.js               # postcss config
├── .eslintrc.js                # eslint config
├── .editorconfig               # editor config
├── index.html                  # index.html template
└── package.json                # build scripts and dependencies
```


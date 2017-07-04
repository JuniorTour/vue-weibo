# vue-weibo

这是一个用Vue.js及相关插件模仿制作[新浪微博网页版](m.weibo.cn)的项目。

使用了`vue-cli`作为搭建工具，主要使用了`vue.js@2.3.3`,`vue-resource@1.3.4`,`vue-router@2.3.1`,`vuex@2.3.1`等工具。

欢迎Issue、PR、邮件、微博等等各种交流！

# 预览demo：

### [vue-weibo在线demo地址](http://juniortour.net:8080)
![vue-weibo在线地址二维码](./notes/vue-weibo-qr-cod.png)

## 动图预览：

![vue-weibo动图预览](./notes/vue-weibo-demonstration.gif)


# 基本功能：

刷新微博、加载旧微博、简单图片预览（准备实现缩放等手势功能）、Tab页面切换、后台模拟数据等...

# 运行项目：

``` nodejs
git clone https://github.com/JuniorTour/vue-weibo.git
cd vue-weibo
npm install   //推荐使用 cnpm 淘宝NPM镜像安装更快！
npm run dev //开发环境中运行，构建完成后，自动访问http://localhost:8080/
node prod-server.js //或生产环境中运行
```

# 配套教程

目前代码关键部分中已经有相应的注释介绍，稍后，我会详细地写出从0构建这个项目的过程，敬请期待！

如果你对此有任何意见和想法，都欢迎通过各种方式和我交流！ヾ(✿ﾟ▽ﾟ)ノ

# To-do List:

0. 点赞动画特效！
1. 滑动删除消息
2. 图片预览手势支持
3. 配套教程文章
4. local storage
5. 手机添加至桌面功能
4. ......

# 项目结构：

```
.
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── notes/
│   └── ...                       # 制作过程中的一些笔记。
├── src/
│   ├── assets/             # 字体、样式等module 资源 (会被webpack处理)
│   │   └── ...
│   ├── components/     # 局部组件
│   │   └── ...
│   ├── data/                 # 模拟数据
│   │   └── ...
│   ├── pages/               # 主要页面组件
│   │   └── ...
│   ├── main.js                # app 入口文件
│   ├── App.vue              # 主要app组件
├── static/                      # 图片等纯静态资源
├── test/
│   └── unit/                   # unit tests
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


var express = require('express')
var expressStaticGzip = require('express-static-gzip')
var chalk = require('chalk')
var path = require('path')
var app = express()

app.set('port', process.env.PORT || 8080) //可以修改至其他端口

/*下面这段代码写的很糟糕QAQ，不建议参考，如果你有更好的写法，欢迎和我交流！*/
// TODO:FEAT 在文件中记录下访问者的基本信息和总访问量

//添加中间件应对vue-router的history模式（参考：http://router.vuejs.org/en/essentials/history-mode.html）：
app.use((req, res, next) => {
  if (req.originalUrl.includes('/static/') || req.originalUrl.includes('/apis/')) {
    next()
  } else if (req.originalUrl === '/') {
    res.sendFile(path.join(__dirname, '../dist/login.html'))
  } else if ( req.originalUrl === '/home' || req.originalUrl === '/message'
                    || req.originalUrl === '/discovery' || req.originalUrl === '/me') {
    /*如果是访问页面的，这时，把index.html发送出去。*/
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  } else {
    //当访问的不是router-link里的路径时，显示404页面
    next()
  }
})

function getCurrentTime () {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

//模拟数据：
var weiboMsg = require('../src/data/weibo-message.json')
var apiRouters = express.Router() //定义router
apiRouters.get('/weibo-content', function (req, res) {
  console.log('req.query.targetCursor = ' + req.query.targetCursor)
  /*根据查询字符串- targetCursor 确定返回的对象*/
  var errorNum = 0, weiboContentUrl = '', targetCursor = parseInt(req.query.targetCursor)
  switch (targetCursor) {
    case -1:
      console.log('No new content.')
      /*没有新内容时：*/
      errorNum = -1
      break
    default:
      weiboContentUrl = '../src/data/weibo-content-' + req.query.targetCursor + '.json'
  }
  var tergetWeiboContent = weiboContentUrl !== '' ? require(weiboContentUrl) : 'empty'
  res.json({
    errorNum: errorNum,
    data: tergetWeiboContent
  })
  console.log('Successfully deliver weibo content! At ' + getCurrentTime() + '\n')
})
apiRouters.get('/weibo-msg', function (req, res) {
  res.json({
    errorNum: 0,
    data: weiboMsg
  })
})

app.use('/apis', apiRouters)

//提供gzip压缩支持（需要安装express-static-gzip，并修改config/index.js）和静态资源：
app.use('/', expressStaticGzip('./dist'))
// app.use(express.static('./dist'))

//404页面
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/404.html'))
})

//启动服务器：
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err)
    return
  }
  //\x1b[32m%s\x1b[0m 用于给终端里的文字设置颜色。
  console.log(chalk.green( 'vue-weibo started on http://localhost:' + app.get('port') )+ '\n' + 'Press Ctrl-C to terminate.')
})

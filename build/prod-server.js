var express = require('express')
var expressStaticGzip = require('express-static-gzip')
var path = require('path')
var app = express()

app.set('port', process.env.PORT || 8080) //可以修改至其他端口

/*下面这段代码写的很糟糕QAQ，如果你有更好的写法，欢迎和我交流！*/

//添加中间件应对vue-router的history模式（参考：http://router.vuejs.org/en/essentials/history-mode.html）：
app.use((req, res, next) => {
  // console.log('req.originalUrl = ', req.originalUrl)
  if (req.originalUrl.includes('/static/') || req.originalUrl.includes('/apis/')) {
    next()
  } else if (req.originalUrl === '/' || req.originalUrl === '/home' || req.originalUrl === '/message' || req.originalUrl === '/discovery' || req.originalUrl === '/me') {
    /*如果原来的请求不是去向static目录和apis请求静态文件和后台数据的，
     * 而是访问页面的，这时，把index.html发送出去。*/
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  } else {
    //当访问的不是router-link里的路径时，显示404页面
    next()
  }
})

function getCurrentTime () {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

//模拟数据：
var weiboMsg = require('./src/data/weibo-message.json')
var apiRouters = express.Router() //定义router
apiRouters.get('/weibo-content', function (req, res) {
  console.log('req.query.targetCursor = ' + req.query.targetCursor)
  // console.log('typeof req.query.targetCursor = '+typeof req.query.targetCursor)
  /*根据查询字符串- targetCursor 确定返回的对象*/
  var errorNum = 0, weiboContentUrl = '', targetCursor = parseInt(req.query.targetCursor)
  switch (targetCursor) {
    case -1:
      console.log('No new content.')
      /*没有新内容时：*/
      errorNum = -1
      break
    default:
      // console.log('get weiboContentUrl.')
      // console.log('req.query.targetCursor = '+req.query.targetCursor)
      weiboContentUrl = './src/data/weibo-content-' + req.query.targetCursor + '.json'
  }
  var tergetWeiboContent = weiboContentUrl !== '' ? require(weiboContentUrl) : 'empty'
  // console.log('get tergetWeiboContent.')
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

app.use((req, res, next) => {
  res.type('text/html')
  res.status(404).send('<h1>QAQ-404-什么也没找到！</h1></br><h2><a href="../">点击返回上一页！</a></h2>')
})

//启动服务器：
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err)
    return
  }
  //\x1b[32m%s\x1b[0m 用于给终端里的文字设置颜色。
  console.log('\x1b[32m%s\x1b[0m', 'vue-weibo started on http://localhost:' + app.get('port') + '\n' + 'Press Ctrl-C to terminate.')
})

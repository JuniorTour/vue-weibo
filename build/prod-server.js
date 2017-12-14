var express = require('express')
var expressStaticGzip = require('express-static-gzip')
var chalk = require('chalk')
var path = require('path')
var fs = require('fs')
var app = express()

var statistics = {};

app.set('port', process.env.PORT || 8080) //可以修改至其他端口

// TODO:FEAT 在文件中记录下访问者的基本信息和总访问量

fs.readFile('./notes/prod-statistics.json',  (err, data) => {
  if (err) {
    console.log('Read File Error! ', err);
  } else {
    // console.log(JSON.parse(data))
    statistics = JSON.parse(data);
    statistics.totalVisit = 1;

    recordStatistics(JSON.stringify(statistics));
  }
});

var statisticsWriteStream = fs.createWriteStream('./notes/prod-statistics.json',{
  flags: 'r+',
  encoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
})


function recordStatistics(content) {
  // 1.未经配置，每次都重写整个文件
  fs.writeFile('./notes/prod-statistics.json', content, (err) => {
    if (err) {
      console.log('Write File Error!', err)
    }
  })

  console.log('Write Content: ', content)

  //  2. 更加灵活的API：
  // statisticsWriteStream.write(content)
  // statisticsWriteStream.end();
}



//添加中间件应对vue-router的history模式请求（参考：http://router.vuejs.org/en/essentials/history-mode.html）：
function serverStaticFile(req, res, next) {
  if (req.originalUrl.includes('/static/') || req.originalUrl.includes('/apis/')) {
    next()
  } else {
    /*如果是访问页面的，这时，把index.html发送出去。*/
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.use((req, res, next) => {
  serverStaticFile(req, res, next);
});

function getCurrentTime () {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

//模拟数据：
var weiboMsg = require('../src/data/weibo-message.json')
var apiRouters = express.Router()
apiRouters.get('/weibo-content', function (req, res) {
  /*根据查询字符串- targetCursor 确定返回的对象*/
  var errorNum = 0, weiboContentUrl = '', targetCursor = parseInt(req.query.targetCursor)
  switch (targetCursor) {
    case -1:
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
  // console.log('Successfully deliver weibo content! At ' + getCurrentTime() + '\n')
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


//启动服务器：
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err)
    return
  }
  //\x1b[32m%s\x1b[0m 用于给终端里的文字设置颜色。
  console.log(chalk.green( 'vue-weibo started on http://localhost:' + app.get('port') )+ '\n' + 'Press Ctrl-C to terminate.')
})

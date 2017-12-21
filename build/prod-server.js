var express = require('express')
var expressStaticGzip = require('express-static-gzip')
var chalk = require('chalk')
var path = require('path')
var fs = require('fs')
var app = express()

app.set('port', process.env.PORT || 8080) //可以修改至其他端口

var statistics = {
  start:'',
  end:'',
  totalVisit: 0,
  todayVisit: 0,
  recentIP: []
};

function backupStatistics (content) {
  fs.writeFile('./src/data/statistics-backup.json', content, (err) => {
    if (err) {
      console.log(chalk.red.bold('Backup Statistics Error!  '), err)
    } else {
      console.log(chalk.green('Backup Statistics successfully.'))
    }
  })
}

function initStatistics () {
  statistics.start = new Date().toLocaleString()
  statistics.totalVisit = 0;
  statistics.recentIP = [];
}

function beginStatistics () {
  fs.readFile('./src/data/prod-statistics.json',  (err, data) => {
    if (err) {
      console.log(chalk.red.bold('Read Statistics File Error!  '), err)
    } else {
      statistics = JSON.parse(data)

      backupStatistics(JSON.stringify(statistics))

      initStatistics()
      writeStatistics(JSON.stringify(statistics))

      console.log(chalk.green('Statistics ready.'))
    }
  });
}

beginStatistics()

function writeStatistics(content) {
  // 注意每次都会重写整个文件
  fs.writeFile('./src/data/prod-statistics.json', content, (err) => {
    if (err) {
      console.log(chalk.red.bold('Write Statistics File Error!  '), err)
    } else {
      console.log(chalk.green('\nWrite Statistics File Successfully!\n'))
    }
  })
}

function recordVisit (req) {
  statistics.end = new Date().toLocaleString()
  if (statistics.recentIP.length >= 50) {
    statistics.recentIP.shift()
  }
  statistics.recentIP.push(req.ip + ' - ' +statistics.end);
  statistics.totalVisit++;

  writeStatistics(JSON.stringify(statistics));
}


//添加中间件应对vue-router的history模式请求（参考：http://router.vuejs.org/en/essentials/history-mode.html）：
function serverStaticFile(req, res, next) {
  if (req.originalUrl.includes('/static/') || req.originalUrl.includes('/apis/')) {
    next()
  } else {
    // TODO:BUG req for /favicon.ico overlapped
    res.sendFile(path.join(__dirname, '../dist/index.html'))

    recordVisit(req)
  }
}

app.use((req, res, next) => {
  serverStaticFile(req, res, next);
});

//模拟数据：
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
})

var weiboMsg = require('../src/data/weibo-message.json')
apiRouters.get('/weibo-msg', function (req, res) {
  res.json({
    errorNum: 0,
    data: weiboMsg
  })
})

// 统计数据API
apiRouters.get('/statistics', function (req, res) {
  res.json({
    errorNum: 0,
    data: statistics
  })
})

app.use('/apis', apiRouters)

//提供gzip压缩支持（需要安装express-static-gzip，并修改config/index.js）和静态资源：
app.use('/', expressStaticGzip('./dist'))


//启动服务器：
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(chalk.red.bold(err))
    return
  }
  console.log(chalk.green( 'vue-weibo started on http://localhost:' + app.get('port') )+ '\n' + 'Press Ctrl-C to terminate.\n\n')
})

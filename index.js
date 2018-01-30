var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')
var app = express()


//跨域问题，只供测试使用
app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', router)
app.use(express.static('public'))


app.listen(3000, function () {
  console.log(3000)
})

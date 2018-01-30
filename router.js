var express = require('express')
var router = express.Router()
var crud = require('./crud.js')
var path_url = require('./api.js')
var student = require('./data/student.json')
var img = require('./data/img.json')
var Mock = require('mockjs')
var info = require('./data/info.json')
var Random = Mock.Random

var mydata = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
var colors = [Random.hex(), Random.hex(), Random.hex(), Random.hex(), Random.hex()]

router.get('/mockjs', function (req, res) {
  var data = Mock.mock({
    'list|1-10': [{
      'id|+1': 1,
      'name|1': mydata,
      'color|1': colors
    }]
  })

  res.json(200, data)
})


router.get('/mymockjs', function (req, res) {
  var data = Mock.mock({
    'success': true,
    'msg': '',
    'banner|2': info
  })
  res.json(200, data)
})




// 注册
router.post(path_url.reg, function (req, res) {
  // 接受参数
  var username = req.body.username
  var password = req.body.password
  var sql = 'insert into user values (null,?,?)'
  var insertArr = [username, password]
  crud.sqlCRUD(sql, insertArr, function (result) {
    if (result.affectedRows) {
      res.json(200, {
        msg: 'success'
      })
    } else {
      res.json(200, {
        msg: '注册失败'
      })
    }

  })
})

// 登录
router.post(path_url.login, function (req, res) {

  var username = req.body.username
  var password = req.body.password
  // 当前的一条数据
  var sql = 'select * from user where username=? and password=?'
  var selectArr = [username, password]
  crud.sqlCRUD(sql, selectArr, function (result) {
    if (result.length > 0) {
      res.json(200, result)
    } else {
      res.json(200, {
        msg: '用户名密码错误',
        code: '400'
      })
    }

  })
})


// 修改  ? 课下练习
router.get(path_url.reset, function (req, res) {
  var sql = 'update user set username=\'ice\',age=30,job=\'jike\' where id=3'
  crud.sqlCRUD(sql, null, function (result) {
    if (result) {
      res.json(200, result)
    } else {
      res.json(200, {
        msg: 'error'
      })
    }

  })
})

router.get(path_url.stuinfo, function (req, res) {
  res.json(200, student)
})

router.get('/currentimg', function (req, res) {
  res.json(200, img)
})


module.exports = router

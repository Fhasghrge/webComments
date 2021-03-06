// 单独开辟一个路由模块
// 用来根据不同的请求方法和请求路径设置具体的函数
const express = require('express')
const router = express.Router() // 获取路由对象

const sqlQuery = require('./sql')
const multer = require('multer')
const upload = multer()
const bodyParser = require('body-parser')

/**
 * * 路由层中间件
 * * 使用router.use || router.METHOD
 */
router.post('/userinfos', bodyParser.json(), async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let { username, password } = req.body
  if (username && password) {
    let strSql = `SELECT * FROM userinfos WHERE username = ${username} AND password = ${password} LIMIT 1`
    let result = await sqlQuery(strSql)
    // res.json()
    const resdata = Array.from(result)
    if (resdata.length === 1) {
      res.json({
        errcode: 0,
        types: resdata[0].contents // 返回用户信息
      })
    } else {
      res.json({
        errcode: 1
      })
    }
  } else {
    console.log('未能获得参数')
  }
})

router.post('/addArticles', upload.array(), async (req, res) => {
  const { content, author, type, title } = req.body
  const strSql = `INSERT INTO articles (content,author,type,title) VALUES ("${content}","${author}","${type}","${title}")`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

router.post('/getArticles', upload.array(), async (req, res) => {
  const {type } = req.body
  const strSql = `SELECT title, author, id FROM articles WHERE type = "${type}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

router.post('/getDeepArticle', upload.array(), async (req, res) => {
  const { id } = req.body
  const strSql = `SELECT * FROM articles WHERE id = "${id}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

router.post('/postComment', upload.array(), async (req, res) => {
  const { author, content, article } = req.body
  const data = new Date().toLocaleString()
  const strSql = `INSERT INTO comments (author,content,data,article) VALUES ("${author}","${content}","${data}","${article}")`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

router.post('/getComments', upload.array(), async (req, res) => {
  const { article } = req.body
  const strSql = `SELECT * FROM comments WHERE article = "${article}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

router.post('/deleteComments', upload.array(), async (req, res) => {
  const { id } = req.body
  const strSql = `DELETE FROM comments WHERE id="${id}"`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

router.post('/changeComments', upload.array(), async (req, res) => {
  const { id,comment } = req.body
  const strSql = `UPDATE comments SET content="${comment}" WHERE id="${id}"`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

module.exports = router
// import express from 'express'
let express = require('express')
// import sqlQuery from './sql'
let sqlQuery = require('./sql')
let bodyParser = require('body-parser')
let multer = require('multer')

let upload = multer()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.post('/userinfos', bodyParser.json(), async (req, res) => {
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
        types: resdata[0].contents
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

app.post('/addArticles', upload.array(), async (req, res) => {
  const { content, author, type, title } = req.body
  const strSql = `INSERT INTO articles (content,author,type,title) VALUES ("${content}","${author}","${type}","${title}")`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

app.post('/getArticles', upload.array(), async (req, res) => {
  const { author, type } = req.body
  const strSql = `SELECT title, id FROM articles WHERE author = "${author}" AND type = "${type}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

app.post('/getDeepArticle', upload.array(), async (req, res) => {
  const { id } = req.body
  const strSql = `SELECT * FROM articles WHERE id = "${id}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

app.post('/postComment', upload.array(), async (req, res) => {
  const { author, content, article } = req.body
  const data = new Date().toLocaleString()
  const strSql = `INSERT INTO comments (author,content,data,article) VALUES ("${author}","${content}","${data}","${article}")`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})

app.post('/getComments', upload.array(), async (req, res) => {
  const { article } = req.body
  const strSql = `SELECT * FROM comments WHERE article = "${article}"`
  const result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

app.post('/deleteComments', upload.array(), async (req, res) => {
  const { id } = req.body
  const strSql = `DELETE FROM comments WHERE id="${id}"`
  const result = await sqlQuery(strSql)
  res.json({
    errcode: result.warningCount === 0 ? 0 : 1,
  })
})


app.listen('8080', () => {
  console.log(
    'server Start',
    'http:localhost:8080/'
  )
})
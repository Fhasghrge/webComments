// import express from 'express'
let express = require('express')
// import sqlQuery from './sql'
let sqlQuery = require('./sql')
let bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true})) 
app.get('/', (req, res) => {
  res.send('connected！')
})

// let ceshi = 'localhost:8080/userinfos?username=2018081311021&password=311021'
app.post('/userinfos', bodyParser.json(), async (req, res) => {
  //跨域请求
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let { username, password } = req.body
  if (username && password) {
    let strSql = `SELECT * FROM userinfos WHERE username = ${username} AND password = ${password} LIMIT 1`
    let result = await sqlQuery(strSql)
    // res.json()
    res.json(Array.from(result))
  }else{
    console.log('未能获得参数')
  }
})
app.listen('8080', () => {
  console.log(
    'server Start',
    'http:localhost:8080/'
  )
})
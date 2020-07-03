const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(router) // 把路由挂载到服务器

app.listen('8080', () => {
  console.log(
    'server Start:',
    '\nhttp://localhost:8080'
  )
})
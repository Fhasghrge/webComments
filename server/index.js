const express = require('express')

const router = require('./router')
const bodyParser = require('body-parser')

const app = express()

/**
 * * 应用层中间件 
 * * app.use || app.METHOD
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(router) // 把路由挂载到服务器

// * 唯一内置中间件，可以有多个这个中间件
app.use(express.static(__dirname + '/public'))

// * 错误处理中间件，错误处理一般放在最后
app.use( (err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke')
})

app.listen('8080', () => {
  console.log(
    'server Start:',
    '\nhttp://localhost:8080'
  )
})
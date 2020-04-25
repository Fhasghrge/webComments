// import mysql from 'mysql'
let mysql = require('mysql')
// import databaseinfo from './databaseinfo'
let databaseinfo = require('./databaseinfo')

function sqlQuery(sqlStr,arr){
  const con = mysql.createConnection(databaseinfo)
  return new Promise( (resolve, reject) => {
    con.query(sqlStr, arr, (err, res) => {
      if(err) throw err
      resolve(res)
      con.end()
    })
  })
}
module.exports = sqlQuery
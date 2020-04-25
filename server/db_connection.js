var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zs123456",
  database: 'mydb'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("***** + Connected! + *****");

  //创建数据库
  // con.query('CREATE DATABASE mydb', (err, res) => {
  //   if(err) throw err
  //   console.log('database created!');
  // })

  // 创建表加主键
  // let sql = 'CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255) )';

  // 向表中插入数据
  // let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"

  //选择
  // let sql = 'SELECT name FROM customers'

  //插入多项
  // let sql = 'INSERT INTO customers (name, address) VALUES ?'
  // let values = [
  //   ['John', 'Highway 71'],
  //   ['Peter', 'Lowstreet 4'],
  //   ['Amy', 'Apple st 652'],
  //   ['Hannah', 'Mountain 21'],
  //   ['Michael', 'Valley 345'],
  //   ['Sandy', 'Ocean blvd 2'],
  //   ['Betty', 'Green Grass 1'],
  //   ['Richard', 'Sky st 331'],
  //   ['Susan', 'One way 98'],
  //   ['Vicky', 'Yellow Garden 2'],
  //   ['Ben', 'Park Lane 38'],
  //   ['William', 'Central st 954'],
  //   ['Chuck', 'Main Road 989'],
  //   ['Viola', 'Sideway 1633']
  // ];

  // 选择
  // let sql = "SELECT * FROM customers WHERE address = 'Park Lane 38'"

  // 选择转义
  // let adr = 'Mountain 21'
  // let sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr)

  // 占位符
  // let adr = 'Mountain 21'
  // let sql = 'SELECT * FROM customers WHERE address = ?'

  //排序
  // let sql = "SELECT * FROM customers ORDER BY name"
  // let sql = 'SELECT * FROM customers ORDER BY name DESC'

  //删除
  // let sql = "DELETE FROM customers WHERE address = 'Mountain 21'"

  //更新
  // let sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"  

  //限制
  // let sql = "SELECT * FROM customers lIMIT 5"
  // let sql = "SELECT * FROM customers lIMIT 5 OFFSET 2"
  // let sql = "SELECT * FROM customers lIMIT 2,5"
  con.query(sql, (err, res) => {
    if (err) throw err;
    console.log('select success!');
    console.log('----------------');
    console.log(res);
  })
});
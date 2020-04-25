## 创建连接
- 可以连接到dbms,也可以连接到数据库
```javascript
  createConnection( {

  })
```
## 创建表
- 为表创建主键（还过着没有
```SQL
CREATE TABLE demo (id TYPE(NUM)...)
con.query(sql,callback)
```

## 插入数据
- insert one
```sql
INSERT INTO tableName (para1, para 2) VALUES (val1, vla2)
```
- insert more
```sql
INSERT INTO tableName (parp1, parp2) VALUES ?
con.query(sql, values, callBack)
```
## 选择
```sql
SELECT name FROM tableName
```
- query回调函数的第三个参数是包含每个res信息的数组
## 过滤
```sql
SELECT * FROM tableName WHERE para = demo
SELECT * FROM tableName WHERE para LIKE demo
```
- 转义查询（防止sql注入) mysql.escape()
- 占位符 => ?
- 多个占位符 => ? ? ?(使用数组作为？的参数传入)

## 排序
- ORDER BY (?DESC)

## 删除
- DELETE FROM tableName WHERE ...
- 如果省略WHERE将删除所有记录
- affectedRows => 显示受影响的列数

## 删除表
```sql
DROP TABLE tableName
```
- 防止其他原因不能正常删除关键字 `IF EXISTS`
- 如果表不存在warningCount非零

## 更新
```sql
UPDATE tableName SET prop = demo1 WHERE prop = demo2
```

## 限制
```sql
SELECT * FROM tableName LIMIT 5
SELECT * FROM tableName LIMIT 5 OFFSET 2
SELECT * FROM tableName LIMIT 2, 5
```

## 连接

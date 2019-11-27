![](README.assets/logo.png)

# mysql-ithm

一款nodejs操作mysql数据库的orm库

* 黑马程序员：[http://www.itheima.com](http://www.itheima.com/)
* 官方文档地址：[https://github.com/kxzkane/mysql-ithm](https://github.com/kxzkane/mysql-ithm)
* npm地址：[https://www.npmjs.com/package/mysql-ithm](https://www.npmjs.com/package/mysql-ithm)

* 技术亮点
  * (1)基于ORM技术，使用对象的方式来操作mysql数据库，而无需编写任何sql语句
  * (2)支持数据库的常规操作`增删改查`，API极为简洁，且高效智能。
  * (3)支持条件查询 与 分页查询
  * (4)支持原生sql语句，如果我们的框架无法满足您的需求，我们也提供了特殊的API可以直接使用sql语句来操作
  * (5)支持链式语法

# 01-安装

* 安装`mysql-ithm`
  * `npm install mysql-ithm`



# 02-导入

```javascript
//导入模块
const hm = require('mysql-ithm');
```



# 03-使用(example)

```javascript
//1.导入模块
const hm = require('mysql-ithm');

//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
hm.connect({
    host: 'localhost',//数据库地址
    port:'3306',
    user: 'root',//用户名，没有可不填
    password: 'root',//密码，没有可不填
    database: 'hm'//数据库名称
});

//3.创建Model(表格模型：负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let studentModel = hm.model('student',{
    name:String,
    age:Number
});

//4.调用API：添加数据
studentModel.insert({name:'张三10',age:30},(err,results)=>{
    console.log(err);
    console.log(results);
    if(!err) console.log('增加成功');
});
```



# 04-API Document

## 1.1-增加操作



```javascript
studentModel.insert({name:'张三10',age:30},(err,results)=>{
    console.log(err);
    console.log(results);
    if(!err) console.log('增加成功');
});
```

* 批量增加
```javascript
var arr = [];
for (var i = 1; i <= 10; i++) {
    arr.push({ name: '张三', age: 30 })
}

studentModel.insert(arr, (err, results) => {
    console.log(err);
    console.log(results);
    if (!err) console.log('增加成功');
});
```



##  1.2-查询操作

### 1-查询所有数据

```javascript
//2.1 查询所有数据
studentModel.find((err,results)=>{
    console.log(results);
});
```

### 2-查询数据库指定字段数据

```javascript
//2.2 根据数据库字段查询部分数据
// ['name'] : 将要查询的字段放入数组中
studentModel.find(['name'],(err,results)=>{
    console.log(results);
});
```

### 3-条件查询

```javascript
//2.3 根据条件查询数据
// 'id=1' : 查询id为1的数据 (查询条件可以参考sql语句)
//例如 'age>10' : 查询age超过10的数据 
//例如 'name>"张三"' : 查询名字为张三的数据，注意字符串添加引号
studentModel.find('id>21',(err,results)=>{
    console.log(results);
});
```

### 4-分页查询

```javascript
//2.4 分页查询
//  第一个参数options对象有三个属性 {where:分页查询条件（可选）， number:页数 ， count：每页数量}
studentModel.limit({where:'age>28',number:1,count:10},(err,results)=>{
    console.log(results);
});
```

## 1.3-修改操作

### 1-修改所有数据

```javascript
//3.1 将数据库中所有的name字段值：修改为李四
studentModel.update({name:'李四'},(err,results)=>{
    console.log(results);
});
```

### 2-条件修改

```javascript
//3.2 将数据库中 id = 1 的数据，age修改为30
studentModel.update('id=1',{age:30},(err,results)=>{
    console.log(results);
});

//3.3 将数据库中所有 age < 20 的数据，name修改为王五
studentModel.update('age<20',{name:'王五'},(err,results)=>{
    console.log(results);
});
```



## 1.4-删除操作

```javascript
//4.1 删除所有 age>30 的数据
studentModel.delete('age>20',(err,results)=>{
    console.log(results);
});

//4.2 清空表中所有数据
studentModel.delete((err,results)=>{
    console.log(results);
});
```



## 1.5-执行自定义SQL语句

```javascript
studentModel.sql('insert into student(name,age) values("andy",20)',(err,results)=>{
    console.log(results);
});
```



## 1.5-删除表格（慎用）

```javascript
studentModel.drop((err,results)=>{
    console.log(results);
});
```



## 1.7-链式语法支持

```javascript
studentModel.insert({name:'张三22',age:22},(err,results)=>{
    console.log(err);
    console.log(results);
})
.find('name="张三22"',(err,results)=>{
    console.log(err);
    console.log(results);
});
```


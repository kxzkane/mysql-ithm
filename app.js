//1.导入模块
const hm = require('./index.js');

//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
hm.connect({
    host: 'localhost',//数据库地址
    port: '3306',
    user: 'root',//用户名，没有可不填
    password: 'root',//密码，没有可不填
    database: 'hm'//数据库名称
});

//3.创建Model(表格模型：负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let studentModel = hm.model('student', {
    name: String,
    age: Number
});

//4.调用API：添加数据
var arr = [];
for (var i = 1; i <= 10; i++) {
    arr.push({ name: '张三10', age: 30 })
};

studentModel.insert(arr, (err, results) => {
    console.log(err);
    console.log(results);
    if (!err) console.log('增加成功');
});

// studentModel.find('name="111"',(err,results)=>{
//     console.log(err);
//     console.log(results);
    
    
// })
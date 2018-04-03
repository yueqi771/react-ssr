const express = require('express');
const serverRender = require('./untils/server-render')
const fs = require('fs');   // 读取文件的依赖
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, '../favicon.ico')));
app.use(session({
    maxAge: 10 * 60 * 1000,
    name: 'tid',
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class',
}))

// 定义开发环境
const isDev = process.env.NODE_ENV = 'development';

app.use('/api/user', require('./untils/handle-login'))
app.use('/api', require('./untils/proxy'))

if(!isDev){
    // 生产环境下执行的操作
    const serverEntry = require('../dist/server-entry');

    // 同步读取客户端html文件
    const template = fs.readFileSync(path.join(__dirname, "../dist/server.ejs"), "utf8")

    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('*', function(req,res) {

        serverRender(serverEntry, template, req, res).catch(next)
    })
}else{
    // 开发环境状态下的服务端渲染
    const devStatic = require('./untils/dev-static');
    devStatic(app)
}

// 对catch抛出的错误做出处理
app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).send(error)
})

app.listen(3333, function(){
    console.log('server is listening on 3333');
})

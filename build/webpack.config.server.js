// 定义绝对路径
const path = require('path');
const webpack = require('webpack')
const webpackMerge = require('webpack-merge'); // 整合webpack公用配置
const baseConfig = require('./webpack.config.base.js');

module.exports=  webpackMerge(baseConfig, {
    // js打包出来的内容使用与哪个执行环境  web,node····
    target: 'node',
    // 入口
    entry: {
        app: path.join(__dirname,'../client/server-entry.js')
    },

    // webpack打包的时候不加入打包的依赖
    externals: Object.keys(require('../package.json').dependencies),

    // 出口
    output:{
        // 打包出来的文件的名字--- [name] 变量即入口文件下面的app的名字，[hash]用作处理缓存的哈希值
        filename: "server-entry.js",
        // 打包出来的文件路径，放到跟build同级目录dist文件夹下面
        path: path.join(__dirname, '../dist'),
        // 加载引用静态资源的前面的路径
        publicPath: '/public',
        // 打包出来的js使用的模块化的方案 umd , cmd , common.js ,global等等
        libraryTarget:'commonjs2'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_BASE': JSON.stringify('http://127.0.0.1:3000')
        })
    ]
})

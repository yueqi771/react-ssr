// 定义绝对路径
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // 整合webpack公用配置
const baseConfig = require('./webpack.config.base.js');
// 判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development';

//

const config = webpackMerge(baseConfig, {
    // 入口
    entry: {
        app: path.join(__dirname,'../client/app.js')
    },

    // 出口
    output:{
        // 打包出来的文件的名字--- [name] 变量即入口文件下面的app的名字，[hash]用作处理缓存的哈希值
        filename: "[name].[hash].js",
        // 打包出来的文件路径，放到跟build同级目录dist文件夹下面
        path: path.join(__dirname, '../dist'),
        // 加载引用静态资源的前面的路径
        publicPath: '/public/',
    },


    // webpack的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../client/template.html'),
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + path.join(__dirname,'../client/server.template.ejs'),
            filename: 'server.ejs'
        })
    ]
})

if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '3007',
        // contentBase:  path.join(__dirname, '../dist'),
        hot: true, // 启动hot module replacement
        overlay: {  // 错误提示黑色背景
            errors: true,
        },
        publicPath:'/public/',
        historyApiFallback: { //
            index: '/public/index.html'
        },
        proxy: {
            '/api': 'http://localhost:3333'
        }
    }

    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;

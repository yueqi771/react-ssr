const path = require('path');

module.exports = {
    resolve:{
        extensions: ['.js', '.jsx']
    },
    // webpack的主要配置
    module: {
        rules: [
            // 每次代码编译的时候使用eslint检查
            {
                enforce: 'pre',
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.join(__dirname, '../node_modules'),
                ]
            },
            // 编译loader
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules'),
                ]
            }
        ]
    },
}

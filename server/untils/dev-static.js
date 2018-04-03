const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');
const serverRender = require('./server-render')

// 将文件写入内存，加快文件读取速度
const MemoryFs = require('memory-fs');

const serverConfig = require('../../build/webpack.config.server.js')

// 获取template.html
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3007/public/server.ejs')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
    })
}

// 获取项目中依赖的模块
const NativeModule = require('module'); // module.exports
const vm = require('vm');

const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} };

    /*
        .warp方法把执行的js代码进行包装
        `function(exports, require, module, filename, __dirname){
            ...bundle // 需要执行的代码
        }`
    */
    const wrapper = NativeModule.wrap(bundle);

    // 执行wrap的代码
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true,
    })

    // 指定 在当前上下文环境下执行wrap里面的代码
    const result = script.runInThisContext();
    // 使用m.exorts作为调用者执行result代码
    // 这里require的是当前环境的node_modules, 所以可已解决存在多个mobx实例的问题
    result.call(m.exports, m.exports, require, m);
    // 最后把m, 即module.exports里面的东西赋值在m对象上
    return m;
}

const Module = module.constructor;

const mfs = new MemoryFs;
// 监听entry文件，如果有变动重新去打包；
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs;

// 存放解析后的读取内容
let serverBundle;

serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    // 读取文件内容
    const bundle = mfs.readFileSync(bundlePath,'utf-8');

    // 将读取出来的字符串转化成js可以解析的格式
    const m = getModuleFromString(bundle, 'server-entry.js');
    serverBundle = m.exports
})

module.exports = function(app) {
    // 将所有静态文件代理到webpack-dev-server所启动的服务器上面
    app.use('/public', proxy({
        target: 'http://localhost:3007'
    }))

    app.get('*',function(req, res, next){
        if(!serverBundle) {
            return res.send('webpack的compile正在执行，服务端渲染请稍后....')
        }

        getTemplate().then(template => {
            return serverRender(serverBundle, template, req, res)
        }).catch(next)

    })
}

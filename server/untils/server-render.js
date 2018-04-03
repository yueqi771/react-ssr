const serialize = require('serialize-javascript');
const ejs = require('ejs');
const asyncBootstrap = require('react-async-bootstrapper').default;
const ReactDomServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const SheetsRegistry = require('react-jss').SheetsRegistry;
const create = require('jss').create;
const preset = require('jss-preset-default').default;
const createMuiTheme = require('material-ui/styles').createMuiTheme;
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default;
const colors = require('material-ui/colors');

const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson()
        return result
    }, {})
}

module.exports = (bundle, template, req, res) => {
    return new Promise((resolve, reject) => {
        const createStoreMap = bundle.createStoreMap;
        const createApp = bundle.default;

        const routerContext = {};
        const stores = createStoreMap();

        // 服务端渲染时就开始加载样式
        const sheetsRegistry = new SheetsRegistry();
        const jss = create(preset());
        jss.options.createGenerateClassName = createGenerateClassName;
        const theme = createMuiTheme({
            palette: {
                primary: colors.lightBlue,
                accent: colors.pink,
                type: 'light'
            }
        })

        const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url)

        asyncBootstrap(app).then(() => {
            // 如果路由中有redirect，那么直接把路由定向到redirect的页面
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url);
                res.send();
                return
            }

            // 获取当前页面需要显示的title,description等
            const helmet = Helmet.rewind();

            // 更新客户端mobx的值
            const state = getStoreState(stores)
            const content = ReactDomServer.renderToString(app);

            const html = ejs.render(template, {
                appString: content,
                initialState: serialize(state),
                meta: helmet.meta.toString(),
                title: helmet.title.toString(),
                style: helmet.style.toString(),
                link: helmet.link.toString(),
                materialCss: sheetsRegistry.toString(),
            })

            res.send(html)
            resolve()
        }).catch(reject)
    })
}

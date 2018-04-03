// module.exports = function
const axios = require('axios');
const queryString = require('query-string');
const baseUrl = 'http://cnodejs.org/api/v1';

module.exports = function(req, res, next) {
    const path = req.path;

    // 获取存储到session中的用户信息
    const user = req.session.user || {};

    // 是否需要accessToken
    const needAccessToken = req.query.needAccessToken;

    // 如果需要token但是没有token的时候， 服务器返回提示用户登陆
    if(needAccessToken && !user.accessToken) {
        res.status(401).send({
            success: false,
            msg: 'need login'
        })
    }

    // 服务器返回不包含needAccesstoken的数据
    const query = Object.assign({}, res.query, {
        accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : '',
    });
    if(query.needAccessToken) { delete query.needAccessToken }

    axios(`${baseUrl}${path}`, {
        method: req.method, // 使用服务器的method
        params: query,
        data: queryString.stringify(Object.assign({}, req.body, {
            accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : '',
        })),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if(response.status === 200) {
            res.send(response.data)
        } else{
            res.status(response.status)
        }
    }).catch(error =>{
        if(error.response) {
            res.status(500).send(error.response.data)
        }else{
            res.status(500).send({
                success: false,
                msg: '未知错误'
            })
        }
    })
}

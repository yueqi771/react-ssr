const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

router.post('/login', function(req, res, next) {
    axios.post(`${baseUrl}/accesstoken`, {
        accesstoken: req.body.accessToken
    }).then( data => {
        if(data.status === 200 && data.data.success) {
            req.session.user = {
                accessToken: req.body.accessToken,
                loginName: data.data.loginname,
                id: data.data.id,
                avatarUrl: data.data.avatar_url
            }

            res.json({
                success: true,
                data: data.data
            })
        }
    }).catch( err => {
        if(err.response) {
            res.json({
                success: false,
                data: err.response.data
            })
        }else{
            next(err)
        }
    })
})

module.exports = router;

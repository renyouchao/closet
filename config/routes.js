/**
 * Created by renyouchao on 14-3-12.
 */
var routes = require('../api/controllers'),
    isignup = require('../api/controllers/isignup'),
    ilogin = require('../api/controllers/ilogin'),
    cookieSecure = require('../api/policies/cookieSecure'),
    sessionSecure = require('../api/policies/sessionSecure');

module.exports = function (app, config) {
    //主页
    app.get('/', cookieSecure, routes.index);
    //用户注册第一步（账号注册）
    app.put('/i/signupacc', isignup.signupacc);
    //用户注册第二步（衣橱注册）
    app.put('/i/signupcloset',sessionSecure,isignup.signupcloset);
    //用户注册第三步（sns关注）
    app.put('/i/signupsns',sessionSecure,isignup.signupsns);


    //用户进入登录
    app.get('/i/enterlogon',ilogin.entenlogon);
    //用户登录
    app.post('/i/logon',ilogin.logon);
};
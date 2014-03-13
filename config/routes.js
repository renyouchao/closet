/**
 * Created by renyouchao on 14-3-12.
 */
var routes = require('../api/controllers'),
    user = require('../api/controllers/user');

module.exports = function (app, config) {
        //主页
        app.get('/', routes.index);
        //用户邮箱注册
        app.get('/i/account/signup',user.signup);
};
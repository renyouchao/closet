/**
 * Created by renyouchao on 14-3-12.
 */
var routes = require('../api/controllers');

module.exports = function (app, config) {
        app.get('/', routes.index);
//        app.get('/users', user.list);
};
/**
 * Created by renyouchao on 14-3-12.
 */
var routes = require('../app/routes');
var user = require('../app/routes/user');

module.exports = function (app, config) {
        app.get('/', routes.index);
        app.get('/users', user.list);
};
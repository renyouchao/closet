/**
 * Created by renyouchao on 14-3-12.
 */
var express = require('express');
var path = require('path');

module.exports = function (app, config) {
        // all environments
        app.set('port', process.env.PORT || 3000);
        app.set('views', path.join(__dirname,'../api/views'));
        app.set('view engine', 'ejs');
        app.use(express.logger());
        app.use(express.compress());
        app.use(express.methodOverride());
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.cookieParser('your mother'));
        app.use(express.session());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
};
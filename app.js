/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var RedisStore = require('connect-redis')(express);
var mongoose = require('mongoose');
var redis = require("redis");
var redisclient = redis.createClient(6379, 'redis-db');
var mongoclient = mongoose.connect('mongodb://mongo-db/zeus?poolSize=4');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.cookieParser('firstblood'));
app.use(express.session({
    secret: '53247cfff44d425e5dd6953f',
    store: new RedisStore({
        client: redisclient,
        ttl : 3600
    })
}));
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var express = require('express');
var RedisStore = require('connect-redis')(express);
var mongoose = require('mongoose');
var redis = require("redis");
var redisClient = redis.createClient(6379, 'redis-db');


mongoose.connect('mongodb://mongo-db/zeus?poolSize=4');

redisClient.on("error", function (err) {
        console.log("error " + err);
});



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.cookieParser('firstblood'));
app.use(express.session({
        secret: 'password',
        store: new RedisStore({
                client: redisClient
        })
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
});

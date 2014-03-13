/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
require('./config/express')(app);
require('./config/mongodb');
require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
});

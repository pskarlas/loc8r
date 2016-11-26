var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use('/', routes);


app.listen(3000, function() {
    console.log("Server is running....");
});
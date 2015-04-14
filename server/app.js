var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//define routers
var guestRouter = express.Router();
var hostRouter = express.Router();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile('/index.html');
});

guestRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.use('/guests', guestRouter);
app.use('/host', hostRouter);

require('./routers/guestRouter')(guestRouter);
require('./routers/hostRouter')(hostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;

global.init = require('./config.json');
global.init.version = require('./package.json').version;
/////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon.ico in /public
app.use(favicon(path.join(__dirname, 'client/public/scoreboard', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('dfinsfnstcoytounrgw'));
app.use(express.static(path.join(__dirname, 'client/public/')));
app.use(session({
    name: 'shroom',
    secret: 'kytddkhovoqyfjgfhch'
}));
//my tiny module :)
require('./server/utlis/modules');
//String.change_to_lower();
//
require('./server/routes/root')(app);

module.exports = app;

var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var flash = require('req-flash');
var logger = require('morgan');
var path = require('path');
var cors = require('cors');
var md5 = require('md5');

/* Database connection */
require("./mongo");

/* require all Models */
require("./model/admin");
require("./model/users");
require("./model/forgotpass");
require("./model/user_groups");
require("./model/emailtemplate");
require("./model/sendemail_list");
require("./model/plan");
require("./model/role");
require("./model/realestate");
require("./model/space_attribute");
require("./model/purpose_attribute");
require("./model/automobile");
require("./model/user_plan");
require("./model/boats");
require("./model/globtech");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var supportRouter = require('./routes/supportapi');

var app = express();

app.use(session({ 
	secret: 'somerandonstuffs',
	resave: false,
	saveUninitialized: false,
	cookie: { expires: 6000000 }
}));

app.use(flash());

app.use(cors());

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', supportRouter);

/* catch 404 and forward to error handler */ 
app.use(function(req, res, next) {
	next(createError(404));
});


/* error handler */ 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');
var http = require('http');
var session = require('express-session'); 
var app = express();

// view engine setup
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('trust proxy', 1);

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret : 'user_info',
	resave : false,
	saveUninitialized: false,
	cookie : {maxAge: 80000}
}));

app.get('/', routes.login);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/index', routes.index);
app.post('/register', routes.register);
app.post('/user_info', routes.user_info);
app.post('/get_user_info', routes.get_user_info);
app.post('/account', routes.account);
app.post('/get_account', routes.get_account);
app.get('/record', routes.record);
app.get('/info_modify', routes.info_modify);
app.get('/pwd_modify', routes.pwd_modify);
app.get('/bind_card', routes.bind_card);
app.get('/cash', routes.cash);
app.get('/friend', routes.friend);
app.get('/score', routes.score);
app.get('/failed', routes.failed);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

http.createServer(app).listen(app.get('port'), function(){  
	console.log('Express server listening on port ' + app.get('port'));
});

var user_dao = require('../dao/user_dao');
var session = require('express-session');

exports.login = function(req, res){
	res.render('login');
};
exports.doLogin = function(req, res){
	user_dao.login(req, res, req.body.email, req.body.password);
};
exports.logout = function(req, res){
	res.redirect('/');
};
exports.register = function(req, res){
	user_dao.register(req, res);
}
exports.index = function(req, res){
	console.log(req.body);
	console.log(req.header);
	if (req.session) {
		console.log("cookie:", req.cookie);
		console.log(session.secret);
		res.render('index');
		console.log("index");
	} else {
		res.redirect('/');
		console.log("login");
	}
};
exports.user_info = function(req, res){
	res.render('user_info');
};
exports.account = function(req, res){
	res.render('account');
};
exports.record = function(req, res){
	res.render('record');
};
exports.info_modify = function(req, res){
	res.render('info_modify');
};
exports.pwd_modify = function(req, res){
	res.render('pwd_modify');
};
exports.bind_card = function(req, res){
	res.render('bind_card');
};
exports.cash = function(req, res){
	res.render('cash');
};
exports.score = function(req, res){
	res.render('score');
};

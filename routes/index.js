
var userDao = require('../dao/userDao');

exports.index = function(req, res){
	res.render('index', {title : 'Index' });
};
exports.login = function(req, res){
	res.render('login', { title: '用户登陆'});
};
exports.doLogin = function(req, res, next){
	userDao.doLogin(req, res, next, req.body.username, req.body.password);
};
exports.logout = function(req, res){
	res.redirect('/');
};
exports.register = function(req, res){
	res.render('register');
};
exports.submit = function(req, res, next){
	userDao.addUser(req, res, next);
}
exports.home = function(req, res){
	res.render('home');
};

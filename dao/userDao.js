var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userSqlMapping');
var encrypt = require('../tools/encrypt');

//var pool  = mysql.createPool(conf.mysql);
var pool = mysql.createPool({
	host : "rds2n98xo676g17uk48k.mysql.rds.aliyuncs.com",
	port : 3306,
	user : "shining",
	password : "iatsjtu2011",
	database : "ykt_db"
});

var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:	'1',	
			msg:	'操作失败'
		});
	} else {
		res.json(ret);
	}
}

exports.addUser = function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var param = req.body;
		var id = encrypt.md5(param.username); 
		connection.query(sql.insert, [id, param.username, param.password, 0], function(err, ret){
			if (ret) {
				ret = {
					msg  : "success",
					code : 200
				}
			}
			jsonWrite(res, ret);
			connection.release();
		}); 
	})
}

exports.doLogin = function(req, res, next, username, password) {
	pool.getConnection(function(err, connection) {
		connection.query(sql.SELECT_USER_BY_EMAIL, [username], function(err, rows){
			try {
				if (password === rows[0].PASSWORD) {
					res.redirect('/home');
				} else {
					res.redirect('/login');
				}
			} catch(err) {
				res.redirect('/login');
				console.log(err);
			}
			connection.release();
		});
	})
}



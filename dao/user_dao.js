var mysql = require('mysql');
var sql = require('./sql_mapping');
var encrypt = require('../tools/encrypt');
var pool = require('./mysql_pool').mysql_pool();

var failed = {
	msg  : "failed",
	code : -1 
}

var success = {
	msg  : "success",
	code : 0
}

exports.register = function(req, res) {
	pool.getConnection(function(err, connection) {
		try {
			var param = req.body;
			console.log(param);
			var nick = param.nick;
			var email = param.email; 
			var password = encrypt.md5(param.password); 
			var status = param.status; 
			var type = param.type;
			var account = param.account;	
			var create_time = param.create_time;
			var values = [nick, email, password, status, type, account, create_time];
			connection.query(sql.REGISTER, values, function(err, ret){
				try {
					if (ret){
						res.json(success);
					} else {
						res.json(failed);
					}
					connection.release();
				}
				catch (err){
					res.json(failed);
				}
			}); 
		} catch (err){
			res.json(failed);
		}
	})
}

exports.login = function(req, res, email, password) {
	pool.getConnection(function(err, connection) {
		try{
			var values = [email]; 
			password = encrypt.md5(password);
			connection.query(sql.GET_USER_INFO, values, function(err, rows){
				try {
					if (password === rows[0].PASSWORD) {
						success.msg = rows;
						res.json(success);
					} else {
						res.json(failed);
					}
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});
		} catch(err) {
			res.json(failed);
		}
	})
}

exports.modify_password = function(req, res, email, new_password) {
	pool.getConnection(function(err, connection) {
		try{
			var new_passwrod = encrypt.md5(new_passwrod);
			var values = [new_password, email]; 
			connection.query(sql.MODIFY_PASSWORD, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});
		} catch(err) {
			res.json(failed);
		}
	})
}

exports.bind_card = function(req, res, email, card_id) {
	pool.getConnection(function(err, connection) {
		try{
			var values = [card_id, email]; 
			connection.query(sql.BIND_CARD, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});
		} catch(err) {
			res.json(failed);
		}
	})
}

exports.get_sql_rows = function(req, res, email, sql, type) {
	pool.getConnection(function(err, connection) {
		try{
			var values = [email]; 
			connection.query(sql, values, function(err, rows){
				try {
					if (rows){
						switch (type){
							case "account" : req.session.account = rows;
											 break;
							case "user_info" : req.session.user_info = rows;
											   break;
						}
						res.json(success);						
					}
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});
		} catch(err) {
			res.json(failed);
		}
	})
}

exports.set_account = function(req, res, ins_email, des_email, value) {
	pool.getConnection(function(err, connection) {
		try{

			connection.query(sql.INS_ACCOUNT, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});

			var values = [value, email]; 
			connection.query(sql.INS_ACCOUNT, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});

			connection.query(sql.INS_ACCOUNT, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});

			connection.query(sql.DES_ACCOUNT, values, function(err, rows){
				try {
					if (rows) //TODO: Check row content
				res.json(success);						
				} catch(err) {
					res.json(failed);
				}
				connection.release();
			});
		} catch(err) {
			res.json(failed);
		}
	})
}

var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userSqlMapping');

//var pool  = mysql.createPool(conf.mysql);
//console.log(pool);
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

var callback = function(err, ret, connection) {
	if (ret) {
		ret = {
			code : 200,
			msg  : "增加成功"
		};
	}
	//jsonWrite(res, ret);
	connection.release();
} 

exports.add = function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.body;
			console.log(sql.insert);
			connection.query(sql.insert, [param.username, param.username, param.password, 0], function(err, ret){
				if (ret) {
					ret = {
							msg  : "success",
							code : 200
					}
				}
				connection.release();
			}); 

		})
	}

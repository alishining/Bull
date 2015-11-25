var mysql = require('mysql');

exports.mysql_pool = function(){
	return mysql.createPool({
				host : "rds2n98xo676g17uk48k.mysql.rds.aliyuncs.com",
				port : 3306,
				user : "shining",
				password : "iatsjtu2011",
				database : "ykt_db"
		   });
}


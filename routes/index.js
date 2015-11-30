var user_dao = require('../dao/user_dao');
var sql = require('../dao/sql_mapping');
var session = require('express-session');

exports.login = function(req, res){
	res.render('login');
};
exports.doLogin = function(req, res){
	req.session.email = req.body.email;
	user_dao.login(req, res, req.body.email, req.body.password);
};
exports.logout = function(req, res){
	res.redirect('/');
};
exports.register = function(req, res){
	user_dao.register(req, res);
}
exports.index = function(req, res){
	if (req.session.email != undefined) {
		res.render('index');
	} else {
		res.redirect('/');}
};
exports.user_info = function(req, res){
	var default_null = "未设置";
	/*
	for (x in req.session.user_info[0]) {
		switch(x) {
			case "NAME" : if (req.session.user_info[0].NAME == null){
							  req.session.user_info[0].NAME = default_null; 
						  };
						  break;
			case "SEX" : if (req.session.user_info[0].SEX == null){
							 req.session.user_info[0].SEX = default_null;
						 };
						 break;
			case "MINORITY" : if (req.session.user_info[0].MINORITY == null){
								  req.session.user_info[0].MINORITY = default_null;
							  };
							  break;
			case "HOME_TOWN" : if (req.session.user_info[0].HOME_TOWN == null){
									req.session.user_info[0].HOME_TOWN = default_null;
							   };
							   break;
			case "PHONE" : if (req.session.user_info[0].PHONE == null){
							   req.session.user_info[0].PHONE = default_null;
						   };
						   break;
			case "CITY" :  if (req.session.user_info[0].CITY == null){
							   req.session.user_info[0].CITY = default_null;
						   };
						   break;
			case "SCHOOL" : if (req.session.user_info[0].SCHOOL == null){
								req.session.user_info[0].SCHOOL = default_null;
							};
							break;
			case "ACADEMY" : if (req.session.user_info[0].ACADEMY == null){
								 req.session.user_info[0].ACADEMY = default_null;
							 };
							 break;
			case "CLASS" : if (req.session.user_info[0].CLASS == null){
							   req.session.user_info[0].CLASS = default_null;
						   };
						   break;

		}
	}*/
	console.log(req.session.user_info[0]);
	var v_email = req.session.user_info[0].EMAIL;
	var v_nick = req.session.user_info[0].NICK;
	var v_status1 = req.session.user_info[0].STATUS;
	var v_type = req.session.user_info[0].TYPE;
	var v_name = req.session.user_info[0].NAME;
	var v_sex = req.session.user_info[0].SEX;
	var v_minority = req.session.user_info[0].MINORITY;
	var v_home_town = req.session.user_info[0].HOME_TOWN;
	var v_phone = req.session.user_info[0].PHONE;
	var v_city = req.session.user_info[0].CITY;
	var v_school = req.session.user_info[0].SCHOOL;
	var v_academy = req.session.user_info[0].ACADEMY;
	var v_class1 = req.session.user_info[0].CLASS;
	res.render('user_info', {email : v_email, 
							 nick  : v_nick,
							 status1: v_status1,
							 type  : v_type,
							 name  : v_name,
							 sex   : v_sex,
							 minority:  v_minority,
							 home_town: v_home_town,
							 phone : v_phone,
							 city  : v_city,
							 school : v_school,
							 academy : v_academy,
							 class1 : v_class1});
};
exports.get_user_info = function(req, res){
	var email = req.session.email; 
	user_dao.get_sql_rows(req, res, email, sql.GET_USER_INFO, "user_info");
};
exports.account = function(req, res){
	console.log(req.session.account);
	var value = req.session.account[0].ACCOUNT;
	res.render('account', {account : value});
};
exports.get_account = function(req, res){
	var email = req.session.email;
	user_dao.get_sql_rows(req, res, email, sql.GET_ACCOUNT, "account");
}
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
exports.friend = function(req, res){
	res.render('friend');
};
exports.failed = function(req, res){
	res.render('failed');
}


var user = {
	insert:'INSERT INTO user_info(id, email, password, status) VALUES(?,?,?,?)',
	SELECT_USER_BY_EMAIL : 'SELECT PASSWORD FROM USER_INFO WHERE EMAIL = ?', 
	update:'update user set name=?, age=? where id=?',
	deleted: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

module.exports = user;

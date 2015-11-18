
var user = {
	insert:'INSERT INTO user_info(id, email, password, status) VALUES(?,?,?,?)',
	update:'update user set name=?, age=? where id=?',
	deleted: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

module.exports = user;

'use strict';
const DaoUtil = require('./DaoUtil');
class UserDao {
	constructor() {
		DaoUtil.dbFactory();
	}
	add(user) {
		let username = DaoUtil.escape(user.Username);
		let password = DaoUtil.escape(user.Password);
		let sql = 'INSERT INTO user (username, password) VALUES ('+username+','+password+')';
		DaoUtil.session(sql);
	}
}

module.exports = UserDao;
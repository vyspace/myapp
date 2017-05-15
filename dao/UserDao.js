'use strict';
const DaoUtil = require('./DaoUtil');
class UserDao {
	constructor() {
		
	}
	add(user) {
		let promise = new Promise(function(resolve, reject) {
			let sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
			DaoUtil.sessionTrans(sql, [user.Username, user.Password]).then(function() {
				resolve();
			}).catch(function(err) {
				reject(err);
			});
		});	
		return promise;	
	}
	delete(id) {
		let sql = 'DELETE FROM user WHERE id = ?';
		DaoUtil.sessionTrans(sql, [id]);
	}
	load(username) {
		let promise = new Promise(function(resolve, reject) {
			let sql = 'SELECT * FROM user where username like ?';
			DaoUtil.session(sql, ['%'+username+'%']).then(function(results) {
				resolve(DaoUtil.row2Json(results));
			}).catch(function(err) {
				reject(err)
			});
		});	
		return promise;	
	}
	update(user) {
		let sql = 'UPDATE user'
	}
}

module.exports = UserDao;
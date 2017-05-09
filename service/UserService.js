'use strict';
const UserDao = require('../dao/UserDao'),
	User = require('../model/User');
let userDao = Symbol('userDao');
class UserService {
	constructor() {
		this[userDao] = new UserDao();
	}
	add(user){
		var t = this;
		let promise = new Promise(function(resolve, reject) {
			t[userDao].load(user.username).then(function(data) {
				if(data.length > 0) {
					reject();
				}
				else {
					t[userDao].add(user).then(function(resolve) {
						resolve();
					});
				}
			});
		});
		return promise;
	}
	load(username) {
		let promise = new Promise(function(resolve) {
			this[userDao].load(username).then(function(data) {
				resolve(data);
			});
		}.bind(this));	
		return promise;	
	}
}
module.exports = UserService;
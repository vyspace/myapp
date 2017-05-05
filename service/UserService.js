'use strict';
const UserDao = require('../dao/UserDao'),
	User = require('../model/User');
let userDao = Symbol('userDao');
class UserService {
	constructor() {
		this[userDao] = new UserDao();
	}
	add(){
		let user = new User('test03', '12345678');
		this[userDao].add(user);
	}
}
module.exports = UserService;
'use strict';
let username = Symbol('username'),
	password = Symbol('password');
class User {
	constructor(_username='', _password='') {
		this[username] = _username;
		this[password] = _password;
	}
	get Username() {
		return this[username];
	}
	set Username(value) {
		this[username] = value;
	}
	get Password() {
		return this[password];
	}
	set Password(value) {
		this[password] = value;
	}
}
module.exports = User;
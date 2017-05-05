'use strict';
let username = Symbol('username'),
	password = Symbol('password');
class User {
	constructor(username='', password='') {
		this[username] = 'aaa';
		this[password] = 'bbb';
	}
	get Username() {
		return this;
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
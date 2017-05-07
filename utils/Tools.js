'use strict';
let uid = require('uid-safe');
class Tools {
	static getUUID() {
		let promise = new Promise(function(reslove) {
			uid(18, function (err, uuid) {
				if (err) {
					  throw err;
				}
				else {
					reslove(uuid);
				}
			});
		});
		return promise;
	}
}

module.exports = Tools;
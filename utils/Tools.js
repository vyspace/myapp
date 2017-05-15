'use strict';
let uid = require('uid-safe'),
	fs = require('fs');
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
	static getJsonFile(_path, _key) {
		let obj = null;
		if(!/test$/i.test(_path)){
			_path += '.json';
		}
		try {
			let str = fs.readFileSync(_path, 'utf8');
			obj = JSON.parse(str);
		}
		catch(err) {
			if(err) throw err
		}
		return obj;
	}
}

module.exports = Tools;
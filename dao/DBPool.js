'use strict';
let mysql = require('mysql'),
	config = require('config'),
	pool = Symbol('pool');
class DBPool {
	constructor() {
		this[pool] = mysql.createPool({
			host: config.get('mysql.host'),
			user: config.get('mysql.username'),
			password: config.get('mysql.password'),
			database: config.get('mysql.database'),
			connectionLimit: config.get('mysql.connectionLimit'),
			connectTimeout: config.get('mysql.connectTimeout'),
			priorityRange: config.get('mysql.priorityRange')
		});
	}
	setConnection() {
		var t = this;
		let promise = new Promise(function(resolve, reject) {
			console.log("数据库连接中...")
			t[pool].getConnection(function(err, connection) {
				if(err) {
					console.log("数据库链接失败...");
					reject(err);
				} 
				else {
					console.log("数据库链接成功，正在启动服务器...");
					resolve();
				}
			});
		});
		return promise;
	}
	openSession() {
		let t = this;
		let promise = new Promise(function(resolve) {
		    t[pool].getConnection(function(err, connection) {
		    	if(err) {
		    		throw err;
		    	}
		    	else {
		    		resolve(connection);
		    	}
		    })
		});
		return promise;
	}
	openSessionSeries() {
		let t = this;
		let promise = new Promise(function(resolve){
		    t[pool].getConnection(function(err, connection) {
		    	if(err) {
		    		console.log(获取链接session失败);
		    		throw err;
		    		return false;
		    	}
		    	connection.beginTransaction(function(err) {
		    		if(err) {
		    			throw err;
		    			connection.release();
		    		}
		    		else {
			    		async.series(funcArray, function(err, result) {
			    			if(err) {
			    				throw err
			    				connection.rollback(function(err) {
			    					if(err) {
			    						throw err;
			    					}
			    				});
			    			}
			    			else {
			    				connection.commit(function(err) {
				    				if(err) {
				    					connection.rollback(function() {
				    						if(err) {
					    						throw err;
					    					}
				    					});
				    				}
				    			});
			    			}
			    			connection.release();
			    		});
		    		}
		    		
		    	});
		    });
		});
		return promise;
	}
	endSession(connection) {
		connection.release();
	}
	destroy() {
		this[pool].end();
	}
}

module.exports = DBPool;
'use strict';
let config = require('config'),
	mysql = require('mysql'),
	genericPool = require('generic-pool');
let daoUtil = null,
	pool = Symbol('pool');
class DaoUtil {
 	static dbFactory() {
 		const factory = {
 			create: function() {
 				let promise =  new Promise(function(resolve, reject){
			        // let client = mysql.Client;
			        // client.on('connected', function(){
			        //     resolve(client);
			        // });
					let connection = mysql.createConnection({
						host: config.get('mysql.host'),
						post: config.get('mysql.post'),
						user: config.get('mysql.username'),
						password: config.get('mysql.password'),
						database: config.get('mysql.database')
					});
					connection.connect(function(err){
						if(err) {
							reject();
						}
						else {
							resolve(connection);
						}
					});
			    });
			    return promise;
 			},
 			destroy: function(client) {
 				let promise = new Promise(function(resolve){
		        	client.on('end', function(){
						resolve();
					})
		        	client.disconnect()
		        });
		        return promise;
 			}
 		};
 		const opts = {
			max: config.get('mysql.max'),
			min: config.get('mysql.min'),
			idleTimeoutMillis: config.get('mysql.idleTimeoutMillis'),
			priorityRange: config.get('mysql.priorityRange')
		}
 		this[pool] = genericPool.createPool(factory, opts);
    }
    static session(sql) {
    	let t = this;
    	const session = t[pool].acquire();
    	session.then(function(client) {
    		client.query(sql, [], function() {
    			t[pool].release(client);
    		})
    	}).catch(function(err) {
    		if(err) {
    			throw err;
    		}
    	});
    }
    static escape(val) {
    	return mysql.escape(val);
    }
    static drainPool() {
    	let t = this;
    	t[pool].drain().then(function() {
    		t[pool].clear();
    	});
	}
    
}

module.exports = DaoUtil;
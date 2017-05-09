'use strict';
class DaoUtil {
	static session(sql, words) {
		let promise = new Promise(function(resolve){
			g_dbPool.openSession().then(function(connection) {
				connection.query(sql, words, function(err, results, fields) {
    				if(err) {
	    				throw err;
	    			}
	    			else {
	    				resolve(results);
	    			}
	    			connection.release();
	    		});	
			});
		});
		return promise;
	}
	static sessionTrans(sql, words) {
		let promise = new Promise(function(resolve){
			g_dbPool.openSession().then(function(connection) {
				connection.beginTransaction(function(err) {
					if(err) {
		    			throw err;
		    		}
					else {
						connection.query(sql, words, function(err, results, fields) {
			    			if(err) {
			    				throw err;
			    				connection.rollback();
			    			}
			    			else {
			    				connection.commit(function(err) {
				    				if(err) {
				    					connection.rollback();
				    				}
				    				connection.release();
				    				resolve();
				    			});
			    			}
			    		});
					}
				});
    		});
		});
	}
	static row2Json(rows) {
		let str = '';
		try {
			str = JSON.stringify(rows);
			return JSON.parse(str);
		}
		catch(err) {
			throw err;
			return [];
		}
	}
}
module.exports = DaoUtil;
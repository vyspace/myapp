let session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	path = require('path'),
	Tools = require('../utils/Tools');
class Redis {
	static getRedisStore() {
		let config = Tools.getJsonFile(path.join(__rootdir, '/config/redis'));
		return new RedisStore({
			host: config.host,
            port: config.port
		});
	}
}

module.exports = Redis;
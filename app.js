'use strict';
let express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	engine = require('ejs-mate');
const Controller = require('./routes/Controller'),
	Tools = require('./utils/Tools'),
	DBPool = require('./dao/DBPool'),
	Redis = require('./redis/redis');

let app = express();
Object.defineProperty(global, '__rootdir', {
	value:  __dirname,
	writable: false,
	configurable: false
});
Tools.getUUID().then(function(uuid) {
	let sess = session({
		genid: function() {
			return uuid;
		},
		resave: false,
		saveUninitialized: true,
		secret: 'vys.org',
		cookie: { 
			maxAge: 10*24*3600*1000
		},
		store: Redis.getRedisStore()
	});
	let serverPromise = new Promise(function(resolve, reject) {
		// view engine setup
		try {
			app.engine('ejs', engine);
			app.set('views', path.join(__dirname, 'views'));
			app.set('view engine', 'ejs');

			app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
			app.use(logger('dev'));
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: false }));
			app.use(cookieParser());
			app.use(sess);
			app.use(express.static(path.join(__dirname, 'public')));
			Controller.run(app);
		}
		catch(err) {
			console.log("启动中间件出错...")
			throw err;
		}
	
		const dbPool = new DBPool();
		dbPool.setConnection().then(function(){
			global.vys = {};
			Object.defineProperty(global.vys, 'dbPool', {
				value:  dbPool,
				writable: false,
				configurable: false
			});
			resolve();
		}).catch(function(err) {
			reject(err);
		});
	});

	serverPromise.then(function() {
		const server = app.listen(3000, "localhost", function () {
			let host = server.address().address,
				port = server.address().port;
			console.log('服务器已启动，正在监听 http://%s:%s', host, port);
		});
	}).catch(function(err) {
		console.log(err);
		console.log("服务器启动失败");
		process.exit();
	});

});


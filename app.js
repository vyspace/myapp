'use strict';
let express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');
const Controller = require('./routes/Controller');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Controller.run(app);

const server = app.listen(3000, "localhost", function () {
	let host = server.address().address,
		  port = server.address().port;
	console.log('Node server is running and listening at http://%s:%s', host, port);
});


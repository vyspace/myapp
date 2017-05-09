'use strict';
class Controller {
	static run(app) {  
        app.use('/', require('./index'));
        app.use('/login', require('./login'));
        app.use('/login/handler', require('./loginHandler'));
        app.use('/logout', require('./logout'));
        app.use('/register', require('./register'));
        app.use('/register/handler', require('./registerHandler'));
        app.use('/ccap/:time', require('./ccap'));
        app.use('/user/list', require('./userlist'));
        Controller.errorHandler(app);
    }
    static errorHandler(app) {
		app.use(function(req, res, next) {
		  var err = new Error('Not Found');
		  err.status = 404;
		  next(err);
		});

		// error handler
		app.use(function(err, req, res, next) {
		  // set locals, only providing error in development
		  res.locals.message = err.message;
		  res.locals.error = req.app.get('env') === 'development' ? err : {};

		  // render the error page
		  res.status(err.status || 500);
		  res.render('error');
		});
    }
}
module.exports = Controller;

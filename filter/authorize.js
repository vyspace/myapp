'use strict';
exports.authorize = function(req, res, next) {
	if (!req.session.user_id) {
		res.location('/login');
	} 
	else {
		next();
	}
}
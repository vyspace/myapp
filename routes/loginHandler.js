var express = require('express');
var router = express.Router();
const UserService = require('../service/UserService');

/* GET users listing. */
router.post('/', function(req, res, next) {
	let userService = new UserService();
	let username = req.body.username;
	let password = req.body.password;
	userService.load(username).then(function(data) {
		if(data.length > 0) {
			if(username == data[0].username && password == data[0].password){
				//req.session.user_id = username;
				res.location('back');
			}
			else {
				res.redirect('..');
			}
		}
		else {
			res.redirect('..');
		}
	});
});

module.exports = router;

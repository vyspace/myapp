let express = require('express');
let router = express.Router();
const UserService = require('../service/UserService');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('user/login', {title: '登陆', session: req.session})
});
router.post('/', function(req, res, next) {
	let userService = new UserService();
	let username = req.body.username;
	let password = req.body.password;
	userService.load(username).then(function(data) {
		if(data.length > 0) {
			if(username == data[0].username && password == data[0].password){
				req.session.user_id = username;console.log(req.session);
				res.redirect('..');
			}
			else {
				res.location('/login');
			}
		}
		else {
			res.location('/login');
		}
	});
});
module.exports = router;

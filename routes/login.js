let express = require('express');
let router = express.Router();
const UserService = require('../service/UserService');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('user/login', {title: '登陆', session: req.session})
});
router.post('/', function(req, res, next) {
	let userService = new UserService(),
		username = req.body.username,
		password = req.body.password;
	userService.load(username).then(function(data) {
		if(data.length > 0) {
			if(username == data[0].username && password == data[0].password){
				req.session.user_id = username;
				res.redirect('..');
			}
			else {
				req.session.err = '用户名或密码错误';
				res.redirect('/login');
			}
		}
		else {
			req.session.err = '用户名不存在';
			res.redirect('/login');
		}
	}).catch(function(err) {
		if (err) throw err;
	});
});
module.exports = router;

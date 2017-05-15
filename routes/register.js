let express = require('express');
let router = express.Router();
const UserService = require('../service/UserService'),
	User = require('../model/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
	let data = {
		ccapPath: '/ccap/'+ new Date().getTime(),
		err: req.session.err ? req.session.err : ''
	}
	res.render('user/register', {title: '注册', session: req.session, data: data});
});
router.post('/', function(req, res, next) {
	let userService = new UserService(),
		username = req.body.username,
		password = req.body.password,
		ccap1 = req.body.ccap,
		ccap2 = req.session.ccapCode;
	if(username==''||password==''||ccap1==''){
		req.session.err = '信息未填写完整';
		res.redirect('/register');
		return;
	}
	
	ccap1 = ccap1.toLowerCase();
	ccap2 = ccap2.toLowerCase();
	
	if(ccap1 == ccap2) {
		delete req.session.ccapCode;
		let user = new User(username, password);
		userService.add(user).then(function() {
			req.session.user_id = username;
			res.redirect('register/handler');
		}).catch(function() {
			req.session.err = '用户名已存在！';
			res.redirect('/register');
		});
	}
	else {
		req.session.err = '验证码填写错误';
		res.redirect('/register');
	}
});
module.exports = router;

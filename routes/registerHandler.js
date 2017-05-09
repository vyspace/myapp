let express = require('express');
let router = express.Router();
const UserService = require('../service/UserService'),
	User = require('../model/User');
/* GET users listing. */
router.post('/', function(req, res, next) {
	let userService = new UserService(),
		username = req.body.username,
		password = req.body.password,
		ccap1 = req.body.ccap,
		ccap2 = g_ccapCode;console.log(ccap2)
	if(username==''||password==''||ccap1==''){
		req.session.err = '信息未填写完整';
		res.redirect('/register');
		return;
	}
	setTimeout(function(){;},2000);
	
	ccap1 = ccap1.toLowerCase();
	ccap2 = ccap2.toLowerCase();
	if(ccap1 == ccap2) {
		delete global.g_ccapCode;
		let user = new User(username, password);
		userService.add(user).then(function() {
			let data = {
				username: username
			}
			res.render('user/registerHandler', {title: '注册成功', session: req.session, data:data})
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
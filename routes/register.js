let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let data = {
		ccapPath: '/ccap/'+ new Date().getTime(),
		err: req.session.err ? req.session.err : ''
	}
	res.render('user/register', {title: '注册', session: req.session, data: data});
});

module.exports = router;

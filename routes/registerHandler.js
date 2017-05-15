let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('user/registerHandler', {title: '注册成功', session: req.session});
});

module.exports = router;
let express = require('express');
let router = express.Router();
let ccap = require('ccap');

/* GET users listing. */
router.get('/', function(req, res, next) {
	let captcha = ccap(),
		capArr = captcha.get();
	global.g_ccapCode = capArr[0];
	console.log(req.session)
	res.end(capArr[1]);
});

module.exports = router;
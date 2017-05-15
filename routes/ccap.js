let express = require('express');
let router = express.Router();
let ccap = require('ccap');

/* GET users listing. */
router.get('/', function(req, res, next) {
	let ccapcha = ccap(),
		capArr = ccapcha.get();
	req.session.ccapCode = capArr[0];
	res.end(capArr[1]);
});

module.exports = router;
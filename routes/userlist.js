let express = require('express');
let router = express.Router();
let filter = require('../filter/authorize')

/* GET users listing. */
router.get('/', filter.authorize, function(req, res, next) {
	res.render('user/list', {title: "用户别表", session: req.session});
});

module.exports = router;
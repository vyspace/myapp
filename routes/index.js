let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '主页', session: req.session });  	
});

module.exports = router;

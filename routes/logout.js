let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	delete req.session.user_id;
	res.redirect('/');
});

module.exports = router;
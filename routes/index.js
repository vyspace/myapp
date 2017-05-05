let express = require('express');
const UserService = require('../service/UserService');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let userService = new UserService();
	userService.add();
  	res.render('index', { title: 'Express' });
});

module.exports = router;

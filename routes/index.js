let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
	var sess = req.session
	  if (sess.views) {
	    sess.views++
	    res.setHeader('Content-Type', 'text/html')
	    res.write('<p>views: ' + sess.views + '</p>')
	    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
	    //res.end()
	  } else {
	    sess.views = 1
	    //res.end('welcome to the session demo. refresh!')
	  }
	//if(req.session.user_id) {
		res.render('index', { title: '主页' });
	//}
   	
});

module.exports = router;

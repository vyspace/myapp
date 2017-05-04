'use strict';
class Controller {
	static run(app) {  
        app.use('/', require('./index'));
    }
}
module.exports = Controller;

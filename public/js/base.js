'use strict';
(function($) {
	$('#logout').on('click', function() {
		alert(document.cookie);
	});
})(jQuery);

(function($) {
	$('#ccap').on('click', function() {
		let time = new Date().getTime();
		$(this).attr({"src":"/ccap/"+time});
	});
})(jQuery);
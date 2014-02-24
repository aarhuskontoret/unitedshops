var base = (function() {

	return {

		init: function() {
			if($('.flexslider').length) {
				$('.flexslider').flexslider({
					selector : '.slides > li',
					controlNav: false,
					animation: 'slide'
				});
			}

			$('select,input[type="checkbox"],input[type="radio"],input[type="file"]').uniform();
		}
	};

})();

$(document).ready(function() {
	base.init();
});
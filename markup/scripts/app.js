var base = (function() {

	return {

		placeMarkers: function(mapObject) {
			var markers = [];
			var container = $('#shops');
			var shopsList = '<ul>';
			var infowindow = new google.maps.InfoWindow();

			$.getJSON('butikker.json', function(feed) {
				$.each(feed,function(key,data) {
					
					// MARKERS ON MAP
					var infoContentString = '<div class="ggl-maps-info">'+
						'<img src="'+data.logo+'" />'+
						'<p>'+data.adress[0]+'<br>'+data.adress[1]+'<br>'+data.adress[2]+'</p>'+
						'<h4>Åbningstider</h4>';
					for(var i in data.open) {
						infoContentString += '<strong>'+i+'</strong><br>'+
						data.open[i]+'<br>';
					}
						infoContentString += "<div class='links'>"+
							"<a href='http://www.google.dk/maps/dir//"+data.latlng[0]+","+data.latlng[1]+"/' target='_blank'>Rutevejledning</a></div>";
					
					var latlng = new google.maps.LatLng(data.latlng[0],data.latlng[1]);

					var pinUrl = '/img/pins/pin_'+(key+1)+'.png';
					
					var marker = new google.maps.Marker({
						position: latlng,
						map: mapObject,
						icon: pinUrl,
						title: data.name
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(infoContentString);
						infowindow.open(mapObject,marker);

						$('li',container).removeClass('active');
						$('a[data-markerid="'+key+'"]',container).parent().addClass('active');
					});

					markers.push(marker);

					//MARKERS LEFT OF MAP
					shopsList += '<li><a href="#" data-markerid="'+key+'">'+data.name+'</a></li>';
				});

				shopsList += "</ul>";
				container.append(shopsList);
			});

			container.on('click','a',function() {
				var markerid = $(this).data('markerid');
				google.maps.event.trigger(markers[markerid],'click');
				return false;
			});
		},
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
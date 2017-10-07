(function(){
	document.body.classList.add('js');

	var questions = Array.from(document.querySelectorAll('.question-list__question'))

	questions.map(function(element) {
		element.addEventListener('click', function(e){
			var href = element.getAttribute('href');
			var target = document.getElementById(href.replace('#', ''));

			target.classList.toggle('hidden');

			e.preventDefault();
		});
	});

	L.mapbox.accessToken = 'pk.eyJ1Ijoid2VicHJvZ3Jlc3Npb25zIiwiYSI6ImNpbHBsMjFyajAwM292cmx5ejg5dzU4aHYifQ.9N9N0BWRfS-D9tN2uhYfBw';

	var map = L.mapbox.map('map', 'mapbox.streets');
	map.scrollWheelZoom.disable();
	map.setView([51.5225321,-0.0856495], 16);
	var marker = L.marker([51.5225321,-0.0856495]).addTo(map);
	marker.bindPopup('<p class="map__title"><strong>Campus London</strong></p><p class="map__address">4-5 Bonhill St, <br>Shoreditch, <br>London <br>EC2A 4BX</p>').openPopup();
}());
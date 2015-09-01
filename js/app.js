$(document).ready(function() {
	Locator.init(function() { 
		Weather.getWeather(Locator.lat, Locator.lon); 
	});
	var map = $('#map');
	Locator.showPosition(map, map.width(), map.height());
	
	
	var weatherIcon = $('#weather-container');
	var sun = $('#weather-sun');
	Weather.showWeather(weatherIcon, sun);
});
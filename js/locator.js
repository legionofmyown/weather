var Locator = {
	lat: null,
	lon: null,
	located: false,
	callback: null
};

Locator.askLocation = function() {
	
};

Locator.setPosition = function(position) {
	Locator.lat = position.coords.latitude;
	Locator.lon = position.coords.longitude; 
	Locator.located = true;
	if(Locator.callback !== null) {
		Locator.callback();
	}
};

Locator.init = function(callback) {
	Locator.callback = callback;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(Locator.setPosition, Locator.askLocation);
	} else {
		Locator.askLocation();
	}
};

Locator.showPosition = function(container, w, h) {
	if(Locator.located) {
		var latlon = this.lat + "," + this.lon;
		var imgURL = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=8&sensor=false&size=" + w + "x" + h;
		container.html("<img src='" + imgURL + "'>");
	} else {
		setTimeout(function() {
			Locator.showPosition(container, w, h);
		}, 300);
	}
};


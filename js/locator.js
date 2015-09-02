var Locator = {
	lat: null,
	lon: null,
	located: false,
    failed: false,
    photos: []
};

Locator.locationUnavailable = function() {
	Locator.failed = true;
    alert('Sorry, your location is unknown.');
};

Locator.setPosition = function(position) {
	Locator.lat = position.coords.latitude;
	Locator.lon = position.coords.longitude; 
	Locator.located = true;

    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&lat=' + Locator.lat + '&lon=' + Locator.lon;
    url += '&api_key=8053d20a03bc33748f8696eb85cc78e9&nojsoncallback=1';

    $.ajax(
        url,
        {
            success: function(data) {
                for(k in data.photos.photo) {
                    var photo = data.photos.photo[k];
                    var photoURL = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';
                    Locator.photos.push(photoURL);
                }
            },
            error: function(data) {
            }
        }
    );
};

Locator.init = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(Locator.setPosition, Locator.locationUnavailable);
	} else {
		Locator.locationUnavailable();
	}
};

Locator.getRandomImage = function() {
    if(Locator.photos.length == 0) {
        return false;
    } else {
        return Locator.photos[Math.floor(Math.random() * Locator.photos.length)];
    }
};

Locator.showPosition = function(container, w, h) {
    var latlon = this.lat + "," + this.lon;
    var imgURL = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=8&sensor=false&size=" + w + "x" + h;
    container.html("<img src='" + imgURL + "'>");
};


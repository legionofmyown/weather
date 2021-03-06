var Weather = {
	icon: null,
	sunrise: null,
	sunset: null,
	dayLength: null,
	loaded: false,
    failed: false,
    locationName: "",
    weatherName: ""
};

Weather.getWeather = function(lat, lon) {
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric";

	$.ajax(
		url,
		{
			success: function(data) {
                console.log(data);
				Weather.icon = data.weather[0].icon;
				Weather.sunrise = new Date(data.sys.sunrise * 1000);
				Weather.sunset = new Date(data.sys.sunset * 1000);
				Weather.dayLength = Weather.sunset - Weather.sunrise;
				Weather.temp = data.main.temp;
				Weather.loaded = true;
                Weather.locationName = data.name;
                Weather.weatherName = data.weather[0].main;
			},
            error: function() {
                alert('Sorry, your current weather is unknown.');
                Weather.failed = true;
            }
		}
	);
	
};

Weather.currentSunPosition = function() {
	var curDate = new Date();
	var curDiff = curDate - Weather.sunrise;

	var percDiff = Math.round(curDiff / Weather.dayLength * 100);
	
	if(percDiff > 100) {
		percDiff -= 100;
        percDiff *= -1;
	}

	return percDiff;
};

Weather.showWeather = function(container, sun, moon) {
    var imgURL = "http://openweathermap.org/img/w/" + Weather.icon + ".png";
    var perc = Weather.currentSunPosition();

    if(perc < 0) {
        sun.hide();
        moon.attr('src', 'img/' + Moon.getImage());
        moon.show();
        moon.css('left', Math.round(((container.width() + moon.width()) / 100 * -perc - moon.width() )) + 'px');
        container.css('background-color', '#000');
    } else {
        moon.hide();
        sun.show();
        sun.css('left', Math.round(((container.width() + sun.width()) / 100 * perc - sun.width() )) + 'px');
        container.css('background-color', '#aaf');
    }
    $('#weather-icon').remove();
    $('#weather-temp').remove();
    container.prepend($("<img class='floating left' id='weather-icon' src='" + imgURL + "' width='100' height='100'>"));
    container.prepend($("<div class='floating right' id='weather-temp'>" + Math.round(Weather.temp) + " &deg;C</div>"));
};

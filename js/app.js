var app = {};

app.showPosition = function() {
    if(Locator.located) {
        var map = $('#map');
        Locator.showPosition(map, map.width(), map.height());
        Weather.getWeather(Locator.lat, Locator.lon);
    } else if(!Locator.failed) {
        setTimeout(function() {
            app.showPosition();
        }, 300);
    }
};

app.showPhotos = function() {
    if(Locator.located) {
        var container = $('#photos');
        var image = Locator.getRandomImage();
        if(image !== false) {
            container.find('.old').remove();
            container.find('.new').show().attr('class', 'old');
            container.append('<img class="new" src="' + image + '" style="display: none;" />');
        }
    }

    setTimeout(function() {
        app.showPhotos();
    }, 3000);
};

app.showWeather = function() {
    if(Weather.loaded) {
        var container = $('#weather-container');
        var sun = $('#weather-sun');
        var moon = $('#weather-moon');
        Weather.showWeather(container, sun, moon);
        $('#location-name').html(Weather.locationName);
        $('#weather-name').html(Weather.weatherName);
        $('#map img').addClass('rotated');
    } else if(!Weather.failed) {
        setTimeout(function() {
            app.showWeather();
        }, 300);
    }

};

$(document).ready(function() {
	Locator.init();
    app.showPosition();
    app.showWeather();
    app.showPhotos();
});

$(window).resize(function() {
    app.showPosition();
    app.showWeather();
});

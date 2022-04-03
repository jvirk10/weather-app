var button = document.querySelector(".button");
var key = "bffb28bbc1dd682977f9501122aeefd4"
var dailyForecast = function(data, i) {
    var days = "days" + i;
    $(".dayForecast").append("<div class=" + days + "></div>");
    $(".days" + i).append("<p>date<p>");
    $(".days" + i).append("<p>Temp:  " + data.daily[i].temp.max + "<p>");
    $(".days" + i).append("<p>Wind:  " + data.daily[i].wind_speed + "<p>");
    $(".days" + i).append("<p>Humidity:  " + data.daily[i].humidity + "<p>");
}
var weather = function(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + key;
    fetch(url).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            $(".temp").text("temp:" + data.current.temp);
            $(".wind").text("wind:" + data.current.wind_speed);
            $(".humidity").text("humidity" + data.current.humidity);
            $(".uvIndex").text("uv Index:" + data.current.uvi);
            var i = 0;
            for (i == 0; i < 5; i++) {
                dailyForecast(data, i);
            }
        });
}
var glocation = function(city) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key;
    fetch(url).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var name = data[0].name;
            $(".cityName").text(name);
            var lat = data[0].lat;
            var lon = data[0].lon;
            weather(lat, lon);
        });
}
$(".button").click(function() {
    var city = document.querySelector(".city").value;
    glocation(city);
})
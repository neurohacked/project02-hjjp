const request = require('request');

module.exports = {
    getWeatherObj: function(lat, lng, cb) {

        var queryURL = "https://api.darksky.net/forecast/63ff12333f5125605590036f6f111772/" + lat + "," + lng;

        request(queryURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var returned = JSON.parse(body);
                if (returned.alerts) {
                    var alerts = returned.alerts;
                }
                var weatherObj = {
                    summary: returned.daily.summary,
                    alerts : alerts,
                    today: returned.daily.data[0],
                    tomorrow: returned.daily.data[1],
                    day3: returned.daily.data[2],
                    day4: returned.daily.data[3],
                    day5: returned.daily.data[4],
                    day6: returned.daily.data[5],
                    day7: returned.daily.data[6],
                };
                cb(weatherObj);
            } else {
                console.log("Error getting weather info:" + error);
                return;
            }
        });
    }
}

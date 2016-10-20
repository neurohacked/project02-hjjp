var request = require('request');

module.exports = {

    // Get news articles list based on current geoCoordinates and a location type specified by function caller and return callback with result to get processed
    getNewsList: function(address, cb) {
        var newsResultList = [];

        // "https://webhose.io/search?token=de1360f9-bb70-42d4-9144-188c63a822be&format=json&q=president%20(trump%20OR%20clinton)%20(site_type%3Anews%20OR%20site_type%3Ablogs)"
        // "https://webhose.io/search?token=de1360f9-bb70-42d4-9144-188c63a822be&format=json&q=paris%2C%20france%20(terror%20OR%20attack)%20(site_type%3Anews%20OR%20site_type%3Ablogs)"
        // "https://webhose.io/search?token=de1360f9-bb70-42d4-9144-188c63a822be&format=json&q=paris%2C%20france%20(terror%20OR%20attack)%20(site_type%3Anews%20OR%20site_type%3Ablogs)"

        var addressText = address.replace(/,/g , "");
        var addressList = addressText.split(' ');
        var addressQuery = addressList.join('%2C%20');

        var queryURL = 'https://webhose.io/search?token=de1360f9-bb70-42d4-9144-188c63a822be&format=json&q=' + addressQuery + '%20(terror%20OR%20attack)%20(site_type%3Anews%20OR%20site_type%3Ablogs)'

        request(queryURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var returned = JSON.parse(body).posts;
                returned.forEach(function(child) {
                    var minText = (child.text).substring(0, 200) + " ...";
                    var newsObj = {
                        url: child.url,
                        image: child.thread.main_image,
                        date: child.published,
                        site: child.thread.site,
                        title: child.title,
                        text: minText,
                        language: child.language,
                        country: child.thread.country,
                        site_type: child.thread.site_type
                    }
                    newsResultList.push(newsObj);
                });
                cb(newsResultList);
            } else {
                console.log("Error on getting news Locations " + error);
                return;
            }
        });
    }
}

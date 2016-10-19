var request = require('request');

module.exports = {

    // Get travel lodging and bus stop locations list based on current geoCoordinates and a location type specified by function caller and return callback with result to get processed
    getTravelList: function(geoObj, cb) {
        var locationTypeList = ['lodging', 'bus_station', 'train_station', 'subway_station', 'cafe', 'department_store', 'pharmacy', 'restaurant'];
        var travelCounter = 0;
        var travelResultList = [];

        var sourceObj = {
            lat: geoObj.lat,
            lng: geoObj.lng,
            address: geoObj.address,
            name: 'Target Location',
            locationType: 'home',
            choiceHash: geoObj.choiceHash
        };
        travelResultList.push(sourceObj);

        locationTypeList.forEach(function(locationType) {

            var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + geoObj.lat + ',' + geoObj.lng + '&radius=5000&types=' + locationType + '&key=AIzaSyAyysdormtiR7lDE-jHt3Hvf6YLo2NK4Ds'
            request(queryURL, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var returned = JSON.parse(body).results;
                    returned.forEach(function(child) {
                        var travelObj = {
                            lat: child.geometry.location.lat,
                            lng: child.geometry.location.lng,
                            address: child.vicinity,
                            name: child.name,
                            locationType: locationType,
                            choiceHash: geoObj.choiceHash
                        }
                        travelResultList.push(travelObj);
                    });
                } else {
                    console.log("Error on getting travel Locations " + error);
                    return;
                }
                travelCounter++;
                if (travelCounter === locationTypeList.length) {
                    cb(travelResultList);
                }
            });
        })
    }

}

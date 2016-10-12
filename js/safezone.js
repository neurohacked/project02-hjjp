var request = require('request');

module.exports = {

    // Get address in form of street, city, and state and return address object
    getAddressObj: function(address, city, state) {
        if (address) {
            var addressList = address.split(' ');
        } else {
            var addressList = '';
        }
        if (addressList === '' && city === '' && state === '') {
            return 'empty';
        } else {
            var addressObj = {
                addressList: addressList,
                city: city,
                state: state
            };
            return addressObj;
        }
    },

    // Using address and search criteria, use Google Geo API to get Latitude and Longitude of location chosen
    // After results obtained, run get Restaurant method which queries zomato restaurant search API based on geo location
    getGeoObj: function (addressObj, cb) {
        var locationTypeList = ['embassy', 'hospital', 'police', 'airport', 'bank'];
        var query = '';
        var queryList = [];
        var addressList = addressObj.addressList;
        var city = addressObj.city;
        var state = addressObj.state;

        if (addressList) {
            var addressQuery = addressList.join('+');
            queryList.push(addressQuery);
        }
        if (city) {
            queryList.push(city);
        }
        if (state) {
            queryList.push(state);
        }
        query = queryList.join(',+');
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&key=AIzaSyBZgPjyk5ho6Axhr_2dU1Ay3M7rU71HXvs";
        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var returned = JSON.parse(body).results[0];
                var lat = returned.geometry.location.lat;
                var lng = returned.geometry.location.lng;
                var address = returned.formatted_address;
                var geoObj = {
                    lat: lat,
                    lng: lng,
                    address: address
                };

                cb(geoObj);
            } else {
                console.log("Error on getting GeoCoordinates " + error);
            }
        });
    },

    // Get safezone locations
    getSafezoneList: function (geoObj, locationType, cb) {

        var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + geoObj.lat +',' + geoObj.lng + '&radius=5000&types=' + locationType + '&key=AIzaSyCdKTEHizAqhcNWoqo7TjU3WN0E4miTwBc'

        request(queryURL, function (error, response, body) {
            var safezoneResultList = [];
            if (!error && response.statusCode == 200) {
                var returned = JSON.parse(body).results;
                returned.forEach(function(child) {
                    var name = child.name;
                    var address = child.vicinity;
                    var lat = child.geometry.location.lat;
                    var lng = child.geometry.location.lng;
                    var safezoneObj = {
                        lat: lat,
                        lng: lng,
                        address: address,
                        name: name
                    }
                    safezoneResultList.push(safezoneObj);
                });
                cb(safezoneResultList);
            } else {
                console.log("Error on getting safezone Locations " + error);
            }
        });
    }

}
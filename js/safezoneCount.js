const safezones = require('../js/safezone');

module.exports = {

    // Gets number of safezones for current search to be used for threat calculation.
    getSafezoneCount: function(address, lat, lng, cb) {
        var locationObj = {
            address: address,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        }
        safezones.getSafezonesList(locationObj, function(safezonesResultList) {
            cb(safezonesResultList.length);
        });
    }
}

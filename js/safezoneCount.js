safezones = require('safezone.js');

module.exports = {

    // Gets number of safezones for current search to be used for threat calculation.
    getSafezoneCount: function(address, cb) {
        var addressObj = safezones.getAddressObj(address);
        safezones.getGeoObj(addressObj, function(geoObj) {
            safezone.getSafezoneList(geoObj, function(safezoneResultList) {
                cb(safezoneResultList.length);
            });
        });
    }
}

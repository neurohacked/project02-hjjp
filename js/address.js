safezone = require('safezone.js');

module.exports = {

    // Gets formatted address returned from Google Geo Locator to be used for front end output as well as search parameter in other methods.
    getFromattedAddress: function(address, cb) {
        var addressObj = safezone.getAddressObj(address);
        safezone.getGeoObj(addressObj, function(geoObj) {
            cb(geoObj.address);
        });
    }
}
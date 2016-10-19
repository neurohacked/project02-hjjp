const safezones = require('../js/safezone');

module.exports = {

    // Gets formatted address returned from Google Geo Locator to be used for front end output as well as search parameter in other methods.
    getFormattedAddress: function(address, cb) {
        var addressObj = safezones.getAddressObj(address);
        safezones.getGeoObj(addressObj, function(geoObj) {
            cb(geoObj.address);
        });
    }
}

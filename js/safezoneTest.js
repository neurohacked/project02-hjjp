var safezone = require('./safezone.js');
var locationTypeList = ['embassy', 'hospital', 'police', 'airport', 'bank'];

var addressObj = safezone.getAddressObj('pasadena', 'ca');
safezone.getGeoObj(addressObj, function(geoObj) {
    locationTypeList.forEach(function(locationType) {
        safezone.getSafezoneList(geoObj, locationType, function(safezoneResultList) {
            console.log(safezoneResultList);
        });
    });
});
var safezone = require('./safezone.js');
var locationTypeList = ['embassy', 'hospital', 'police', 'airport', 'bank'];

var addressObj = safezone.getAddressObj('pasadena', 'ca');
safezone.getGeoObj(addressObj, function(geoObj) {
    safezone.getSafezoneList(geoObj, function(safezoneResultList) {
        console.log(safezoneResultList);
    });
});
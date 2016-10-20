safezoneCount = require('safezoneCount.js');

module.exports = {
    getRiskScore: function() {
        return Math.floor((Math.random() * 100) + 1);
    },
    getCrimeIndex: function() {
        return Math.floor((Math.random() * 20) + 1);
    },
    getWeatherIndex: function() {
        return Math.floor((Math.random() * 20) + 1);
    },
    getSafehouseIndex: function() {
        return Math.floor((Math.random() * 30) + 1);
    },
    getTerrorIndex: function() {
        return Math.floor((Math.random() * 30) + 1);
    }
}
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
   },
   calcFormula: function(table) {
        table.forEach(function(row) {
            var yearPattern = /^\d\d\d\d/g;
            var year = table.disasterID.match(yearPattern);
            var totalDeaths = table.totalDeaths;
            var totalAffected = table.totalAffected;
            var disasterType = table.disasterType;
            var disasterScore;
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Epidemic') {
                disasterScore = 6;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
        });
   }
}
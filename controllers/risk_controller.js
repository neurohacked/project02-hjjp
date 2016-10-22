const models = require('../models');
const express = require('express');
const Q = require('q');
const isos = require('countries-iso');
const natural = require('../js/crimeTableCalculator');
const safezone = require('../js/safezone');
const weather = require('../js/weather');
const crg = require('city-reverse-geocoder');
const calcRisk = require('../js/overview');
const router = express.Router();

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/risk', function(req, res) {
    var locationArray = JSON.parse(req.query.locs);
    var overview = false;
    if ('overview' in req.query) {
        var overview = true;
        locationArray = [locationArray];
    }
    var locationCounter = 0;



    locationArray.forEach(function(location) {
        var locationAddress = location.address;
        var splitAddress = locationAddress.split(', ');
        var countryName = splitAddress[splitAddress.length - 1].trim();
        var countryISO = isos[countryName]; // 'ECU'
        var cityName = crg(location.lat, location.lng, 1, 'mi');
        cityName = cityName[0].city;
        Q.allSettled([
            models.Biological.findAll({where: {ISO: countryISO}}),
            models.Climatological.findAll({where: {ISO: countryISO}}),
            models.Geophysical.findAll({where: {ISO: countryISO}}),
            models.Hydrological.findAll({where: {ISO: countryISO}}),
            models.Metrological.findAll({where: {ISO: countryISO}}),
            safezone.getSafezonesNumber(location),
            weather.getWeatherData(location.lat, location.lng),
            models.Crime.findAll({where: {cityName: cityName}})
        ]).then(function (searchResults) {
            var randomNumber = getRandomIntInclusive(0,100);
            var riskCalc = 0;
            var riskFactors = {
                crime: 0,
                weather: 1,
                safehouses: 2,
                natural: 3
            };
            for (var tableNum = 0; tableNum < searchResults.length; tableNum++) {
                var tableArray = [];
                if (tableNum < 5) {
                    var rows = searchResults[tableNum].value.length;
                    var curRows = searchResults[tableNum].value;
                    for (var rowNum = 0; rowNum < rows; rowNum++){
                        var rowObj = {
                            totalDeaths: curRows[rowNum].totalDeaths,
                            totalAffected: curRows[rowNum].totalAffected
                         }
                         tableArray.push(rowObj);
                    }
                    riskFactors.natural = natural.calculate(tableArray);
                } else {
                    if (tableNum === 5) {
                        riskFactors.safehouses = searchResults[tableNum].value.length;
                    }
                    if (tableNum === 6) {
                        riskFactors.weather = searchResults[tableNum].value;
                    }
                    if (tableNum === 7) {
                        if (searchResults[tableNum].value.length === 0) {
                            riskFactors.crime = 35;
                        } else {
                            riskFactors.crime = searchResults[tableNum].value[0].safetyIndex;
                        }
                    }
                }
            }
            var riskData = calcRisk.getRiskCalculation(riskFactors);
            location.risk = riskData.risk;
            locationCounter++;
            if (locationCounter === locationArray.length) {
                if (overview) {
                    res.send(riskData);
                } else {
                    res.send(locationArray);
                }
            }
        });
    });
});

module.exports = router;

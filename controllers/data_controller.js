var models = require('../models');
var express = require('express');
var safezones = require('../js/safezone');
// var weather = require('../js/weather.js');
var router = express.Router();

// get safezones
router.post('/safezones', function(req, res) {
    var addressObj = safezones.getAddressObj(req.body.address, req.body.city, req.body.state);
    safezones.getGeoObj(addressObj, function(geoObj) {
        safezones.getSafezonesList(geoObj, function(safezonesResultList) {
            res.send(safezonesResultList);
        });
    });
});

// get weather
router.post('/weather', function(req, res) {

});

// get travel locations
router.post('/travel', function(req, res) {

});

module.exports = router;

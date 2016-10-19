const models = require('../models');
const express = require('express');
const safezones = require('../js/safezone');
const travel = require('../js/travel');
// const weather = require('../js/weather.js');
const router = express.Router();

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
// router.post('/weather', function(req, res) {
//
// });

// get travel destination map locations
router.post('/travel', function(req, res) {
    var addressObj = safezones.getAddressObj(req.body.address, req.body.city, req.body.state);
    safezones.getGeoObj(addressObj, function(geoObj) {
        travel.getTravelList(geoObj, function(travelResultList) {
            res.send(travelResultList);
        });
    });
});

module.exports = router;

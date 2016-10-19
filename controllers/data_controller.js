const models = require('../models');
const express = require('express');
const safezones = require('../js/safezone');
const travel = require('../js/travel');
const news = require('../js/news');
const weather = require('../js/weather');
const router = express.Router();

// get safezones
router.post('/safezones', function(req, res) {
    var addressObj = safezones.getAddressObj(req.body.address);
    safezones.getGeoObj(addressObj, function(geoObj) {
        safezones.getSafezonesList(geoObj, function(safezonesResultList) {
            res.send(safezonesResultList);
        });
    });
});

// get travel destination map locations
router.post('/travel', function(req, res) {
    var addressObj = safezones.getAddressObj(req.body.address);
    safezones.getGeoObj(addressObj, function(geoObj) {
        travel.getTravelList(geoObj, function(travelResultList) {
            res.send(travelResultList);
        });
    });
});

// get weather
router.post('/weather', function(req, res) {
    weather.getWeatherObj(req.body.lat, req.body.lng, function(weatherObj) {
        res.send(weatherObj);
    })
});

// get newsfeeds
router.post('/news', function(req, res) {
    console.log(req.body.address);
    news.getNewsList(req.body.address, function(newsResultList) {
        res.send(newsResultList);
    })
});

module.exports = router;

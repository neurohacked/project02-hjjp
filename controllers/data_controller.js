const models = require('../models');
const express = require('express');
const safezones = require('../js/safezone');
const travel = require('../js/travel');
const news = require('../js/news');
const weather = require('../js/weather');
const router = express.Router();

// get safezones
router.post('/safezones', function(req, res) {
    var locationObj = {
        address: req.body.address,
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng)
    }
    safezones.getSafezonesList(locationObj, function(safezonesResultList) {
        res.send(safezonesResultList);
    });
});

// get weather
router.post('/weather', function(req, res) {
    weather.getWeatherObj(req.body.lat, req.body.lng, function(weatherObj) {
        res.send(weatherObj);
    })
});

// get travel destination map locations
router.post('/travel', function(req, res) {
    var locationObj = {
        address: req.body.address,
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng)
    }
    travel.getTravelList(locationObj, function(travelResultList) {
        res.send(travelResultList);
    });
});

// get newsfeeds
router.post('/news', function(req, res) {
    console.log(req.body.address);
    news.getNewsList(req.body.address, function(newsResultList) {
        res.send(newsResultList);
        // var data = {
        //     news: newsResultList
        // }
        // res.render('news', data);
    });
});

module.exports = router;

var models = require('../models');
var express = require('express');
var router = express.Router();
var safezone = require('../js/safezone.js');

// get map input page
router.get('/', function(req, res) {
    res.render('map');
});

// get safezones
router.post('/search', function(req, res) {
    var addressObj = safezone.getAddressObj(req.body.address, req.body.city, req.body.state);
    safezone.getGeoObj(addressObj, function(geoObj) {
        safezone.getSafezoneList(geoObj, function(safezoneResultList) {
            res.send(safezoneResultList);
        });
    });
});

module.exports = router;

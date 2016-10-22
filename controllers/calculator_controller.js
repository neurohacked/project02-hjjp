const models = require('../models');
const express = require('express');
const crime = require('../js/crimeTableCalculator');
const router = express.Router();

// get overview
router.get('/calc', function(req, res) {
    var newList = [
        {
            totalDeaths: 100,
            totalAffected: 100000
        },
        {
            totalDeaths: 20,
            totalAffected: 300000
        },
        {
            totalDeaths: 1,
            totalAffected: 30000000
        },
        {
            totalDeaths: 5,
            totalAffected: 100000000
        },
        {
            totalDeaths: 300,
            totalAffected: 500
        }
    ];
    console.log(newList);
    crimeCoef = crime.calculate(newList);
    console.log("#################################### TEST ####################################")
    console.log(crimeCoef);
    console.log("#################################### TEST ####################################")

});

module.exports = router;

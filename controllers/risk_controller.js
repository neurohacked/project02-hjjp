const models = require('../models');
const express = require('express');
const Q = require('q');
const router = express.Router();

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/risk', function(req, res) {

    var countryName = "Italy";
    var cityName = "Rome";

    Q.allSettled([
        models.Biological.findAll({where: {countryName: countryName}}),
        models.Climatological.findAll({where: {countryName: countryName}}),
        models.Geophysical.findAll({where: {countryName: countryName}}),
        models.Hydrological.findAll({where: {countryName: countryName}}),
        models.Metrological.findAll({where: {countryName: countryName}})
    ]).then(function (searchResults) {
        console.log(searchResults);
        res.send(searchResults);
    });



    // .then(function(searchResults){
        // console.log(searchResults);
    // });

    var randomNumber = getRandomIntInclusive(0,100);
    // res.send('Random Number: ' + randomNumber);
});

module.exports = router;

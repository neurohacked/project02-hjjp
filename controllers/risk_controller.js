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
    var foo = JSON.parse(req.query.locs);
    // console.log(foo[0]['address']);
    var location = null;
    if (!location) {
        location = "Italy";
    }
    var countryName = location;
    var cityName = "Rome";

    Q.allSettled([
        models.Biological.findAll({where: {countryName: countryName}}),
        models.Climatological.findAll({where: {countryName: countryName}}),
        models.Geophysical.findAll({where: {countryName: countryName}}),
        models.Hydrological.findAll({where: {countryName: countryName}}),
        models.Metrological.findAll({where: {countryName: countryName}})
    ]).then(function (searchResults) {
        // console.log(searchResults);
        // res.send(searchResults);
        var randomNumber = getRandomIntInclusive(0,100);
        foo.forEach(function(elem) {
          elem.risk = getRandomIntInclusive(0,100);
        });
        res.send(foo);
    });



    // .then(function(searchResults){
        // console.log(searchResults);
    // });

});

module.exports = router;

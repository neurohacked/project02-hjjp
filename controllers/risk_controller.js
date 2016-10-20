const models = require('../models');
const express = require('express');
const router = express.Router();

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/risk', function(req, res) {

    models.Biological.findAll({where: {countryName: 'Italy'}})
    .then(function(searchResults){
        console.log(searchResults);
    });

    var randomNumber = getRandomIntInclusive(0,100);
    res.send('Random Number: ' + randomNumber);
});

module.exports = router;

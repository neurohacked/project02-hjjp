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
    console.log("Inside /risk");
    res.send(getRandomIntInclusive(0,100));
});


module.exports = router;

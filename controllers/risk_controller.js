const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/risk', function(req, res) {
    console.log("Inside /risk")    
});


module.exports = router;

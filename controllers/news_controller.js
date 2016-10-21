const models = require('../models');
const express = require('express');
const news = require('../js/news');
const router = express.Router();


router.get('/news', function(req, res) {
    var address = "106 W 1st St, Los Angeles, CA 90012, USA";

    news.getNewsList(address, function(newsResultList) {
        res.send(newsResultList);
    })

});

module.exports = router;

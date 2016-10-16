const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
    models.Data.findAll({
            include: [models.User]
        })
        .then(function(data) {
            res.render('home', {
                user_id: req.session.user_id,
                username: req.session.user_name,
                email: req.session.user_email,
                logged_in: req.session.logged_in,
                data: data
            });
        });
});

// signup
router.get('/signup', function(req, res) {
    res.render('signup', {
        layout: 'auth'
    });
});

// login
router.get('/login', function(req, res) {
    res.render('login', {
        layout: 'auth'
    });
});

module.exports = router;

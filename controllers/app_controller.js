const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user_name) {
        res.redirect('/dashboard');
    } else {
        res.render('home');
    }
});

// signup
router.get('/signup', function(req, res) {
    if (req.session.user_name) {
        res.redirect('/dashboard');
    } else {
        res.render('signup', {
            layout: 'auth'
        });
    }
});

// login
router.get('/login', function(req, res) {
    if (req.session.user_name) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            layout: 'auth'
        });
    }
});

module.exports = router;

const bcrypt = require('bcryptjs');
const models = require('../models');
const express = require('express');
const exphbs = require('express-handlebars');
const request = require("request-promise");
const router = express.Router();

// user dashboard
router.get('/dashboard', function(req, res) {
    if (req.session.user_id) {
        models.Location.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [models.User]
        }).then(function(riskLocations) {
            var options = {
                method: 'GET',
                url: req.protocol + '://' + req.get('host') + '/risk',
                qs: {
                    locs: JSON.stringify(riskLocations),
                }
            };
            if (!(riskLocations.length)) {
                options.qs.locs = riskLocations;
                options.qs.empty = true;
            }
            request(options, function(error, response, body) {
                return body;
            }).then(function(locations) {
                locations = JSON.parse(locations);

                //random number
                function getRandomIntInclusive(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                var riskNum = getRandomIntInclusive(0, 100);

                res.render('dashboard', {
                    layout: 'dash',
                    user_id: req.session.user_id,
                    username: req.session.user_name,
                    email: req.session.user_email,
                    logged_in: req.session.logged_in,
                    locations: locations
                });

            });
        });
    } else {
        res.redirect('/');
    }
});

// logout
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


// login
router.post('/login', function(req, res) {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(user) {
        // Use bcrypt to compare the user's password input
        // with the hash stored in the user's row.
        // If the result is true,
        bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
            // if the result is true (and thus pass and hash match)
            if (result === true) {

                // save the user's information
                // to req.session, as the comments below show

                // so what's happening here?
                // we enter the user's session by setting properties to req.

                // we save the logged in status to the session
                req.session.logged_in = true;
                // the username to the session
                req.session.user_name = user.username;
                // the user id to the session
                req.session.user_id = user.id;
                // and the user's email.
                req.session.user_email = user.email;

                res.redirect('dashboard');
            }
            // if the result is anything but true (password invalid)
            else {
                // redirect user login
                res.redirect('/login');
            }
        });
    });
});


// register a user
router.post('/create', function(req, res) {
    models.User.findAll({
        where: {
            username: req.body.username,
            email: req.body.email
        }
    }).then(function(users) {
        console.log('User Length', users.length);
        if (users.length > 0) {
            res.redirect('/signup')
        } else {
            // Using bcrypt, generate a 10-round salt,
            // then use that salt to hash the user's password.
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    // Using the User model, create a new user,
                    // storing the email they sent and the hash you just made
                    models.User.create({
                            username: req.body.username,
                            email: req.body.email,
                            password_hash: hash
                        })
                        // In a .then promise connected to that create method,
                        // save the user's information to req.session
                        // as shown in these comments
                        .then(function(user) {

                            // so what's happening here?
                            // we enter the user's session by setting properties to req.

                            // we save the logged in status to the session
                            req.session.logged_in = true;
                            // the username to the session
                            req.session.user_name = user.username;
                            // the user id to the session
                            req.session.user_id = user.id;
                            // and the user's email.
                            req.session.user_email = user.email;

                            // redirect to dashboard on login
                            res.redirect('dashboard');
                        });
                });
            });

        }
    });
});

module.exports = router;

const models = require('../models');
const express = require('express');
const router = express.Router();

router.post('/create', function(req, res) {
    models.Location.create({
            location: req.body.location,
            risk: req.body.risk,
            user_id: req.session.user_id
        })
        // connect the .create to this .then
        .then(function() {
            res.redirect('/dashboard');
        });
});

router.delete('/delete/:id', function(req, res) {
    models.Location.destroy({
            where: {
                id: req.params.id
            }
        })
        // connect it to this .then.
        .then(function() {
            res.redirect('/dashboard');
        });

});

module.exports = router;

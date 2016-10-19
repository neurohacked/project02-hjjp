const models = require('../models');
const express = require('express');
const address = require('../js/address');
const router = express.Router();

router.post('/create', function(req, res) {
    address.getFormattedAddress(req.body.address, req.body.city, req.body.state, function(geoObj) {
        models.Location.create({
                address: geoObj.address,
                lat: geoObj.lat,
                lng: geoObj.lng,
                risk: req.body.risk,
                user_id: req.session.user_id
            })
            // connect the .create to this .then
            .then(function() {
                res.redirect('/dashboard');
            });
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

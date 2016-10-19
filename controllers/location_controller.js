const models = require('../models');
const express = require('express');
const address = require('../js/address');
const router = express.Router();

router.post('/create', function(req, res) {
    // console.log(req.body.address);
    // console.log(req.body.city);
    // console.log(req.body.state);
    // var formattedAddressObj = address.getFormattedAddress(req.body.address, req.body.city, req.body.state);
    // console.log(formattedAddressObj);
    models.Location.create({
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
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

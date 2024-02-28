const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservationService');

router.post('/new', async (req, res, next) => {
    try {
        const { id: userId } = req.session.user;
        const { trip_id: tripId } = req.body;
        const resp = await reservationService.create({ ...req.body, tripId, userId });
        res.redirect(`/user/flight-booking/${tripId}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
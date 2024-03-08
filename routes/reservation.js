const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservationService');

router.post('/new', async (req, res, next) => {
    try {
        const { id: userId } = req.session.user;
        const { trip_id: tripId } = req.body;
        const reservation = await reservationService.create({ ...req.body, tripId, userId });
        if (req.query.json && req.query.json == 'no') {
            return res.redirect(`/user/flight-booking/${tripId}`);
        }
        return res.json({ status: true, data: reservation });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
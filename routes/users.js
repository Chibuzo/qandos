const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const tripService = require('../services/tripService');
const reservationService = require('../services/reservationService');
const paymentService = require('../services/paymentService');


/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/dashboard', async (req, res, next) => {
    try {
        const user = req.session.user;
        // const data = await userService.fetchDashboardData(user.id);
        res.render('user/dashboard', {});
    } catch (err) {
        next(err);
    }
});

router.get('/settings', async (req, res, next) => {
    try {
        const user = await userService.view({ id: req.session.user.id });
        res.render('user/profile', { user });
    } catch (err) {
        next(err);
    }
});

router.get('/flights', async (req, res, next) => {
    try {
        const trips = await tripService.list({ id: req.session.user.id });
        res.render('user/flights', { trips });
    } catch (err) {
        next(err);
    }
});

router.get('/earnings', async (req, res, next) => {
    try {
        const payments = await paymentService.view({ id: req.session.user.id });
        res.render('user/earnings', { payments });
    } catch (err) {
        next(err);
    }
});

router.get('/flight-booking/:flight_id', async (req, res, next) => {
    try {
        const { id: userId } = req.session.user;
        const { flight_id: tripId } = req.params;
        const [trip, reservations, bookingLinkData] = await Promise.all([
            tripService.view(tripId),
            reservationService.list({ tripId, userId }),
            tripService.getAgentTripLink(userId, tripId)
        ]);
        if (!bookingLinkData.fare) {    // use trip fare if agent didn't set fare
            bookingLinkData.fare = trip.fare;
        }
        res.render('user/trip-booking', { trip, reservations, bookingLinkData });
    } catch (err) {
        next(err);
    }
});

router.post('/set-fare', async (req, res, next) => {
    try {
        await tripService.updateBookingLinkFare(req.body);
        const { tripId } = req.body;
        res.redirect(`/user/flight-booking/${tripId}`);
    } catch (err) {
        next(err);
    }
});

router.post('/upload-photo', async (req, res, next) => {
    try {
        const { id: userId } = req.session.user;
        await userService.uploadProfilePhoto(req.files.profile_photo, userId);
        res.redirect('/user/profile');
    } catch (err) {
        next(err);
    }
});

router.post('/documents', async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        await userService.uploadDocuments(req.files, userId);
        res.redirect('/user/profile');
    } catch (err) {
        next(err);
    }
});

router.post('/delete-document', async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        const { documentName } = req.body;
        await userService.deleteDocument(documentName, userId);
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});


router.post('/update', async (req, res, next) => {
    try {
        const user_id = req.session.user.id;
        await userService.updateUser({ ...req.body }, user_id);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const wishlistService = require('../services/wishlistService');
const appointmentService = require('../services/appointmentService');
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

router.get('/wishlist', async (req, res, next) => {
    try {
        const criteria = { UserId: req.session.user.id }
        const wishlist = await wishlistService.list(criteria);
        res.render('user/wishlist', { wishlist });
    } catch (err) {
        next(err);
    }
});

router.get('/appointments', async (req, res, next) => {
    try {
        const appointments = await appointmentService.list({ UserId: req.session.user.id });
        res.render('user/appointments', { appointments });
    } catch (err) {
        next(err);
    }
});

router.get('/transactions', async (req, res, next) => {
    try {
        const criteria = { UserId: req.session.user.id }
        const transactions = await paymentService.listPayments({});
        res.render('user/transactions', { transactions });
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

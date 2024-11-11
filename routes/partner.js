const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const wishlistService = require('../services/wishlistService');
const appointmentService = require('../services/appointmentService');
const paymentService = require('../services/paymentService');
const { Op } = require('sequelize');

router.get('/dashboard', async (req, res, next) => {
    try {
        const { agentCode: referral_code } = req.session.user;
        const criteria = { referral_code, [Op.or]: [{ status: 'pending'}, { status: 'active'}] };
        const [appointments, wishlist] = await Promise.all([
            wishlistService.list(criteria),
            appointmentService.list(criteria)
        ]);
        res.render('partner/dashboard', { appointments, wishlist });
    } catch (err) {
        next(err);
    }
});

router.get('/appointments', async (req, res, next) => {
    try {
        const { agentCode: referral_code } = req.session.user;
        const criteria = { referral_code, status: 'pending' };
        const appointments = await appointmentService.list(criteria);
        res.render('partner/appointments', { appointments });
    } catch (err) {
        next(err);
    }
});

router.get('/property-leads', async (req, res, next) => {
    try {
        const { agentCode: referral_code } = req.session.user;
        const criteria = { referral_code, status: 'active' };
        const wishlist = await wishlistService.list(criteria);
        res.render('partner/wishlist', { wishlist });
    } catch (err) {
        next(err);
    }
});

router.get('/transactions', async (req, res, next) => {
    try {
        // const criteria = { UserId: req.session.user.id }
        const transactions = await paymentService.listPayments({});
        res.render('partner/transactions', { transactions });
    } catch (err) {
        next(err);
    }
});


module.exports = router;

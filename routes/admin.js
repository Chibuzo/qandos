const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const userService = require('../services/userService');
const paymentService = require('../services/paymentService');
const propertyService = require('../services/propertyService');
const { Op } = require('sequelize');


router.get('/', function (req, res) {
    res.render('admin/login', { title: 'Admin Login' });
});

router.get('/create', (req, res) => {
    res.render('admin/signup', { title: 'Create Admin' });
});

router.post('/create', async (req, res, next) => {
    try {
        await adminService.create(req.body);
        res.render('admin/login', { title: 'New Admin Login' });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        req.session.admin = await adminService.login(req.body);
        res.redirect('/admin/dashboard');
    } catch (err) {
        next(err);
    }
});

router.get('/dashboard', authenticateAdmin, async (req, res, next) => {
    try {
        const partners = await userService.list({ role: 'partner', agent_status: 'pending' });
        res.render('admin/dashboard', { partners });
    } catch (err) {
        next(err);
    }
});


router.post('/update-partner', async (req, res, next) => {
    try {
        const { userId, status } = req.body;
        await userService.updateUser({ agent_status: status == 'accept' ? 'verified' : 'rejected' }, userId);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.get('/users', authenticateAdmin, async (req, res, next) => {
    try {
        const users = await userService.list();
        res.render('admin/members', { users });
    } catch (err) {
        next(err);
    }
});

router.get('/transactions', async (req, res, next) => {
    try {
        // const criteria = { UserId: req.session.user.id }
        const transactions = await paymentService.listPayments({});
        res.render('admin/transactions', { transactions });
    } catch (err) {
        next(err);
    }
});

router.get('/users/profile', authenticateAdmin, async (req, res, next) => {
    try {
        const { user_id: userId } = req.query;
        const [user] = await Promise.all([
            userService.view({ id: userId }),
            userService.fetchUserProfileData(userId)
        ]);
        res.render('admin/user-profile', { user });
    } catch (err) {
        next(err);
    }
});

router.get('/list-vetting-requests', authenticateAdmin, async (req, res, next) => {
    try {
        const properties = await propertyService.listPropertiesForVetting();
        res.render('admin/property-vetting', { properties });
    } catch (err) {
        next(err);
    }
});

router.get('/agent-properties', authenticateAdmin, async (req, res, next) => {
    try {
        // List properties where the user role is 'partner' or 'agent'
        const properties = await propertyService.list({ UserId: { [Op.not]: null } }, 100);
        // Filter in memory for simplicity if the include User is not sufficient, 
        // but propertyService.list now includes User.
        const partnerProperties = properties.filter(p => p.User && (p.User.role === 'partner' || p.User.role === 'agent'));

        res.render('admin/agent-properties', { properties: partnerProperties });
    } catch (err) {
        next(err);
    }
});

router.post('/update-property-status', authenticateAdmin, async (req, res, next) => {
    try {
        const { propertyId, status } = req.body;
        await propertyService.update(propertyId, { status });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

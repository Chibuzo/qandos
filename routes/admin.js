var express = require('express');
var router = express.Router();
const adminService = require('../services/adminService');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const userService = require('../services/userService');
const { User, sequelize } = require('../models');


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
        const data = await adminService.fetchDashboardData();
        res.render('admin/dashboard', { ...data });
    } catch (err) {
        next(err);
    }
});




router.get('/users', authenticateAdmin, async (req, res, next) => {
    try {
        const users = await userService.find({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.render('admin/members', { users });
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


module.exports = router;

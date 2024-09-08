const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
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

router.get('/earnings', async (req, res, next) => {
    try {
        const payments = await paymentService.view({ id: req.session.user.id });
        res.render('user/earnings', { payments });
    } catch (err) {
        next(err);
    }
});

router.post('/upload-photo', async (req, res, next) => {
    try {
        const { id: agentId } = req.session.user;
        await userService.uploadProfilePhoto(req.files.profile_photo, agentId);
        res.redirect('/user/profile');
    } catch (err) {
        next(err);
    }
});

router.post('/documents', async (req, res, next) => {
    try {
        const agentId = req.session.user.id;
        await userService.uploadDocuments(req.files, agentId);
        res.redirect('/user/profile');
    } catch (err) {
        next(err);
    }
});

router.post('/delete-document', async (req, res, next) => {
    try {
        const agentId = req.session.user.id;
        const { documentName } = req.body;
        await userService.deleteDocument(documentName, agentId);
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

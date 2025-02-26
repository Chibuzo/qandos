const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userService = require('../services/userService');
const paymentService = require('../services/paymentService');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const emailService = require('../services/emailService');
const { ErrorHandler } = require('../helpers/errorHandler');
const propertyService = require('../services/propertyService');
const wishlistService = require('../services/wishlistService');
const appointmentService = require('../services/appointmentService');
const utilityService = require('../services/UtillityService');
const newsletterService = require('../services/newsLetterService');
const states = require('../config/data/states');


router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const userSession = req.session.user ?? null;
        const [properties, featured] = await Promise.all([
            propertyService.list({}, 6),
            propertyService.fetchFeatured()
        ]);
        res.render('index', { title: 'Welcome', states, properties, featured });
    } catch (err) {
        next(err);
    }
});

router.get('/about', isAuthenticated, async (req, res, next) => {
    try {
        res.render('about', { title: 'About Us' });
    } catch (err) {
        next(err);
    }
});

router.get('/how-it-works', async (req, res, next) => {
    try {
        res.render('how-it-works', { title: 'How it Works' });
    } catch (err) {
        next(err);
    }
});

router.get('/contact', isAuthenticated, async (req, res, next) => {
    try {
        const userSession = req.session.user ?? null;
        res.render('contact', { title: 'Contact Us' });
    } catch (err) {
        next(err);
    }
});

router.get('/faq', async (req, res, next) => {
    try {
        res.render('faq', { title: 'FAQ' });
    } catch (err) {
        next(err);
    }
});

router.get('/for-diaspora', isAuthenticated, async (req, res, next) => {
    try {
        res.render('for-diaspora', { title: 'Qandos for Nigerians in Diaspora' });
    } catch (err) {
        next(err);
    }
});

router.get('/for-nigerians', isAuthenticated, async (req, res, next) => {
    try {
        res.render('for-nigerians', { title: 'Qandos for Nigerians in Nigeria' });
    } catch (err) {
        next(err);
    }
});

router.get('/signup', async (req, res, next) => {
    try {
        res.render('signup', { title: 'Sign Up Option' });
    } catch (err) {
        next(err);
    }
});

router.get('/buyer-signup', async (req, res, next) => {
    try {
        res.render('buyer-signup', { title: 'Sign Up as Buyer' });
    } catch (err) {
        next(err);
    }
});

router.get('/partner-signup', async (req, res, next) => {
    try {
        res.render('partner-signup', { title: 'Sign Up as Partner', states });
    } catch (err) {
        next(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/signup', async (req, res, next) => {
    try {
        const { PropertyId, datetime, referral_code = null, ...userData } = req.body;
        const newUser = await userService.create(userData);
        if (req.query.json == 'no') {
            if (newUser.role == 'partner') {
                return res.render('partner-signup', { title: 'Sign Up', newUser });
            }
            return res.render('signup', { title: 'Sign Up', newUser });
        }

        if (PropertyId) {
            const data = { PropertyId, UserId: newUser.id, referral_code };
            await Promise.all([
                wishlistService.create(data),
                appointmentService.create({ ...data, datetime })
            ]);
        }
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.post('/book-appointment', authenticate, async (req, res, next) => {
    try {
        const { id: UserId } = req.session.user;
        await appointmentService.create({ ...req.body, UserId });
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.post('/add-to-wishlist', authenticate, async (req, res, next) => {
    try {
        const { id: UserId } = req.session.user;
        await wishlistService.create({ ...req.body, UserId });
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await userService.login(req.body);
        if (user.status == 'inactive') {
            req.session.temp_email = user.email;
            return res.render('user/activate-account', { user_status: user.status });
        }
        req.session.user = user;
        if (req.body.remember_me) {
            req.session.cookie.maxAge = 60 * 60 * 1000 * 24 * 30;   // 30 days
            req.session.user.remember_me = true;
        }
        const userPage = {
            user: '/user/appointments',
            partner: '/partner/appointments',
            agent: ''
        };
        res.redirect(userPage[user.role]);
    } catch (err) {
        //console.log(err)
        next(err);
    }
});


router.get('/activate/:email_hash/:hash_string', async (req, res, next) => {
    try {
        const email_hash = req.params.email_hash;
        const hash_string = req.params.hash_string;
        const user = await userService.activateAccount(email_hash, hash_string);
        res.redirect('/user/activate-account');
    } catch (err) {
        next(err);
    }
});

router.get('/user/activate-account', (req, res) => {
    let user_status = 'active';
    if (req.query.q && req.query.q === 'inactive') {
        user_status = 'inactive';
    }
    res.render('user/activate-account', { user_status });
});

router.get('/resend-verification-email', async (req, res) => {
    const email = req.session.temp_email || '';
    const user = await userService.view({ email });
    const emailPath = user.password ? 'activate' : 'password-reset';
    emailService.sendConfirmationEmail(user, emailPath);
    res.end();
});

router.get('/reset-password', async (req, res, next) => {
    res.render('reset-password', { title: 'Reset Password' });
});

router.post('/send-reset-email', async (req, res, next) => {
    try {
        const { email } = req.body;
        const [user] = await userService.find({ where: { email } });
        let message = 'A password reset link has been sent to your email';
        emailService.sendPasswordResetLink(user);
        if (!user) message = 'There is no account associated with this email';
        res.render('reset-password', { title: 'Reset Password', message });
    } catch (err) {
        next(err);
    }
});

router.get('/password-reset/:email_hash/:hash_string', async (req, res, next) => {
    try {
        const email_hash = req.params.email_hash;
        const hash_string = req.params.hash_string;
        const { email, status, account_status } = await userService.verifyPasswordResetLink(email_hash, hash_string);
        req.session.reset_password_email = email;
        res.render('password-reset-form', { title: 'Set new password', status, account_status });
    } catch (err) {
        next(err);
    }
});

router.post('/reset-password', async (req, res, next) => {
    try {
        if (!req.session.reset_password_email) throw new ErrorHandler(400, 'Invalid operation');
        const { password, newsletter } = req.body;
        await userService.changePassword(password, req.session.reset_password_email, newsletter);
        delete req.session.reset_password_email;
        res.render('login', { title: 'Login', message: 'Your password reset was successful.' });
    } catch (err) {
        next(err);
    }
})


router.post('/update-user', authenticateAdmin, async (req, res, next) => {
    try {
        const { status, userId } = req.body;
        await userService.updateUser({ status }, userId);
        res.json({ status: true });
    } catch (err) {
        next(err);
    }
});

router.get('/complete-payment', isAuthenticated, async (req, res, next) => {
    try {
        const { id: agentId = null } = req.session.user;
        const payment = await paymentService.savePaymentDetails(req.query.reference, agentId);
        res.json({ status: true, data: payment });
    } catch (err) {
        next(err);
    }
});

router.post('/send-email', (req, res, next) => {
    try {
        emailService.emailEcoBlue(req.body);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.get('/cities', (req, res, next) => {
    try {
        const { state } = req.query;
        const cities = utilityService.filterCitiesByState(state);
        res.status(200).json({ status: 'success', data: { cities } });
    } catch (err) {
        next(err);
    }
});

router.get('/delete-media', async (req, res, next) => {
    try {
        const { id } = req.query;
        await propertyService.deleteMedia(id);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});

router.post('/newsletter', async (req, res, next) => {
    try {
        const { email } = req.body;
        await newsletterService.create({ email });
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
});


router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

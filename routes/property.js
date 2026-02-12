const express = require('express');
const router = express.Router();
const propertyService = require('../services/propertyService');
const states = require('../config/data/states');
const districts = require('../config/data/districts.json');
console.log('Districts loaded:', Object.keys(districts).length, 'phases found');
const utilityService = require('../services/UtillityService');
const newsletterService = require('../services/newsLetterService');


router.get('/list', async (req, res, next) => {
    try {
        const user = req.session.user || req.session.admin;
        if (!user) return res.redirect('/login');

        const isAdmin = user.type === 'admin-user';
        const criteria = isAdmin ? {} : { UserId: user.id };
        const properties = await propertyService.list(criteria, 100);

        const dashboardLink = isAdmin ? '/admin/dashboard' : '/partner/dashboard';

        // Ensure layout has access to the correct user/admin object
        if (isAdmin) res.locals.admin = user;
        else res.locals.user = user;

        res.render('property/list', { properties, dashboardLink });
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        const user = req.session.user || req.session.admin;
        if (!user) return res.redirect('/login');

        const isAdmin = user.type === 'admin-user';

        if (isAdmin) res.locals.admin = user;
        else res.locals.user = user;

        let count = 0;
        if (!isAdmin) {
            count = await propertyService.countUserProperties(user.id);
        }

        res.render('property/new', { states, districts, count, quota: 10 });
    } catch (err) {
        next(err);
    }
});

router.post('/new', async (req, res, next) => {
    try {
        const user = req.session.user || req.session.admin;
        if (!user) return res.status(401).send('Unauthorized');

        const { price, ...rest } = req.body;
        // Clean price string (e.g., "25,000,000" -> 25000000)
        const cost = price ? parseInt(price.replace(/,/g, '')) : 0;
        const propertyData = { ...rest, cost, UserId: user.id };

        // Partners create properties with 'unverified' status (default is now unverified)
        if (user.role === 'partner') {
            const count = await propertyService.countUserProperties(user.id);
            if (count >= 10) {
                return res.status(403).send('Listing quota exceeded (Max 10)');
            }
            propertyData.status = 'unverified';
        }

        const property = await propertyService.create(propertyData, req.files);
        res.redirect(`/property/list`);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/edit', async (req, res, next) => {
    try {
        const user = req.session.user || req.session.admin;
        if (!user) return res.redirect('/login');

        const { id } = req.params;
        const foundProperty = await propertyService.view(id);
        const { photos = [], ...property } = foundProperty;
        const cities = utilityService.filterCitiesByState(property.state);

        const isAdmin = user.type === 'admin-user';

        if (isAdmin) res.locals.admin = user;
        else res.locals.user = user;

        res.render('property/edit', { property, photos, states, cities, districts });
    } catch (err) {
        next(err);
    }
});

router.post('/:id/update', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { price, ...rest } = req.body;

        let updateData = { ...rest };
        if (price) {
            updateData.cost = parseInt(price.replace(/,/g, ''));
        }

        await propertyService.update(id, updateData);
        res.redirect(`/property/${id}/edit`);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/upload-photos', async (req, res, next) => {
    try {
        const { id: propertyId } = req.params;
        const { mediaType } = req.body;
        const files = req.files ? req.files.property_photos : null;
        await propertyService.uploadPropertyPhotos(propertyId, files, mediaType);
        res.redirect(`/property/${propertyId}/edit`);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await propertyService.update(id, { deleted: true });
        res.redirect(`/property/list`);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/:title', async (req, res, next) => {
    try {
        const { id, title } = req.params;
        const { referral_code = null } = req.query;
        const { user: partner } = req.session;
        const referralLink = (partner && partner.role == 'partner')
            ? process.env.BASE_URL + `property/${id}/${title.split(' ').join('-')}?referral_code=${partner.agentCode}`
            : null;

        const property = await propertyService.view(id);
        const relatedProperties = await propertyService.fetchRelatedProperties(property);
        res.render('property', { property, relatedProperties, referral_code, referralLink });
    } catch (err) {
        next(err);
    }
});

router.get('/browse', async (req, res, next) => {
    try {
        const user = req.session.user || {};
        const { keywords } = req.query;
        const properties = await propertyService.list({}, 18, keywords);
        res.render('properties', { properties, referral_code: user.agent_code || null });
    } catch (err) {
        next(err);
    }
});

router.post('/verify', async (req, res, next) => {
    try {
        // Validate the reCAPTCHA response
        const { 'g-recaptcha-response': recaptchaResponse, ...propertyData } = req.body;
        const response = await utilityService.verifyRecaptcha(recaptchaResponse);
        if (!response.success) {
            throw new Error('reCAPTCHA verification failed');
            // return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
        await propertyService.logPropertyVerification(propertyData);
        if (req.body.newsletter) {
            await newsletterService.create({ email: req.body.email });
        }
        res.render('property/submit-verification-response');
    } catch (err) {
        next(err);
    }
});

router.get('/verify', async (req, res, next) => {
    res.render('property/submit-verification-response');
})


// router.delete('/:id', async (req, res, next) => {
//     try {
//         const { id } = req.query;
//         await propertyService.update(id, { deleted: true });
//         res.redirect(`/property/list`);
//     } catch(err) {
//         next(err);
//     }
// });


module.exports = router;
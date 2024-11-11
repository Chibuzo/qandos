const express = require('express');
const router = express.Router();
const propertyService = require('../services/propertyService');
const states = require('../config/data/states');
const utilityService = require('../services/UtillityService');


router.get('/list', async (req, res, next) => {
    try {
        const properties = await propertyService.list({}, 15);
        res.render('property/list', { properties });
    } catch(err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        res.render('property/new', { states });
    } catch(err) {
        next(err);
    }
});

router.post('/new', async (req, res, next) => {
    try {
        const property = await propertyService.create(req.body);
        res.redirect(`/property/${property.id}/edit`);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundProperty = await propertyService.view(id);
        const { photos = [], ...property } = foundProperty;
        const cities = utilityService.filterCitiesByState(property.state);
        res.render('property/edit', { property, photos, states, cities });
    } catch(err) {
        next(err);
    }
});

router.post('/:id/update', async (req, res, next) => {
    try {
        const { id } = req.params;
        await propertyService.update(id, req.body);
        res.redirect(`/property/${id}/edit`);
    } catch(err) {
        next(err);
    }
});

router.post('/:id/upload-photos', async (req, res, next) => {
    try {
        const { id: propertyId } = req.params;
        const { mediaType } = req.body;
        await propertyService.uploadPropertyPhotos(propertyId, req.files, mediaType);
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
    } catch(err) {
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
    } catch(err) {
        next(err);
    }
});

router.get('/browse', async (req, res, next) => {
    try {
        const user = req.session.user || {};
        const properties = await propertyService.list({}, 15);
        res.render('properties', { properties, referral_code: user.agent_code || null });
    } catch(err) {
        next(err);
    }
});


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
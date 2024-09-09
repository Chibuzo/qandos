const express = require('express');
const router = express.Router();
const propertyService = require('../services/propertyService');

router.get('/list', async (req, res, next) => {
    try {
        const properties = await propertyService.list();
        res.render('property/list', { properties });
    } catch(err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        res.render('property/new');
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
        res.render('property/edit', { property, photos });
    } catch(err) {
        next(err);
    }
});

router.post('/:id/update', async (req, res, next) => {
    try {
        const { id } = req.params;
        await propertyService.uodate(id, req.body);
        res.redirect(`/property/${id}/edit`);
    } catch(err) {
        next(err);
    }
});

router.post('/:id/upload-photos', async (req, res, next) => {
    try {
        const { id: propertyId } = req.params;
        await propertyService.uploadPropertyPhotos(propertyId, req.files);
        res.redirect(`/property/${propertyId}/edit`);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/:title', async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await propertyService.view(id);
        res.render('property', { property });
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.query;
        await propertyService.uodate(id, { deleted: true });
        res.redirect(`/property/list`);
    } catch(err) {
        next(err);
    }
});


module.exports = router;
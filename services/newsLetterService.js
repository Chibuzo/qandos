const { NewsLetter } = require('../models');
const { ErrorHandler } = require('../helpers/errorHandler');
const propertyService = require('./propertyService');
const emailService = require('./emailService');
const { Op } = require('sequelize');

const create = async ({ email }) => {
    if (!email) throw new ErrorHandler(400, 'Email is required');
    const existingEmail = await NewsLetter.findOne({ where: { email } });
    if (existingEmail) return existingEmail;

    const newEmail = await NewsLetter.create({ email });
    emailService.sendNewsletterWelcome({ email })
    return newEmail;
}

const sendWeeklyNewsLetter = async () => {
    // Get all properties created in the last 7 days
    const recentProperties = await propertyService.list({ createdAt: { [Op.gt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    if (!recentProperties.length) return;
    const properties = recentProperties.map(rawProperty => {
        const property = rawProperty.toJSON();
        return {
            title: property.title,
            url: `${process.env.BASE_URL}property/${property.id}/${property.title.replace(/\s/g, '-')}`,
            photo: process.env.BASE_URL + property.PropertyMedia.length ? property.PropertyMedia[0].location : null
        }
    });
    const subscribers = await NewsLetter.findAll();
    emailService.sendWeeklyNewsLetter(subscribers, properties);
}

const list = async () => {
    return NewsLetter.findAll();
}

const unSubscribe = async (email) => {
    if (!email) throw new ErrorHandler(400, 'Email is required');
    const existingEmail = await NewsLetter.findOne({ where: { email } });
    if (!existingEmail) throw new ErrorHandler(404, 'Email not found');
    await existingEmail.destroy();
    return existingEmail;
}

module.exports = {
    create,
    list,
    sendWeeklyNewsLetter,
    unSubscribe
}
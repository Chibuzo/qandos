const { Reservation } = require('../models');
const { generateUniqueValue } = require('./UtillityService');


const create = async data => {
    return Reservation.create({ ...data, reference: generateUniqueValue(10, false) });
}

const list = async (criteria = {}) => {
    return Reservation.findAll({ where: criteria, order: [['createdAt', 'desc']] });
}

const view = async id => {
    return Reservation.findByPk(id);
}

module.exports = {
    create,
    list,
    view
}
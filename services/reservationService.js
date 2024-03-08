const { Reservation, AgentReservation } = require('../models');
const { generateUniqueValue } = require('./UtillityService');
const { ErrorHandler } = require('../helpers/errorHandler');
const tripService = require('./tripService');


const create = async data => {
    const booking_link = data.booking_link ? true : false;
    return Reservation.create({ ...data, booking_link, reference: generateUniqueValue(10) });
}

const createAgentReservation = async ({ tripId, reservationIds, agentId }) => {
    const { fare } = await tripService.view(tripId);
    const amount = fare * reservationIds.length;
    return AgentReservation.create({ amount, agentId, reservations: JSON.stringify(reservationIds), reference: generateUniqueValue(10) })
}

const list = async (criteria = {}) => {
    return Reservation.findAll({ where: criteria, order: [['createdAt', 'desc']] });
}

const findOne = async criteria => {
    return Reservation.findOne({ where: criteria });
}

const view = async id => {
    const reservation = await findOne({ id });
    if (!reservation) throw new ErrorHandler(404, 'Reservation not Found');
    return reservation;
}

const findAgentReservation = async criteria => {
    return AgentReservation.findOne({ where: criteria });
}

const update = async (criteria, data, agent = null) => {
    if (agent) {
        return AgentReservation.update(data, { where: criteria });
    }
    return Reservation.update(data, { where: criteria });
}

module.exports = {
    create,
    list,
    view,
    findOne,
    findAgentReservation,
    update,
    createAgentReservation
}
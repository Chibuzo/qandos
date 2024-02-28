const { ErrorHandler } = require('../helpers/errorHandler');
const { Trip, AgentBookingLink } = require('../models');
const { generateUniqueValue } = require('./UtillityService');


const list = async () => {
    return Trip.findAll();
}

const view = async id => {
    return Trip.findByPk(id);
}

const getAgentTripLink = async (agentId, tripId, fare = null) => {
    const bookingCodeData = await AgentBookingLink.findOne({ where: { agentId, tripId }, raw: true });
    if (!bookingCodeData) {
        return createNewLink(agentId, tripId, fare);
    }
    return { ...bookingCodeData, bookingLink: generateBookingLink(bookingCodeData.bookingCode) };
}

const getAgentTripLinkByCode = async code => {
    const bookingCodeData = await AgentBookingLink.findOne({ where: { bookingCode: code }, raw: true });
    if (!bookingCodeData) {
        throw new ErrorHandler(400, 'Invalid booking link')
    }
    return bookingCodeData;
}

const createNewLink = async (agentId, tripId, fare = 0) => {
    const bookingCode = generateUniqueValue(15, false);
    const bookingCodeData = await AgentBookingLink.create({ agentId, tripId, fare, bookingCode });
    return { ...bookingCodeData.toJSON(), bookingLink: generateBookingLink(bookingCode) };
}

const updateBookingLinkFare = async ({ bookingLinkId, fare }) => {
    return AgentBookingLink.update({ fare }, { where: { id: bookingLinkId } });
}

const generateBookingLink = bookingCode => `${process.env.BASE_URL}booking-link/${bookingCode}`;

module.exports = {
    list,
    view,
    getAgentTripLink,
    updateBookingLinkFare,
    getAgentTripLinkByCode
}
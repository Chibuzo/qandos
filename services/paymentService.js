const { Payment } = require('../models');
const { Op } = require('sequelize');
const { PAYSTACK_API_URL } = require('../config/constants');
const APIRequest = require('../helpers/APIRequest');
const { ErrorHandler } = require('../helpers/errorHandler');

const savePaymentDetails = async (reference, agentId) => {
    // first verify payment status
    const { amount, channel, currency, status } = await verifyPayment(reference);

    const [payment] = await Promise.all([
        Payment.create({ amount, channel, currency, status, reference })
    ]);

    return payment;
}


const verifyPayment = async (reference) => {
    const option = {
        headers: { Authorization: `Bearer ${process.env.SECRET_KEY}` },
        baseURL: PAYSTACK_API_URL
    };
    const apiRequest = new APIRequest(option);
    const url = `/transaction/verify/${reference}`;
    const { status: responseStatus, data } = await apiRequest.get(url);

    if (!responseStatus) throw new ErrorHandler(400, 'Unable to verify transaction status');
    if (data.status != 'success') throw new ErrorHandler(400, 'Payment attempt didn\'t succeed');

    return data;
}


const listPayments = async (criteria) => {
    return Payment.findAll(criteria);
}

module.exports = {
    savePaymentDetails,
    listPayments
}
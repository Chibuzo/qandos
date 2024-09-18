const { Appointment } = require('../models');

const create = async appointmentData => {
    return Appointment.create(appointmentData);
}

module.exports = {
    create
}
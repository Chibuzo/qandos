const { Appointment, Property } = require('../models');

const create = async appointmentData => {
    return Appointment.create(appointmentData);
}

const list = async (criteria, include) => {
    return Appointment.findAll({
        where: { ...criteria, deleted: false },
        include: {
            model: Property
        },
        order: [['datetime', 'desc']],
        raw: true,
        nest: true
    });
}

module.exports = {
    create,
    list
}
'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        details: DataTypes.TEXT,
        datetime: DataTypes.DATE,
        status: {
            type: Sequelize.ENUM('pending', 'missed', 'done'),
            defaultValue: 'pending'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'appointments'
    });

    Appointment.associate = function(models) {
        Appointment.belongsTo(models.User);
        Appointment.belongsTo(models.Property);
    }

    return Appointment;
}
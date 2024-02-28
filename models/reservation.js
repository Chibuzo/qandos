'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: DataTypes.STRING(60),
        phone: DataTypes.STRING(16),
        email: DataTypes.STRING(60),
        status: {
            type: Sequelize.ENUM('pending', 'paid', 'canceled'),
            defaultValue: 'pending'
        }
    }, {
        timestamps: true,
        tableName: 'reservations',
        indexes: [
            {
                unique: true, fields: ['reference']
            }
        ]
    });

    Reservation.associate = function (models) {
        Reservation.belongsTo(models.User, { foreignKey: 'userId' });
        Reservation.belongsTo(models.Trip, { foreignKey: 'tripId' });
    };

    return Reservation;
}
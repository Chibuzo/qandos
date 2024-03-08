'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const AgentReservation = sequelize.define('AgentReservation', {
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: DataTypes.INTEGER,
        reservations: DataTypes.STRING,
        status: {
            type: Sequelize.ENUM('pending', 'paid', 'canceled'),
            defaultValue: 'pending'
        }
    }, {
        timestamps: true,
        tableName: 'agentReservations',
        indexes: [
            {
                unique: true, fields: ['reference']
            }
        ]
    });

    AgentReservation.associate = function (models) {
        AgentReservation.belongsTo(models.User, { foreignKey: 'agentId' });
        AgentReservation.belongsTo(models.Trip, { foreignKey: 'tripId' });
    };

    return AgentReservation;
}
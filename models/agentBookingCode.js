'use strict';

module.exports = (sequelize, DataTypes) => {
    const AgentBookingLink = sequelize.define('AgentBookingLink', {
        tripId: DataTypes.INTEGER,
        fare: DataTypes.INTEGER,
        agentId: DataTypes.CHAR(36),
        bookingCode: DataTypes.STRING(15),
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'bookinglinks',
        indexes: [
            {
                unique: true, fields: ['bookingCode']
            }
        ]
    });

    return AgentBookingLink;
}
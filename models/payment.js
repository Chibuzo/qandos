'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING
        },
        channel: {
            type: DataTypes.STRING
        },
        status: {
            type: Sequelize.ENUM('pending', 'success', 'failed'),
            defaultValue: 'pending'
        }
    }, {
        timestamps: true,
        tableName: 'payments',
        indexes: [
            {
                unique: true, fields: ['reference']
            }
        ]
    });

    return Payment;
}
'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const VerifyProperty = sequelize.define('VerifyProperty', {
        // address: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        state: DataTypes.STRING(50),
        city: DataTypes.STRING(50),
        name: DataTypes.STRING(50),
        email: DataTypes.STRING(50),
        phone: DataTypes.STRING(50),
        propertyType: DataTypes.STRING(50),
        status: {
            type: Sequelize.ENUM('pending', 'in-progress', 'verified', 'unverified', 'rejected'),
            defaultValue: 'pending'
        }
    }, {
        timestamps: true,
        tableName: 'verify_properties'
    });

    return VerifyProperty;
}
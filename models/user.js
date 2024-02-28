'use strict';
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        fullname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        agency: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
        },
        password: DataTypes.STRING(60),
        address: DataTypes.STRING,
        state: DataTypes.STRING,
        cac: DataTypes.STRING(16),
        status: {
            type: Sequelize.ENUM('inactive', 'active', 'verified', 'disabled'),
            defaultValue: 'inactive'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'users',
        indexes: [
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['phone'] },
            { unique: true, fields: ['cac'] }
        ],

    });

    User.associate = function (models) {
        User.hasMany(models.Reservation, { foreignKey: 'userId' });
    };

    return User;
}
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
        email: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
        },
        password: DataTypes.STRING(60),
        location: DataTypes.STRING(60),
        role: {
            type: Sequelize.ENUM('admin', 'user', 'partner', 'agent'),
            defaultValue: 'user'
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM('inactive', 'active', 'disabled'),
            defaultValue: 'inactive'
        },
        agent_status: {
            type: Sequelize.ENUM('pending', 'verified', 'rejected')
        },
        agentCode: {
            type: DataTypes.STRING(15)
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
            { unique: true, fields: ['agentCode'] }
        ],

    });

    User.associate = function (models) {
        User.hasMany(models.WishList)
    };

    return User;
}
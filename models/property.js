'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        title: DataTypes.STRING(60),
        description: DataTypes.TEXT,
        category: {
            type: Sequelize.ENUM('house', 'land'),
            defaultValue: 'house'
        },
        bedrooms: DataTypes.INTEGER,
        bathrooms: DataTypes.INTEGER,
        size: DataTypes.STRING(15),
        garage: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        cost: DataTypes.INTEGER,
        state: DataTypes.STRING(50),
        city: DataTypes.STRING(50),
        address: DataTypes.STRING,
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM('sold', 'available', 'processing'),
            defaultValue: 'available'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'properties'
    });

    Property.associate = function (models) {
        Property.hasMany(models.PropertyPhoto);
    };

    return Property;
}
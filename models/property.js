'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        title: DataTypes.STRING(60),
        description: DataTypes.TEXT,
        category: {
            type: Sequelize.ENUM('fully built', 'land', 'uncompleted'),
            defaultValue: 'fully built'
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        toilets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        plot_size: DataTypes.STRING(15), 
        garage: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        cost: DataTypes.INTEGER,
        state: DataTypes.STRING(50),
        city: DataTypes.STRING(50),
        //coordinate: DataTypes.GEOMETRY('POINT'),
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
        available_units: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        closest_landmark: DataTypes.STRING,
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        occupied: {
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
        Property.hasMany(models.PropertyMedia);
    };

    return Property;
}
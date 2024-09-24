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
        bedrooms: DataTypes.INTEGER,
        toilets: DataTypes.INTEGER,
        plot_size: DataTypes.STRING(15), 
        garage: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        cost: DataTypes.INTEGER,
        state: DataTypes.STRING(50),
        city: DataTypes.STRING(50),
        //coordinate: DataTypes.GEOMETRY('POINT'),
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
        available_units: DataTypes.INTEGER,
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
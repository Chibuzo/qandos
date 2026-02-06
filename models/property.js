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
            type: Sequelize.ENUM('sold', 'available', 'processing', 'unverified'),
            defaultValue: 'unverified'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        district: DataTypes.STRING(50),
        asset_class: DataTypes.STRING(50),
        role: {
            type: Sequelize.ENUM('Owner', 'Agent'),
            defaultValue: 'Agent'
        },
        title_document_type: DataTypes.STRING(50),
        plot_number: DataTypes.STRING(50),
        allottee_name: DataTypes.STRING(100),
        survey_coordinates: DataTypes.STRING(100),
        nin_rc: DataTypes.STRING(50),
        listing_consent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'properties'
    });

    Property.associate = function (models) {
        Property.hasMany(models.PropertyMedia);
        Property.belongsTo(models.User);
    };

    return Property;
}
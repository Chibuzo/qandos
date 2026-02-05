'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const PropertyMedia = sequelize.define('PropertyMedia', {
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mediaType: {
            type: Sequelize.ENUM('photo', 'video', 'floor plan', 'document'),
            defaultValue: 'photo'
        }
    }, {
        timestamps: true,
        tableName: 'propertyMedia'
    });

    PropertyMedia.associate = function (models) {
        PropertyMedia.belongsTo(models.Property);
    }

    return PropertyMedia;
}
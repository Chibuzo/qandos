'use strict';

module.exports = (sequelize, DataTypes) => {
    const PropertyPhoto = sequelize.define('PropertyPhoto', {
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'propertyPhotos'
    });

    PropertyPhoto.associate = function(models) {
        PropertyPhoto.belongsTo(models.Property);
    }

    return PropertyPhoto;
}
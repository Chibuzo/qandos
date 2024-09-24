'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define('WishList', {
        status: {
            type: Sequelize.ENUM('active', 'purchased', 'sold', 'dropped'),
            defaultValue: 'active'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'wishlists'
    });

    WishList.associate = function(models) {
        WishList.belongsTo(models.User);
        WishList.belongsTo(models.Property);
    }

    return WishList;
}
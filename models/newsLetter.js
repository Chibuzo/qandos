'use strict';

module.exports = (sequelize, DataTypes) => {
    const NewsLetter = sequelize.define('NewsLetter', {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            required: true
        }
    }, {
        timestamps: true,
        tableName: 'newsLetter'
    });

    return NewsLetter;
}
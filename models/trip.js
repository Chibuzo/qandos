'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define('Trip', {
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flight_no: DataTypes.STRING,
        fare: DataTypes.INTEGER,
        travel_date: DataTypes.DATE,
        dep_terminal: DataTypes.STRING,
        departure_time: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'trips'
    });

    Trip.associate = function (models) {
        Trip.hasMany(models.Reservation, { foreignKey: 'tripId' });
    }

    return Trip;
}
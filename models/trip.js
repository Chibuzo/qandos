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
        flight_no: DataTypes.STRING(15),
        fare: DataTypes.INTEGER,
        travel_date: DataTypes.DATE,
        dep_terminal: DataTypes.STRING,
        departure_time: DataTypes.STRING(12),
        capacity: DataTypes.INTEGER,
        round_trip: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        return_date: DataTypes.DATE,
        return_time: DataTypes.STRING(12),
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
        Trip.hasMany(models.AgentReservation, { foreignKey: 'tripId' });
    }

    return Trip;
}
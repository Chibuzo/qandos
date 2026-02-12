const Sequelize = require('sequelize');
const path = require('path');

const sessionDb = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../sessions.sqlite'),
    logging: false
});

module.exports = sessionDb;

const sequelize = require('sequelize');

const db = new sequelize('user_management', 'root', '', {
    dialect : 'mysql',
    logging: false
})

module.exports = db;
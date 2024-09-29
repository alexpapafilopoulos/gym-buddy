//comment testing
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gymbuddy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports=sequelize;
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Imovel = require('../models/Imovel');

const connection = new Sequelize(dbConfig);

Imovel.init(connection);

module.exports = connection;
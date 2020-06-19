const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Manager = require("../models/Manager");
const Condominium = require("../models/Condominium");
const Management = require("../models/Management");

const connection = new Sequelize(dbConfig);

Manager.init(connection);
Management.init(connection);
Condominium.init(connection);
Condominium.associate(connection.models);
Management.associate(connection.models);

module.exports = connection;

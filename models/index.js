'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const Worker = require("./worker");
const User = require("./user");

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Worker = Worker;

User.init(sequelize);
Worker.init(sequelize);

User.associate(db);
Worker.associate(db);

module.exports = db;

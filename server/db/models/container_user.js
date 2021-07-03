const Sequelize = require("sequelize");
const db = require("../db");

const ContainerUser = db.define("containerUser", {
  role: {
    type: Sequelize.ENUM('user', 'owner'),
    allowNull: false,
  }
});

module.exports = ContainerUser;

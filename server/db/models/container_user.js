const Sequelize = require("sequelize");
const db = require("../db");

const ContainerUser = db.define("containerUser", {
  role: {
    type: Sequelize.ENUM('user', 'owner', 'pending'),
    allowNull: false,
    defaultValue: 'user',
  }
});

module.exports = ContainerUser;

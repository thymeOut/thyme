const Sequelize = require("sequelize");
const db = require("../db");

const ContainerUser = db.define("containerUser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  role: {
    type: Sequelize.ENUM('user', 'owner', 'pending'),
    allowNull: false,
    defaultValue: 'user',
  }
});

module.exports = ContainerUser;

const Sequelize = require("sequelize");
const db = require("../db");

const Container_User = db.define("containerUser", {
  role: {
    type: Sequelize.ENUM('user', 'owner'),
    allowNull: false,
  }
});

module.exports = Container_User;

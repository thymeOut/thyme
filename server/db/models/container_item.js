const Sequelize = require("sequelize");
const db = require("../db");

const ContainerItem = db.define("containerItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expiration: {
    type: Sequelize.DATE,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  }
});

module.exports = ContainerItem;

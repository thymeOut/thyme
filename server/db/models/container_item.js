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
  },
  itemStatus: {
    type: Sequelize.ENUM('ACTIVE', 'EXPIRED', 'REMOVED'),
    allowNull: false
  }
});

module.exports = ContainerItem;

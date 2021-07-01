const Sequelize = require("sequelize");
const db = require("../db");

const Container_Item = db.define("containerItem", {
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

module.exports = Container_Item;

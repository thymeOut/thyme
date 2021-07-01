const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.thespruceeats.com/thmb/VlE11LwZWB3XIlU3XwVRdROCspA=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/148964914-56a2f6f35f9b58b7d0cfe462.jpg",
  },
});

module.exports = Item;

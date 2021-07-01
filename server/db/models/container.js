const Sequelize = require('sequelize');
const db = require('../db');

const Container = db.define("container", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('fridge', 'pantry', 'freezer'),
    allowNull: false,
    defaultValue: 'fridge',
  }
});

module.exports = Container;

const Sequelize = require('sequelize');
const db = require('../db');

const Container = db.define("container", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('fridge', 'pantry', 'freezer', 'minifridge'),
    allowNull: false,
    defaultValue: 'fridge',
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
});

module.exports = Container;

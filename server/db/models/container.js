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
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://static3.depositphotos.com/1000749/116/v/950/depositphotos_1161071-stock-illustration-refrigerator.jpg'
  },
  ownerId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Container;

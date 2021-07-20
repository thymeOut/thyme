const Sequelize = require('sequelize');
const db = require('../db');

const ContainerItem = db.define(
  'containerItem',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    originalQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantityUsed: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    expiration: {
      type: Sequelize.DATE,
    },
    imageUrl: {
      type: Sequelize.TEXT,
    },
    itemStatus: {
      type: Sequelize.ENUM('ACTIVE', 'EXPIRED', 'EXPIRED_REMOVED', 'REMOVED'),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ContainerItem;

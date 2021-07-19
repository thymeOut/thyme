const Sequelize = require('sequelize');
const db = require('../db');

const Container = db.define('container', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
  },
  ownerId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Container;

const addImageUrl = (container) => {
  if (container.type === 'fridge') {
    container.imageUrl =
      'https://static3.depositphotos.com/1000749/116/v/950/depositphotos_1161071-stock-illustration-refrigerator.jpg';
  } else if (container.type === 'pantry') {
    container.imageUrl = 'https://www.closetcreationsri.com/_images/pantry.png';
  } else if (container.type === 'freezer') {
    container.imageUrl =
      'https://smhttp-ssl-87202.nexcesscdn.net/pub/media/catalog/product/cache/90b96709c3e472eb35f4c1eef9a9f5f1/u/h/uhfz124-ss01a_1.jpg';
  } else if (container.type === 'minifridge') {
    container.imageUrl =
      'https://images.thdstatic.com/productImages/bc530048-aaa8-4118-b5a0-91d4a26e78aa/svn/red-galanz-mini-fridges-glr31trder-e1_600.jpg';
  }
};

Container.beforeCreate(addImageUrl);
Container.beforeUpdate(addImageUrl);
Container.beforeBulkCreate((containers) =>
  Promise.all(containers.map(addImageUrl))
);

const db = require('./db');

const User = require('./models/user');
const Container = require('./models/container');
const Item = require('./models/item');
const ContainerUser = require('./models/container_user');
const ContainerItem = require('./models/container_item');

User.belongsToMany(Container, { through: ContainerUser });
Container.belongsToMany(User, { through: ContainerUser });

Container.belongsToMany(Item, {
  through: { model: ContainerItem, unique: false },
});
Item.belongsToMany(Container, {
  through: { model: ContainerItem, unique: false },
});

User.hasMany(ContainerItem);
ContainerItem.belongsTo(User);

Item.hasMany(ContainerItem);
ContainerItem.belongsTo(Item);

// Container.belongsTo(User, { as: 'owner' });
// User.hasMany(Container, { foreignKey: 'ownerId' });

module.exports = {
  db,
  models: {
    User,
    Container,
    Item,
    ContainerItem,
    ContainerUser,
  },
};

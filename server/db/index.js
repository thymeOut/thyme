const db = require("./db");

const User = require("./models/user");
const Container = require("./models/container");
const Item = require("./models/item");
const Container_User = require("./models/container_user");
const Container_Item = require("./models/container_item");

User.belongsToMany(Container, { through: Container_User });
Container.belongsToMany(User, { through: Container_User });

Container.belongsToMany(Item, { through: Container_Item });
Item.belongsToMany(Container, { through: Container_Item });

User.hasMany(Container_Item);
Container_Item.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Container,
    Item,
    Container_Item,
    Container_User,
  },
};

const faker = require('faker');

let containerItems = [];

for (let i = 0; i < 300; i++) {
  let newContainerItem = {
    itemId: Math.ceil(Math.random() * 24),
    itemStatus: 'ACTIVE',
    originalQuantity: Math.ceil(Math.random() * 30),
  };

  let dateTrue = Math.floor(Math.random() * 2);

  if (dateTrue) {
    newContainerItem.expiration = faker.date.between(new Date(), '2021-09-22');
  }

  containerItems.push(newContainerItem);
}

module.exports = containerItems;

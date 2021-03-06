const faker = require('faker');

let containerItems = [];

for (let i = 0; i < 1000; i++) {
  let newContainerItem = {
    itemId: Math.ceil(Math.random() * 24),
    originalQuantity: Math.ceil(Math.random() * 30),
    price: Math.ceil(Math.random() * 5000),
  };

  let dateTrue = Math.floor(Math.random() * 2);
  let rand2 = Math.floor(Math.random() * 2);

  if (rand2) {
    newContainerItem.quantityUsed = Math.floor(Math.random() * newContainerItem.originalQuantity);
  }

  if (dateTrue) {
    const expiration = faker.date.between('2020-09-10', '2021-09-22');

    newContainerItem.expiration = expiration;

    if (expiration < new Date()) {
      let rand = Math.floor(Math.random() * 2);

      if (rand) {
        newContainerItem.itemStatus = 'EXPIRED';
      } else {
        newContainerItem.itemStatus = 'EXPIRED_REMOVED';
      }
    } else {
      newContainerItem.itemStatus = 'ACTIVE';
    }
  } else {
    newContainerItem.itemStatus = 'ACTIVE';
  }

  containerItems.push(newContainerItem);
}

module.exports = containerItems;

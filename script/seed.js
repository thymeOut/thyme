'use strict';

const { users, containers, items, containerItems } = require('./data');
const {
  db,
  models: { User, Container, Item, ContainerItem, ContainerUser },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const dummyUsers = await Promise.all(users.map((user) => User.create(user)));

  const dummyContainers = await Promise.all(
    containers.map(async (container) => Container.create(container))
  );

  const dummyItems = await Promise.all(items.map((item) => Item.create(item)));

  let containerUsers = [];

  dummyContainers.forEach((container) => {
    let newContainerOwner = {
      userId: container.ownerId,
      containerId: container.id,
      role: 'owner',
    };

    containerUsers.push(newContainerOwner);
  });

  const dummyContainerUsers = await Promise.all(
    containerUsers.map((containerUser) => ContainerUser.create(containerUser))
  );

  containerItems.forEach((containerItem, idx) => {
    const i = Math.floor(Math.random() * (dummyContainerUsers.length))
    const containerUser = dummyContainerUsers[i];
    console.log(containerUser);
    containerItem.userId = containerUser.userId;
    containerItem.containerId = containerUser.containerId;
    console.log(containerItem);
  });

  const dummyContainerItems = await Promise.all(
    containerItems.map((item) => ContainerItem.create(item))
  );

  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    dummyUsers,
    dummyContainers,
    dummyItems,
    dummyContainerUsers,
    dummyContainerItems,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

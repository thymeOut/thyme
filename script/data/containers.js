const faker = require('faker');

let containers = [
  {
    name: "John's Fridge",
    type: 'fridge',
    ownerId: 1,
  },
  {
    name: "Jane's Pantry",
    type: 'pantry',
    ownerId: 2,
    imageUrl: 'https://www.closetcreationsri.com/_images/pantry.png',
  },
];

const containerTypes = ['fridge', 'pantry', 'freezer', 'minifridge'];

for (let i = 0; i < 100; i++) {
  const newContainer = {
    name: faker.random.words(3),
    type: containerTypes[Math.floor(Math.random() * 4)],
    ownerId: Math.floor(Math.random() * 104),
  };



  containers.push(newContainer);
}

module.exports = containers;

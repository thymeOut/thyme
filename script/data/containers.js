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

  if (newContainer.type === 'pantry') {
    newContainer.imageUrl =
      'https://www.closetcreationsri.com/_images/pantry.png';
  } else if (newContainer.type === 'freezer') {
    newContainer.imageUrl =
      'https://smhttp-ssl-87202.nexcesscdn.net/pub/media/catalog/product/cache/90b96709c3e472eb35f4c1eef9a9f5f1/u/h/uhfz124-ss01a_1.jpg';
  } else if (newContainer.type === 'minifridge') {
    newContainer.imageUrl =
      'https://images.thdstatic.com/productImages/bc530048-aaa8-4118-b5a0-91d4a26e78aa/svn/red-galanz-mini-fridges-glr31trder-e1_600.jpg';
  }

  containers.push(newContainer);
}

module.exports = containers;

const faker = require('faker');

const users = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@email.com',
    isAdmin: true,
    password: 'pw1',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    password: 'pw2',
    isAdmin: true,
  },
  {
    firstName: 'Hello',
    lastName: 'World',
    email: 'hello@world.com',
    password: 'pw3',
    isAdmin: false,
  },
];

for (let i = 4; i < 105; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = `pw${i}`;
  const isAdmin = false;

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    isAdmin,
  };

  users.push(newUser);
}

module.exports = users;

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

for (let index = 3; index < 20; index++) {
  users.push({
    firstName: `Test${index}`,
    lastName: 'World',
    email: `test${index}@world.com`,
    password: 'pw',
    isAdmin: false,
  })
}

module.exports = users;

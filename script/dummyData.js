const users = [
  {
    firstName: "John",
    lastName: "Smith",
    email: "jsmith@email.com",
    isAdmin: true,
    password: "pw1"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jdoe@email.com",
    password: "pw2",
    isAdmin: true,
  },
  {
    firstName: "Hello",
    lastName: "World",
    email: "hello@world.com",
    password: "pw3",
    isAdmin: false,
  },
];

const containers = [
  {
    name: "John's Fridge",
    type: "fridge",
  },
  {
    name: "Jane's Pantry",
    type: "pantry",
  }
]

const items = [
  {
    name: "egg",
  },
  {
    name: "bacon",
  },
  {
    name: "sardines",
  }
]

const containerUsers = [
  {
    userId: 1,
    containerId: 1,
    role: 'owner',
  },
  {
    userId: 2,
    containerId: 1,
    role: 'user',
  },
  {
    userId: 2,
    containerId: 2,
    role: 'owner',
  }
]

const containerItems = [
  {
    userId: 1,
    containerId: 1,
    itemId: 1,
    quantity: 1,
  },
  {
    userId: 1,
    containerId: 1,
    itemId: 2,
    quantity: 3,
  },
  {
    userId: 2,
    containerId: 1,
    itemId: 3,
    quantity: 234,
  }
]

module.exports = { users, containers, items, containerItems, containerUsers };

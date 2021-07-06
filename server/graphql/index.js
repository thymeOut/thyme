const { gql } = require("@apollo/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  models: { User, Container, Item, ContainerItem, ContainerUser },
} = require("../db/");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
    containers: [Container]
    container(id: ID): Container
    searchContainer(name: String!): Container
    items: [Item]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean
    token: String
    containers: [Container]
    containerItems: [ContainerItem]
    containerUsers: [ContainerUser]
  }

  type Container {
    id: ID!
    name: String!
    type: ContainerType!
    owner: User!
    users: [User!]
    items: [Item!]
    containerUsers: [ContainerUser]
    containerItems: [ContainerItem]
  }

  type ContainerItem {
    id: ID!
    quantity: Int!
    expiration: Date
    imageUrl: String
    container: Container
    item: Item
    user: User
    userId: ID!
  }

  type ContainerUser {
    id: ID!
    role: Role!
    container: Container
    user: User
  }

  type Item {
    id: ID!
    name: String!
    imageUrl: String!
    containerItem: ContainerItem
    users: [User]
    containers: [Container]
  }

  enum ContainerType {
    fridge
    pantry
    minifridge
    freezer
  }

  enum Role {
    user
    owner
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createContainer(name: String!, type: ContainerType!): Container!
    addUserToContainer(email: String!, containerId: ID!): Container!
  }
  scalar Date
`;


const rootResolver = {
  Query: {
    async users(_, __, context) {
      if (!context.user.isAdmin) {
        return null;
      } else {
        const users = await User.findAll({
          include: Container,
        });
        return users;
      }
    },

    async user(_, args, context) {
      if (context.user.id !== +args.id && !context.user.isAdmin) {
        return null;
      } else {
        return await User.findByPk(args.id, {
          include: Container,
        });
      }
    },

    async containers() {
      return await Container.findAll();
    },

    async container(_, args, context) {
      // if (!context.user.id) {
      //   return null;
      // } else {
        const data = await Container.findByPk(args.id, {
          include: [Item, User, {
            model: User,
            as: 'owner',
          }],
        });
        return data;
      // }
    },

    async searchContainer(_, args, context) {
      const data = await Container.findOne({
        where: { name: args.name },
        include: [User, Item],
      });
      return data;
    },

    async items(_, args, context) {
      return await Item.findAll();
    },
  },
  Mutation: {
    async createUser(_, args) {

      try {
        const user = await User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });

        const token = await user.generateToken();
        console.log('token--->', token)
        return { token, user };
      } catch (error) {
        console.error("error in createUser mutation");
      }
    },

    async login(_, args) {
      const data = await User.authenticate(args);
      return data;
    },

    async createContainer(_, args, context) {
      try {
        const container = await Container.create({
          name: args.name,

          type: args.type,
          ownerId: context.user.id,
        });
        const user = await User.findByPk(context.user.id);
        container.addUser(user.id, { through: { role: "owner" } });
        return container;
      } catch (error) {
        console.log(error);
      }
    },
    async addUserToContainer(_, args) {
      try {
        const container = await Container.findByPk(args.containerId);
        const user = await User.findOne({
          where: {
            email: args.email,
          },
        });
        container.addUser(user.id, { through: { role: "user" } });
        return container;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  rootResolver,
  typeDefs,
};

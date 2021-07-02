const { gql } = require("@apollo/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  models: { User, Container, Item, Container_Item, Container_User },
} = require("../db/");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
    containers: [Container]
    container(id: ID): Container
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
  }
  type Container {
    id: ID!
    name: String!
    type: ContainerType!
    users: [User!]
  }

  enum ContainerType {
    fridge
    pantry
    minifridge
    freezer
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): AuthPayload!
    login(email: String!, password: String!): User!
  }
  scalar Date
`;

// createContainer(name: String!, type: ContainerType ): Workspace

const rootResolver = {
  Query: {
    async users(_, __, context) {
      console.log("retrieving users");
      const users = await User.findAll({
        include: Container,
      });
      return users;
    },

    // context: { body, header, user: {user info} }
    async user(_, args, context) {
      console.log(context.user);
      if (!context.user.id || !context.user.isAdmin) {
        return null;
      } else {
        return await User.findByPk(context.user.id, {
          include: Container,
        });
      }
    },
    async containers() {
      return await Container.findAll();
    },
  },
  Mutation: {
    async createUser(_, args) {
      console.log("args -->", args);
      try {
        const user = await User.create(args);
        console.log("user -->", user);
        const token = await user.generateToken();
        console.log("token -->", token);

        return { token: token, user: user };
      } catch (error) {
        console.error("error in createUser mutation");
      }
    },
    async login(_, args) {
      console.log(args);
      const token = await User.authenticate({ args });
      return { token };
    },
    // async createWorkspace(_, args) {
    //     console.log(args)
    //     try {
    //         const workspace = await Workspace.create(args);
    //         const user = await User.findByPk(args.creator)
    //         user.addWorkspace(workspace)
    //         // user.createWorkspaces(workspace)
    //         // workspace.createUsers(user)
    //         return workspace;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
  },
};

module.exports = {
  rootResolver,
  typeDefs,
};

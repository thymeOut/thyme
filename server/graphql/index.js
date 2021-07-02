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
    login(email: String!, password: String!): AuthPayload!
  }
  scalar Date
`;

// createContainer(name: String!, type: ContainerType ): Workspace

const rootResolver = {
  Query: {
    async users(_, __, context) {
      console.log(context)
      if (!context.user.isAdmin) {
        return null;
      } else {
        console.log("retrieving users");
        console.log(context.user);
        const users = await User.findAll({
          include: Container,
        });
        return users;
      }
    },

    // context: { body, header, user: {user info} }
    async user(_, args, context) {
      console.log(context);
      if (context.user.id !== +args.id && !context.user.isAdmin) {
        return  null;
      } else {
        return await User.findByPk(args.id, {
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
      try {
        const user = await User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        });
        const token = await user.generateToken();

        return { token, user };
      } catch (error) {
        console.error("error in createUser mutation");
      }
    },
    async login(_, args) {
      const data = await User.authenticate(args);
      return data;
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

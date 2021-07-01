const { User, Workspace } = require("../db/index");
const { gql } = require("@apollo/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
    table: Table
    reservation: Reservation
    workspace: Workspace
    workspaces: [Workspace]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    role: String
    imageUrl: String
    team: String!
    token: String
    workspaces: [Workspace]
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      team: String!
    ): User!
    login(email: String!, password: String!): User
    createWorkspace(spaceName: String!, creator: String! ): Workspace
  }

  type Table {
    id: ID!
    team: String!
    shape: String!
    users: [User]
    reservations: [Reservation]
  }
  type Reservation {
    id: ID!
    reserved: Boolean!
    date: Date!
    user: User
    table: Table
  }
  type Workspace {
    id: ID!
    spaceName: String!
    imageUrl: String
    creator: String!
    users: [User]
    tables: [Table]
  }
  scalar Date
`;

const rootResolver = {
  Query: {
    async users() {
        console.log('retrieving users')
        const users = await User.findAll({
          include: Workspace
        });
      return users
    },
    async user(_, args) {
      console.log(args)
      return await User.findByPk(args.id, {
        include: Workspace
      });
    },
    async workspaces() {
      return await Workspace.findAll();
    },
  },
  Mutation: {
    async createUser(_, args) {
      const password = await bcrypt.hash(args.password, 10);
      const user = await User.create({ ...args, password });
      const token = jwt.sign({ userId: user.id }, "APP_SECRET");

      return { user, token };
    },
    async login(_, args) {
      console.log(args)
      const user = await User.findAll({
        where: {
          email: args.email,
        },
        include: [Workspace]
      });
      if (!user) throw new Error("No error exists!");
      const validUser = await bcrypt.compare(args.password, user[0].password);
      if (!validUser) throw new Error("Invalid Password");
      const token = jwt.sign({ id: user.id }, "APP_SECRET", { expiresIn: "1d" });
      const id = user[0].id
      return { token, id };
    },
    async createWorkspace(_, args) {
        console.log(args)
      try {
        const workspace = await Workspace.create(args);
        const user = await User.findByPk(args.creator)
        user.addWorkspace(workspace)
        // user.createWorkspaces(workspace)
        // workspace.createUsers(user)
        return workspace;
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

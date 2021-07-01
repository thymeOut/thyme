const { gql } = require("@apollo/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    models: {
        User,
        Container,
        Item,
        Container_Item,
        Container_User
    }
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
    isAdmin: Boolean!
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
    ): User!
    login(email: String!, password: String!): User
  }
  scalar Date
`;

    // createContainer(name: String!, type: ContainerType ): Workspace


const rootResolver = {
    Query: {
        async users() {
            console.log('retrieving users')
            const users = await User.findAll({
                include: Container
            });
            return users
        },
        async user(_, args) {
            return await User.findByPk(args.id, {
                include: Container
            });
        },
        async containers() {
            return await Container.findAll();
        },
    },
    // Mutation: {
    //     async updateUser(_, args) {
    //         const 
    //     }
    //     async createUser(_, args) {
    //         const password = await bcrypt.hash(args.password, 10);
    //         const user = await User.create({ ...args, password });
    //         const token = jwt.sign({ userId: user.id }, "APP_SECRET");

    //         return { user, token };
    //     },
    //     async login(_, args) {
    //         console.log(args)
    //         const user = await User.findAll({
    //             where: {
    //                 email: args.email,
    //             },
    //             include: [Workspace]
    //         });
    //         if (!user) throw new Error("No error exists!");
    //         const validUser = await bcrypt.compare(args.password, user[0].password);
    //         if (!validUser) throw new Error("Invalid Password");
    //         const token = jwt.sign({ id: user.id }, "APP_SECRET", { expiresIn: "1d" });
    //         const id = user[0].id
    //         return { token, id };
    //     },
    //     async createWorkspace(_, args) {
    //         console.log(args)
    //         try {
    //             const workspace = await Workspace.create(args);
    //             const user = await User.findByPk(args.creator)
    //             user.addWorkspace(workspace)
    //             // user.createWorkspaces(workspace)
    //             // workspace.createUsers(user)
    //             return workspace;
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    // },
};

module.exports = {
    rootResolver,
    typeDefs,
};

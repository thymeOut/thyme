const { gql } = require('@apollo/client');
const {
  models: { User, Container, Item, ContainerItem, ContainerUser },
} = require('../db/');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');

console.log('test');

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
    containers: [Container]
    container(id: ID): Container
    searchContainer(name: String!): [Container]
    items: [Item]
    containerItems(containerId: ID): [ContainerItem]
    containerItem(id: ID): Item
    item(id: ID): Item
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
    containerUser: ContainerUser
  }

  type Container {
    id: ID!
    name: String!
    type: ContainerType!
    imageUrl: String!
    isActive: Boolean!
    ownerId: ID!
    users: [User!]
    items: [Item!]
    containerUser: ContainerUser
    containerItems: [ContainerItem]
  }

  type ContainerItem {
    id: ID!
    originalQuantity: Int!
    quantityUsed: Int
    expiration: Date
    price: Int
    createdAt: Date
    imageUrl: String
    itemStatus: ItemStatus!
    item: Item
    user: User
    container: Container!
    containerId: ID!
    itemId: ID!
    userId: ID!
  }

  type ContainerUser {
    id: ID!
    role: Role!
    container: Container
    user: User
    ownerId: ID!
  }

  type Item {
    id: ID!
    name: String!
    imageUrl: String
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

  enum ItemStatus {
    ACTIVE
    EXPIRED
    REMOVED
    EXPIRED_REMOVED
  }

  enum Role {
    user
    owner
    pending
  }

  input ContainerInput {
    name: String
    type: ContainerType
    imageUrl: String
    isActive: Boolean
  }

  input UserInput {
    id: ID
    email: String
    role: Role!
  }

  input UserInfoInput {
    firstName: String
    lastName: String
    email: String
    isAdmin: Boolean
  }

  input ContainerItemInput {
    quantityUsed: Int
    expiration: Date
    imageUrl: String
    userId: ID
    itemStatus: ItemStatus
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
    addUserToContainer(containerId: ID!, input: UserInput): Container!
    updateContainer(id: ID!, input: ContainerInput): Container
    addItemToContainer(
      containerId: ID!
      itemId: ID!
      originalQuantity: Int!
      expiration: Date
      itemStatus: ItemStatus!
      price: Int
    ): ContainerItem!
    createItem(name: String!, imageUrl: String): Item!
    updateContainerItem(id: ID!, input: ContainerItemInput): ContainerItem
    updateUser(id: ID!, input: UserInfoInput): User
    updateContainerUser(id: ID!, input: Role): ContainerUser
    deleteContainerUser(id: ID!): ContainerUser
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
          include: [
            { model: Container },
            { model: ContainerItem, include: Item },
          ],
        });
        return users;
      }
    },

    async user(_, args, context) {
      try {
        if (context.user.id !== +args.id && !context.user.isAdmin) {
          return null;
        } else {
          const data = await User.findByPk(args.id, {
            include: [
              { model: Container },
              { model: ContainerItem, include: Item },
            ],
          });
          return data;
        }
      } catch {
        throw new UserInputError(
          'Failed to get events due to validation errors'
        );
      }
    },

    async containers() {
      return await Container.findAll();
    },

    async container(_, args, context) {
      if (!context.user.id) {
        return null;
      } else {
        const data = await Container.findByPk(args.id, {
          include: [Item, User],
        });
        return data;
      }
    },

    async searchContainer(_, args, context) {
      const data = await Container.findAll({
        where: { name: args.name },
        include: [User, Item],
      });
      return data;
    },
    async item(_, args, context) {
      let data = await Item.findByPk(args.id);
      return data;
    },
    async items(_, args, context) {
      return await Item.findAll();
    },

    async containerItems(_, args, context) {
      try {
        if (!context.user.id) {
          return null;
        } else {
          const data = await ContainerItem.findAll({
            where: {
              containerId: args.containerId,
            },
          });
          return data;
        }
      } catch (error) {
        console.error('error in containerItems query!');
      }
    },

    async containerItem(_, args, context) {
      try {
        if (!context.user.id) {
          return null;
        } else {
          const data = await Item.findOne({
            include: {
              model: Container,
              through: {
                where: {
                  id: args.id,
                },
              },
            },
          });
        }
      } catch (error) {
        console.error('error in containerItem query!');
      }
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
        return { token, user };
      } catch (error) {
        throw new UserInputError(error);
        // error.errors[0].message)
      }
    },

    async login(_, args) {
      try {
        const data = await User.authenticate(args);
        return data;
      } catch {
        console.log('error');
      }
    },

    // 1. Create a root resolver in respective category (query or mutation)
    // Simply replicate what your restful API would look like

    //2. (Since I can't comment within schema), create mutation within schema
    //Format =>
    /*

                 parameter
                    |   type                     return obj
                    |    |                          |
        updateUser(id: ID!, input: UserInfoInput): User
            |                           |
            |                     define this type in schema
            |
        Make sure the schema mutation name matches the resolver name
    */
    async updateUser(_, args, context) {
      const isAdmin = context.user.isAdmin ? args.input.isAdmin : false;
      if (!context.user.isAdmin && +args.input.id !== +context.user.id) {
        throw new Error('You do not have permission to edit');
      } else {
        const user = await User.findByPk(args.id);

        await user.update({
          firstName: args.input.firstName,
          lastName: args.input.lastName,
          email: args.input.email,
          isAdmin: isAdmin,
        });
      }
    },

    async createContainer(_, args, context) {
      try {
        const container = await Container.create({
          name: args.name,
          type: args.type,
          ownerId: context.user.id,
        });
        const user = await User.findByPk(context.user.id);
        container.addUser(user.id, { through: { role: 'owner' } });
        return container;
      } catch (error) {
        console.log(error);
      }
    },
    async addUserToContainer(_, args, context) {
      const searchEmail = args.input.email ? args.input.email : '';
      const searchUserId = args.input.id ? args.input.id : 9999999999;

      try {
        if (args.input.role === 'owner') {
          throw new Error('Invalid Request! Nice try buckaroo');
        }
        const container = await Container.findByPk(args.containerId);

        const user = await User.findOne({
          where: {
            [Op.or]: [{ email: searchEmail }, { id: searchUserId }],
          },
        });

        if (context.user.id === container.ownerId) {
          container.addUser(user.id, { through: { role: args.input.role } });
        } else {
          container.addUser(user.id, { through: { role: 'pending' } });
          console.log(
            'You are not the owner of this container, adding user as pending'
          );
        }
        return container;
      } catch (error) {
        console.log(error);
      }
    },

    async updateContainer(_, args, context) {
      try {
        const container = await Container.findByPk(args.id);
        return await container.update(args.input);
      } catch (error) {}
    },

    async createItem(_, args, context) {
      try {
        if (args.imageUrl) {
          return await Item.create({
            name: args.name,
            imageUrl: args.imageUrl,
          });
        } else {
          return await Item.create({
            name: args.name,
          });
        }
      } catch (error) {
        console.error('error creating item in GraphQL');
      }
    },

    async addItemToContainer(_, args, context) {
      try {
        const item = await Item.findOrCreate({
          where: { id: args.itemId },
          defaults: { name: args.itemName },
        });
        const containerItem = await ContainerItem.create({
          userId: context.user.id,
          originalQuantity: args.originalQuantity,
          itemStatus: args.itemStatus,
          containerId: args.containerId,
          expiration: args.expiration,
          itemId: item[0].dataValues.id,
          price: args.price,
        });
        return containerItem;
      } catch (error) {
        console.log(error);
      }
    },

    async updateContainerItem(_, args, context) {
      try {
        const containerItem = await ContainerItem.findByPk(args.id);
        const data = await containerItem.update(args.input);

        return data;
      } catch (error) {
        console.error('error in updateContainerItem mutation resolver');
      }
    },

    async updateContainerUser(_, args, context) {
      try {
        const containerUser = await ContainerUser.findByPk(args.id);
        return await containerUser.update({
          role: args.input,
        });
      } catch (error) {
        console.error('error in updateContainerUser mutation resolver');
      }
    },

    async deleteContainerUser(_, args, context) {
      try {
        const containerUser = await ContainerUser.findByPk(args.id);
        const data = await containerUser.destroy();
        console.log(data);
        return containerUser;
      } catch (error) {
        console.error('error in deleteContainerUser mutation reslover');
      }
    },
  },
};

module.exports = {
  rootResolver,
  typeDefs,
};

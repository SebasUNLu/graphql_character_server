import { ApolloServer, UserInputError, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Character {
    user_id: ID!
    name: String!
    title: String
    class: String
    stat_str: Int
    stat_int: Int
    stat_dex: Int
    image_big: String
    image_portrait: String
    armor_type: String
    weapon_skills: [String]
  }

  type Ability {
    id: ID
    name: String!
    description: String
    type: String
  }

  type Query {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    register: async (root, args) => {
      const { username, password } = args;
      
    },
    login: async (root, args) => {
      const { username, password } = args;
    },
  },
};

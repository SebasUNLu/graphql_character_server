import { readFileSync } from "fs";
import path from "path";
import { usersResolver } from "./resolvers/user.resolver";
import { charactersResolver } from "./resolvers/character.resolver";

const userTypes = readFileSync(path.join(__dirname, './typedefs/user.graphql'), {
  encoding: 'utf-8'
})

const characterTypes = readFileSync(path.join(__dirname, './typedefs/character.graphql'), {
  encoding: 'utf-8'
})

const abilityTypes = readFileSync(path.join(__dirname, './typedefs/ability.graphql'), {
  encoding: 'utf-8'
})

export const typeDefs = `
  ${userTypes}
  ${characterTypes}
  ${abilityTypes}
`;

export const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...charactersResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation
  }
}
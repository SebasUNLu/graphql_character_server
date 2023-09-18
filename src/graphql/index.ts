import { readFileSync } from "fs";
import path from "path";
import { usersResolver } from "./resolvers/user.resolver";
import { charactersResolver } from "./resolvers/character.resolver";
import { abilityResolver } from "./resolvers/ability.resolver";

const userTypes = readFileSync(path.join(__dirname, './typedefs/user.graphql'), {
  encoding: 'utf-8'
})

const characterTypes = readFileSync(path.join(__dirname, './typedefs/character.graphql'), {
  encoding: 'utf-8'
})

const abilityTypes = readFileSync(path.join(__dirname, './typedefs/ability.graphql'), {
  encoding: 'utf-8'
})

const errorTypes = readFileSync(path.join(__dirname, './typedefs/error.graphql'), {
  encoding: 'utf-8'
})

export const typeDefs = `
  ${userTypes}
  ${characterTypes}
  ${abilityTypes}
  ${errorTypes}
`;

export const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...charactersResolver.Query,
    ...abilityResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...charactersResolver.Mutation,
    ...abilityResolver.Mutation
  }
}
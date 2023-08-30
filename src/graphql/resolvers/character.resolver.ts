import { AuthenticationError } from "apollo-server";
import { GraphqlContext } from "../../types/contextType";
import { createChar, getCharacter, getUserChars } from "../services/character.service";
import { Character, NewInputCharacter } from "types";

export const charactersResolver = {
  Query: {
    characters: async (_: any, args: any, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      return await getUserChars(userId)
    },
    character: async (_: any, args: { charId: number }, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      return getCharacter(args.charId)
    }
  },
  Mutation: {
    createCharacter: async (_: any, args: NewInputCharacter, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      return await createChar(userId, args)
    }
  }
}
import { AuthenticationError } from "apollo-server";
import { GraphqlContext } from "../../types/contextType";
import { createChar, getCharacter, getUserChars, updateChar } from "../services/character.service";
import { Character, NewInputCharacter, UpdateInputCharacter } from "types";

type UserUpdateCharacter = {
  charId: number,
  characterInfo: UpdateInputCharacter
}

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
    },
    updateCharacter: async (_: any, { charId, characterInfo }: UserUpdateCharacter, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      console.log("Char Id: ", charId);
      console.log("Character Info: ", characterInfo);
      
      return await updateChar(userId, charId, characterInfo)
    }
  }
}
import { AuthenticationError } from "apollo-server";
import { GraphqlContext } from "../../types/contextType";
import { createChar, getCharacter, getUserChars, updateChar } from "../services/character.service";
import { Character, NewInputCharacter, UpdateInputCharacter } from "types";

type UserUpdateCharacter = {
  charId: number, 
  name?: string
  title?: string
  char_class?: string
  stat_str?: number
  stat_int?: number
  stat_dex?: number
  image_big?: string
  image_portrait?: string
  armor_type?: string
  main_weapon?: string
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
    updateCharacter: async (_: any, { charId, ...info }: UserUpdateCharacter, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      console.log("Char Id: ", charId);
      console.log("Character Info: ", info);

      return await updateChar(userId, charId, info)
    }
  }
}
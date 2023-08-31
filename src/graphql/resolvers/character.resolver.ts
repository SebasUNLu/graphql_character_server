import { AuthenticationError } from "apollo-server"; import { PrismaClient } from "@prisma/client";
import { GraphqlContext } from "../../types/contextType";
import { createChar, deleteChar, getCharacter, getUserChars, updateChar } from "../services/character.service";
import { Character, NewInputCharacter, UpdateInputCharacter } from "types";

const prisma = new PrismaClient();

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

const checkIfUser = async (userId: number | null) => {
  console.log("user id: ", userId);

  if (!userId)
    throw new AuthenticationError('Invalid Token')
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!foundUser)
    throw new AuthenticationError('Invalid Token')
  return userId
}

export const charactersResolver = {
  Query: {
    characters: async (_: any, args: any, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await getUserChars(validatedId)
    },
    character: async (_: any, args: { charId: number }, { userId }: GraphqlContext) => {
      await checkIfUser(userId)
      return getCharacter(args.charId)
    }
  },
  Mutation: {
    createCharacter: async (_: any, args: NewInputCharacter, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await createChar(validatedId, args)
    },
    updateCharacter: async (_: any, { charId, ...info }: UserUpdateCharacter, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await updateChar(validatedId, charId, info)
    },
    deleteCharacter: async (_: any, { charId }: { charId: number }, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await deleteChar(validatedId, charId)
    }
  }
}
import { PrismaClient } from "@prisma/client";
import { Character, NewInputCharacter } from "types";

const prisma = new PrismaClient();



export const getUserChars = async (userId: number) => {
  const characters = await prisma.character.findMany({
    where: {
      user_id: userId
    }
  })

  return characters
}

export const getCharacter = async (charId: number) => {
  const characterFound = await prisma.character.findUnique({
    where: {
      id: charId
    }
  })

  return characterFound
}

export const createChar = async (userId: number, inputCharacter: NewInputCharacter) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const newCharacter = await prisma.character.create({
    data: {
      ...inputCharacter,
      user: { connect: { id: user?.id } }
    }
  })

  return newCharacter
}
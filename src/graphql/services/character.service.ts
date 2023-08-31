import { PrismaClient } from "@prisma/client";
import { Character, NewInputCharacter, UpdateInputCharacter } from "types";

const prisma = new PrismaClient();

export const getUserChars = async (userId: number) => {
  const characters = await prisma.character.findMany({
    where: {
      user_id: userId
    },
    include: { abilities: true }
  })

  return characters
}

export const getCharacter = async (charId: number) => {
  const characterFound = await prisma.character.findUnique({
    where: {
      id: charId
    },
    include: { abilities: true }
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

export const updateChar = async (userId: number, charId: number, updateInputCharacter: UpdateInputCharacter) => {
  const character = await prisma.character.update({
    where: {
      id: charId,
      user_id: userId
    },
    data: {
      ...updateInputCharacter
    },
    include: { abilities: true }
  })
  return character;
}
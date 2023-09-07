import { PrismaClient } from "@prisma/client";
import { NewInputCharacter, UpdateInputCharacter } from "types";
const prisma = new PrismaClient();

export const getCharacterQuery = async (user_id: number, character_id: number) => {
  return await prisma.character.findUnique({
    where: {
      id: character_id,
      user_id
    },
    include: {
      abilities: true
    }
  })
}

export const getUserCharactersQuery = async (user_id: number) => {
  return await prisma.character.findMany({
    where: {
      user_id
    },
    include: {
      abilities: true
    }
  })
}

export const createCharacterQuery = async (user_id: number, inputCharacter: NewInputCharacter) => {
  return await prisma.character.create({
    data: {
      ...inputCharacter,
      user: { connect: { id: user_id } }
    },
    include: {
      abilities: true
    }
  })
}

export const updateCharacterQuery = async (
  user_id: number,
  character_id: number,
  updateInputCharacter: UpdateInputCharacter
) => {
  return await prisma.character.update({
    where: {
      id: character_id,
      user_id
    },
    data: {
      ...updateInputCharacter
    },
    include: { abilities: true }
  })
}

export const deleteCharacterQuery = async (user_id: number, character_id: number) => {
  return await prisma.character.delete({
    where: {
      id: character_id,
      user_id
    }
  })
}
import { PrismaClient } from "@prisma/client";
import { Character, NewInputCharacter, UpdateInputCharacter } from "types";

const prisma = new PrismaClient();

interface GetCharacterError {
  __typename: string,
  characterNotFoundError?: string
  wrongUserError?: string
  noUserError?: string
  generalError?: string
}

const buildError = (key: keyof GetCharacterError, message: string): GetCharacterError => {
  return {
    __typename: "GetCharacterError",
    [key]: message
  }
}

export const getUserChars = async (userId: number) => {
  const characters = await prisma.character.findMany({
    where: {
      user_id: userId
    },
    include: { abilities: true }
  })

  return characters
}

/**
 * Get a character by ID. It checks if the User is correct.
 * @param charId 
 * @returns Character, wrongUser, characterNotFound, generalError
 */
export const getCharacter = async (user_id: number, character_id: number) => {
  try {
    const characterFound = await prisma.character.findUnique({
      where: {
        id: character_id
      },
      include: { abilities: true }
    })
    if (!characterFound)
      return buildError("characterNotFoundError", "No se encontró al personaje.")
    if (characterFound.user_id !== user_id)
      return buildError("wrongUserError", "No le pertenece el personaje al que está tratando de acceder.")
    return {
      __typename: "GetCharacterSuccess",
      character: characterFound
    }
  } catch (error) {
    return buildError("generalError", "Hubo un problema. Inténtelo de nuevo más tarde")
  }
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

export const deleteChar = async (userId: number, charId: number) => {
  const foundChar = await prisma.character.findUnique({
    where: {
      id: charId,
      user_id: userId
    }
  })

  const deletedCharacter = await prisma.character.delete({
    where: {
      id: charId,
      user_id: userId
    }
  })

  return deletedCharacter;
}
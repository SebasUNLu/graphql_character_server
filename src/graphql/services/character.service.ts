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
// --------------------------------------------------------------------------------

// ------------------------------ Create Character ------------------------------
export const createChar = async (userId: number, inputCharacter: NewInputCharacter) => {
  console.log("----- Create Character -----")
  try {
    let { stat_dex, stat_int, stat_str, name } = inputCharacter
    if (!stat_dex) stat_dex = 0
    if (!stat_int) stat_int = 0
    if (!stat_str) stat_str = 0
    if ((stat_dex < 0) || (stat_int < 0) || (stat_str < 0))
      return {
        __typename: "CreateCharacterError",
        message: "Las estadísticas deben ser 0 o superior."
      }

    if (name.length < 3)
      return {
        __typename: "CreateCharacterError",
        message: "El nombre debe tener más de 3 caracteres."
      }
    console.log("New Character: ", inputCharacter)

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!user)
      return {
        __typename: "CreateCharacterError",
        message: "No se ha encontrado el usuario."
      }
    console.log("User", user);

    const newCharacter = await prisma.character.create({
      data: {
        ...inputCharacter,
        user: { connect: { id: user.id } }
      },
      include: {
        abilities: true
      }
    })
    console.log("New Character: ", newCharacter)
    return {
      __typename: "MutationCharacterSuccess",
      character: newCharacter
    }
  } catch (error) {
    return {
      __typename: "CreateCharacterError",
      message: "Hubo un problema al crear el personaje."
    }
  }
}
// --------------------------------------------------------------------------------

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
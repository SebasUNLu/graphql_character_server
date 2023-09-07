import { PrismaClient } from "@prisma/client";
import { NewInputCharacter, UpdateInputCharacter } from "types";
import { createCharacterQuery, deleteCharacterQuery, getCharacterQuery, getUserCharactersQuery, updateCharacterQuery } from "../utils/queries/character";

const prisma = new PrismaClient();

// ------------------------------ Get User Character ------------------------------
export const getUserChars = async (userId: number) => {
  return await getUserCharactersQuery(userId)
}
// ------------------------------ x ------------------------------

// ------------------------------ Get Character ------------------------------
export const getCharacter = async (user_id: number, character_id: number) => {
  try {
    const characterFound = await getCharacterQuery(user_id, character_id)
    if (!characterFound)
      return {
        __typename: "DefaultError",
        message: "No se encontró al personaje."
      }
    return {
      __typename: "GetCharacterSuccess",
      character: characterFound
    }
  } catch (error) {
    return {
      __typename: "DefaultError",
      message: "Hubo un problema. Inténtelo de nuevo más tarde"
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Create Character ------------------------------
export const createChar = async (userId: number, inputCharacter: NewInputCharacter) => {
  try {
    let { stat_dex, stat_int, stat_str, name } = inputCharacter
    if (!stat_dex) stat_dex = 0
    if (!stat_int) stat_int = 0
    if (!stat_str) stat_str = 0
    if ((stat_dex < 0) || (stat_int < 0) || (stat_str < 0))
      return {
        __typename: "StatNegativeError",
        message: "Las estadísticas deben ser 0 o superior."
      }
    if (name.length < 3)
      return {
        __typename: "ShortNameError",
        message: "El nombre debe tener más de 3 caracteres."
      }
    const newCharacter = await createCharacterQuery(userId, inputCharacter)
    return {
      __typename: "MutationCharacterSuccess",
      character: newCharacter
    }
  } catch (error) {
    return {
      __typename: "DefaultError",
      message: "Hubo un problema al crear el personaje."
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Update Character ------------------------------ 
export const updateChar = async (userId: number, charId: number, updateInputCharacter: UpdateInputCharacter) => {
  try {
    const { stat_dex, stat_int, stat_str, name } = updateInputCharacter
    if (
      (stat_dex && stat_dex < 0)
      || (stat_int && stat_int < 0)
      || (stat_str && stat_str < 0)
    ) {
      return {
        __typename: "StatNegativeError",
        message: "Las estadísticas de fuerza, inteligencia y destreza no pueden ser menores que 0."
      }
    }
    if (name && name?.length < 3) {
      return {
        __typename: "ShortNameError",
        message: "El nombre debe tener minimo 3 caracteres."
      }
    }
    const foundCharacter = await getCharacterQuery(userId, charId)
    if (!foundCharacter)
      return {
        __typename: "CharacterNotFoundError",
        message: `No se ha encontrado al personaje con ID ${charId}.`
      }

    const character = await updateCharacterQuery(userId, charId, updateInputCharacter)
    return { __typename: "MutationCharacterSuccess", character };

  } catch (error) {
    console.log(error);
    return { __typename: "DefaultError", message: "Hubo un error." }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Delete Character ------------------------------ 
export const deleteChar = async (userId: number, charId: number) => {
  try {
    const foundChar = await getCharacterQuery(userId, charId)
    if (!foundChar) {
      return {
        __typename: "CharacterNotFoundError",
        messge: "No se encontró el personaje."
      }
    }
    const deletedCharacter = await deleteCharacterQuery(userId, charId)
    return {
      __typename: "MutationCharacterSuccess",
      character: deletedCharacter
    };
  } catch (error) {
    return {
      __typename: "DefaultError",
      messge: "Algo."
    }
  }
}
// ------------------------------ x ------------------------------
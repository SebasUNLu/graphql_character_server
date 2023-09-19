import { PrismaClient } from "@prisma/client";
import { NewInputCharacter, UpdateInputCharacter } from "types";
import { createCharacterQuery, deleteCharacterQuery, getCharacterQuery, getUserCharactersQuery, updateCharacterQuery } from "../utils/queries/character";
import { ClientError } from "../../utils/errors/ClientError";

const prisma = new PrismaClient();

// ------------------------------ Get User Characters ------------------------------
export const getUserChars = async (userId: number) => {
  return await getUserCharactersQuery(userId)
}
// ------------------------------ x ------------------------------

// ------------------------------ Get Character ------------------------------
export const getCharacter = async (user_id: number, character_id: number) => {
  const characterFound = await getCharacterQuery(user_id, character_id)
  if (!characterFound)
    throw new ClientError("Character not found", "CharacterNotFoundError")
  return {
    __typename: "GetCharacterSuccess",
    character: characterFound
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Create Character ------------------------------
export const createChar = async (userId: number, inputCharacter: NewInputCharacter) => {
  let { stat_dex = 0, stat_int = 0, stat_str = 0, name } = inputCharacter
  if ((stat_dex < 0) || (stat_int < 0) || (stat_str < 0))
    throw new ClientError("Stats can't be negative", "InputStatError")
  if (name.length < 3)
    throw new ClientError("Name must be at least 3 characters long", "InputNameError")
  const newCharacter = await createCharacterQuery(userId, inputCharacter)
  return {
    __typename: "MutationCharacterSuccess",
    character: newCharacter
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Update Character ------------------------------ 
export const updateChar = async (userId: number, charId: number, updateInputCharacter: UpdateInputCharacter) => {
  const { stat_dex, stat_int, stat_str, name } = updateInputCharacter
  if (
    (stat_dex && stat_dex < 0)
    || (stat_int && stat_int < 0)
    || (stat_str && stat_str < 0)
  )
    throw new ClientError("Stats can't be negative", "InputStatError")
  if (name && name?.length < 3)
    throw new ClientError("Name must be at least 3 characters long", "InputNameError")
  const foundCharacter = await getCharacterQuery(userId, charId)
  if (!foundCharacter)
    throw new ClientError("Character not found", "CharacterNotFoundError")
  const character = await updateCharacterQuery(userId, charId, updateInputCharacter)
  return { __typename: "MutationCharacterSuccess", character };
}
// ------------------------------ x ------------------------------

// ------------------------------ Delete Character ------------------------------ 
export const deleteChar = async (userId: number, charId: number) => {
  const foundChar = await getCharacterQuery(userId, charId)
  if (!foundChar)
    throw new ClientError("Character not found", "CharacterNotFoundError")
  const deletedCharacter = await deleteCharacterQuery(userId, charId)
  return {
    __typename: "MutationCharacterSuccess",
    character: deletedCharacter
  };
}
// ------------------------------ x ------------------------------
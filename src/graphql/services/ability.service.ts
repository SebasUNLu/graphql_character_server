import { PrismaClient } from "@prisma/client";
import { NewInputAbility, UpdateInputAbility } from "types";
import { getCharacterQuery } from "../utils/queries/character";
import { createAbilityQuery, deleteAbilityQuery, getAbilityQuery, updateAbilityQuery } from "../utils/queries/ability";
import { ThrowClientError } from "../../utils/errors/ClientError";

const prisma = new PrismaClient();

// ------------------------------ Delete Character ------------------------------ 
export const getAbility = async (user_id: number, character_id: number, ability_id: number) => {
  const foundCharacter = await getCharacterQuery(user_id, character_id)
  if (!foundCharacter)
    throw ThrowClientError("Character not found", "CharacterNotFoundError")
  const foundAbility = await getAbilityQuery(character_id, ability_id)
  if (!foundAbility)
    throw ThrowClientError("Ability not found", "AbilityNotFoundError")
  return {
    __typename: "GetAbilitySuccess",
    abilitiy: foundAbility
  };
}
// ------------------------------ x ------------------------------

// ------------------------------ Get Character Abilities ------------------------------
export const getAbilities = async (user_id: number, character_id: number) => {
  const foundCharacter = await getCharacterQuery(user_id, character_id)
  if (!foundCharacter)
    throw ThrowClientError("Character not found", "CharacterNotFoundError")
  return {
    __typename: "GetCharacterAbilitiesSuccess",
    abilities: foundCharacter.abilities
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Add ABility ------------------------------
export const addAbility = async (user_id: number, newAbilityInfo: NewInputAbility) => {
  const { character_id, name, description, type } = newAbilityInfo;
  if (name.length < 0)
    throw ThrowClientError("Ability name must be at least 3 character long", "InvalidAbilityNameError")
  const foundCharacter = await getCharacterQuery(user_id, character_id)
  if (!foundCharacter)
    throw ThrowClientError("Character not found", "CharacterNotFoundError")
  const newAbility = await createAbilityQuery(newAbilityInfo)
  return {
    __typename: "MutationAbilitySuccess",
    ability: newAbility
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Update Ability ------------------------------
export const updateAbility = async (user_id: number, updateAbilityInfo: UpdateInputAbility) => {
  const { ability_id, character_id, name, description, type } = updateAbilityInfo;
  if (name && name.length < 0)
    throw ThrowClientError("Ability name must be at least 3 character long", "InvalidAbilityNameError")
  const foundCharacter = await getCharacterQuery(user_id, character_id)
  if (!foundCharacter)
    throw ThrowClientError("Character not found", "CharacterNotFoundError")
  const updatedAbility = await updateAbilityQuery(user_id, updateAbilityInfo)
  if (!updatedAbility)
    throw ThrowClientError("Ability not found", "AbilityNotFoundError")
  return {
    __typename: "MutationAbilitySuccess",
    ability: updatedAbility
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Delete Ability ------------------------------
export const deleteAbility = async (user_id: number, character_id: number, ability_id: number) => {
  const deletedAbility = await deleteAbilityQuery(user_id, character_id, ability_id)
  return deletedAbility
}
// ------------------------------ x ------------------------------

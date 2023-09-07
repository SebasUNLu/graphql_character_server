import { PrismaClient } from "@prisma/client";
import { NewInputAbility, UpdateInputAbility } from "types";
import { getCharacterQuery } from "../utils/queries/character";
import { createAbilityQuery, deleteAbilityQuery, getAbilityQuery, updateAbilityQuery } from "../utils/queries/ability";
const prisma = new PrismaClient();

// ------------------------------ Delete Character ------------------------------ 
export const getAbility = async (user_id: number, character_id: number, ability_id: number) => {
  try {
    const foundCharacter = await getCharacterQuery(user_id, character_id)
    if (!foundCharacter) {
      return {
        __typename: "CharacterNotFoundError",
        message: `No se encontró al personaje con ID ${character_id}`
      }
    }
    const foundAbility = await getAbilityQuery(character_id, ability_id)
    if (!foundAbility) {
      return {
        __typename: "AbilityNotFoundError",
        message: `No se encontró la habilidad con ID ${ability_id}`
      }
    }
    return foundAbility;
  } catch (error) {
    console.log(error);
    return {
      __typename: "DefaultError",
      message: "Hubo un error."
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Get CHarcter Abilities ------------------------------
export const getAbilities = async (user_id: number, character_id: number) => {
  try {
    const foundCharacter = await getCharacterQuery(user_id, character_id)
    if (!foundCharacter) {
      return {
        __typename: "CharacterNotFoundError",
        message: `No se ha encontrado al personaje con ID ${character_id}`
      }
    }
    return {
      __typename: "GetCharacterAbilitiesSuccess",
      abilities: foundCharacter.abilities
    }

  } catch (error) {
    console.log(error);
    return {
      __typename: "DefaultError",
      message: "Hubo un error."
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Add ABility ------------------------------
export const addAbility = async (user_id: number, newAbilityInfo: NewInputAbility) => {
  try {
    const { character_id, name, description, type } = newAbilityInfo;
    if (name.length < 0)
      return {
        __typename: "InvalidAbilityNameError",
        message: `El nombre de la habilidad debe tener almenos 3 caracteres.`
      }
    const foundCharacter = await getCharacterQuery(user_id, character_id)
    if (!foundCharacter)
      return {
        __typename: "CharacterNotFoundError",
        message: `No se ha encontrado al personaje de ID ${character_id}`
      }

    const newAbility = await createAbilityQuery(newAbilityInfo)
    return {
      __typename: "MutationAbilitySuccess",
      ability: newAbility
    }
  } catch (error) {
    console.log(error);
    return {
      __typename: "DefaultError",
      message: "Hubo un error."
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Update Ability ------------------------------
export const updateAbility = async (user_id: number, updateAbilityInfo: UpdateInputAbility) => {
  try {
    const { ability_id, character_id, name, description, type } = updateAbilityInfo;
    if (name && name.length < 0)
      return {
        __typename: "InvalidAbilityNameError",
        message: `El nombre de la habilidad debe tener almenos 3 caracteres.`
      }
    const foundCharacter = await getCharacterQuery(user_id, character_id)
    if (!foundCharacter)
      return {
        __typename: "CharacterNotFoundError",
        message: `No se ha encontrado al personaje de ID ${character_id}`
      }

    const updatedAbility = await updateAbilityQuery(user_id, updateAbilityInfo)
    if (!updatedAbility)
      return {
        __typename: "AbilityNotFoundError",
        message: `No se encontró la habilidad con el ID ${ability_id}`
      }

    return {
      __typename: "MutationAbilitySuccess",
      ability: updatedAbility
    }

  } catch (error) {
    console.log(error);
    return {
      __typename: "DefaultError",
      message: "Hubo un error."
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Delete Ability ------------------------------
export const deleteAbility = async (user_id: number, character_id: number, ability_id: number) => {
  try {
    // Buscar personaje
    const deletedAbility = await deleteAbilityQuery(user_id, character_id, ability_id)
    // preguntar por habilidad borrada
    return deletedAbility
  } catch (error) {
    console.log(error);
    return {
      __typename: "DefaultError",
      message: "Hubo un error."
    }
  }
}
// ------------------------------ x ------------------------------

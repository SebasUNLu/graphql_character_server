import { PrismaClient } from "@prisma/client";
import { NewInputAbility, UpdateInputAbility } from "types";
const prisma = new PrismaClient();

// ------------------------------ Delete Character ------------------------------ 
export const getAbility = async (user_id: number, character_id: number, ability_id: number) => {
  try {
    const foundCharacter = await prisma.character.findUnique({
      where: {
        id: character_id,
        user_id
      },
      include: {
        abilities: true
      }
    });
    if (!foundCharacter) {
      return {
        __typename: "CharacterNotFoundError",
        message: `No se encontró al personaje con ID ${character_id}`
      }
    }

    const foundAbility = await prisma.ability.findUnique({
      where: {
        id: ability_id,
        character_id
      }
    })

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
    const foundCharacter = await prisma.character.findUnique({
      where: {
        id: character_id,
        user_id
      },
      include: {
        abilities: true
      }
    })
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
    const foundCharacter = await prisma.character.findUnique({
      where: {
        user_id,
        id: character_id
      },
    })
    if (!foundCharacter)
      return {
        __typename: "CharacterNotFoundError",
        message: `No se ha encontrado al personaje de ID ${character_id}`
      }

    const newAbility = prisma.ability.create({
      data: {
        character_id,
        name,
        description,
        type
      }
    })
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

export const updateAbility = async (user_id: number, updateAbilityInfo: UpdateInputAbility) => {
  const { ability_id, character_id, name, description, type } = updateAbilityInfo;

  const updatedAbility = await prisma.ability.update({
    where: {
      id: ability_id,
      character_id,
      character: {
        id: character_id,
        user_id
      }
    },
    data: {
      name,
      description,
      type
    }
  })

  return updatedAbility
}

export const deleteAbility = async (user_id: number, character_id: number, ability_id: number) => {
  const deletedAbility = await prisma.ability.delete({
    where: {
      id: ability_id,
      character_id,
      character: {
        id: character_id,
        user_id
      }
    }
  })

  return deletedAbility
}
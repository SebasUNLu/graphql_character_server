import { PrismaClient } from "@prisma/client";
import { NewInputAbility, UpdateInputAbility } from "types";
const prisma = new PrismaClient();

export const getAbility = async (user_id: number, character_id: number, ability_id: number) => {
  const foundCharacter = await prisma.character.findUnique({
    where: {
      id: character_id,
      user_id
    },
    include: {
      abilities: true
    }
  });
  if (!foundCharacter)
    throw new Error("Character not found")

  const foundAbility = await prisma.ability.findUnique({
    where: {
      id: ability_id,
      character_id
    }
  })

  if (!foundAbility)
    throw new Error("Ability not found")

  return foundAbility;
}

export const getAbilities = async (user_id: number, character_id: number) => {
  const foundCharacter = await prisma.character.findUnique({
    where: {
      id: character_id,
      user_id
    },
    include: {
      abilities: true
    }
  })
  if (!foundCharacter)
    throw new Error("Character not found")
  return foundCharacter.abilities
}

export const addAbility = async (user_id: number, newAbilityInfo: NewInputAbility) => {
  const { character_id, name, description, type } = newAbilityInfo;

  const foundCharacter = await prisma.character.findUnique({
    where: {
      user_id,
      id: character_id
    },
    include: {
      abilities: true
    }
  })
  if (!foundCharacter)
    throw new Error("Character not found")

  const newAbility = prisma.ability.create({
    data: {
      character_id,
      name,
      description,
      type
    }
  })

  return newAbility
}

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
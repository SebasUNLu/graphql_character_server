import { PrismaClient } from "@prisma/client";
import { NewInputAbility, UpdateInputAbility } from "types";

const prisma = new PrismaClient();

export const getAbilityQuery = async (character_id: number, ability_id: number) => {
  return await prisma.ability.findUnique({
    where: {
      id: ability_id,
      character_id
    }
  })
}

export const createAbilityQuery = async (newAbilityInfo: NewInputAbility) => {
  const { character_id, name, description, type } = newAbilityInfo
  return await prisma.ability.create({
    data: {
      name, description, type,
      character: { connect: { id: character_id } }
    }
  })
}

export const updateAbilityQuery = async (user_id: number, updateAbilityInfo: UpdateInputAbility) => {
  const { ability_id, character_id, description, name, type } = updateAbilityInfo
  return await prisma.ability.update({
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
}

export const deleteAbilityQuery = async (user_id: number, character_id: number, ability_id: number) => {
  return await prisma.ability.delete({
    where: {
      id: ability_id,
      character_id,
      character: {
        id: character_id,
        user_id
      }
    }
  })
}
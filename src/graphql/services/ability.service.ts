import { PrismaClient } from "@prisma/client";
import { NewInputAbility } from "types";
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

  console.log("-------");
  console.log("CHaracter: ", foundCharacter);
  console.log("Abilities: ", foundCharacter.abilities);
  console.log("-------");

  const foundAbility = await prisma.ability.findUnique({
    where: {
      id: ability_id,
      character_id
    }
  })

  console.log("Ability: ", foundAbility);
  console.log("-------");

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
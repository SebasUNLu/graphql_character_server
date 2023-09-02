import { GraphqlContext } from "../../types/contextType";
import { checkIfUser } from "../utils/cheIfUser";
import { getAbilities, getAbility } from "../services/ability.service";
import { NewInputAbility, UpdateInputAbility } from "types";

export const abilityResolver = {
  Query: {
    ability: async (_: any, {
      ability_id,
      character_id
    }: { character_id: number, ability_id: number }, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await getAbility(validatedId, character_id, ability_id)
    },
    abilities: async (_: any, {
      character_id
    }: { character_id: number }, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await getAbilities(validatedId, character_id)
    }
  },
  Mutation: {
    addAbility: async (_: any, { }: NewInputAbility, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)

    },
    updateAbility: async (_: any, { }: UpdateInputAbility, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)

    },
    deleteAbility: async (_: any, { 
      
    }: { character_id: number, ability_id: number }, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)

    },
  }
}
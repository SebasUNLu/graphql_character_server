import { GraphqlContext } from "../../types/contextType";
import { checkIfUser } from "../utils/cheIfUser";
import { addAbility, deleteAbility, getAbilities, getAbility, updateAbility } from "../services/ability.service";
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
    addAbility: async (_: any, args: NewInputAbility, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await addAbility(validatedId, args)
    },
    updateAbility: async (_: any, args: UpdateInputAbility, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await updateAbility(validatedId, args)
    },
    deleteAbility: async (_: any, {
      ability_id,
      character_id
    }: { character_id: number, ability_id: number }, { userId }: GraphqlContext) => {
      const validatedId = await checkIfUser(userId)
      return await deleteAbility(validatedId, character_id, ability_id)
    },
  }
}
import { createUser } from "../services/user.service";

export const usersResolver = {
  Query: {
    user: () => 'Hola usuario',
    register: (_: any, args: Record<string, any>) => { },
    login: (_: any, args: Record<string, any>) => { }
  },
  Mutation: {
    createUser: async (_: any, args: Record<string, any>) => {
      return await createUser({ username: args.username, password: args.password })
    }
  }
}
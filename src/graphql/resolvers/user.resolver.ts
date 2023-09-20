import { createUser, loginUser } from "../services/user.service";

interface UserRegisterArgs {
  username: string,
  email: string,
  password: string
}

interface UserLoginArgs {
  email: string
  password: string
}

export const usersResolver = {
  Query: {
    loginUser: async (_: any, { email, password }: UserLoginArgs) => {
      return await loginUser({ email, password })
    }
  },
  Mutation: {
    createUser: async (_: any, { email, password, username }: UserRegisterArgs) => {
      return await createUser({ username, email, password })
    },
  }
}
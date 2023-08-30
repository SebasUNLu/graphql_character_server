import { createUser, loginUser } from "../services/user.service";
import { GraphqlContext } from "../../types/contextType";
import { AuthenticationError } from "apollo-server";

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
    user: (_: any, args: any, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      return 'hello, valid user!'
    },
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
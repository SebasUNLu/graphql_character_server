
import { createUser } from "../services/user.service";
import { GraphQLError } from 'graphql';
import { GraphqlContext } from "../utils/contextType";
import { AuthenticationError } from "apollo-server";

interface UserRegisterArgs {
  username: string,
  email: string,
  password: string
}

export const usersResolver = {
  Query: {
    user: (_: any, args: any, { userId }: GraphqlContext) => {
      if (!userId)
        throw new AuthenticationError('Invalid Token')
      return 'hello'
    },
    loginUser: (_: any, args: Record<string, any>) => {

    }
  },
  Mutation: {
    createUser: async(_: any, { email, password, username }: UserRegisterArgs) => {
      return createUser({ username, email, password })
    },
  }
}
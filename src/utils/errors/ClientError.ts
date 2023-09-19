import { GraphQLError } from "graphql";

export const ThrowClientError = (message: string, __typename: string = "Error") => {
  throw new GraphQLError(message, {
    extensions: {
      __typename
    }
  })
}
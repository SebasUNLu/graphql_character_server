import { GraphQLError } from "graphql";

export class ClientError extends GraphQLError {
  __typename: string;
  constructor(message: string, __typename: string = "Error") {
    super(message)
    this.__typename = __typename
  }
}
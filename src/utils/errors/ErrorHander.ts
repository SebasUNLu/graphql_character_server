export const ErrorHandler = (message: string, __typename: string = "Error") => {
  return {
    __typename,
    message
  };
}
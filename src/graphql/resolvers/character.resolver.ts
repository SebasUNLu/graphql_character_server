export const charactersResolver = {
  Query: {
    character: (_: any, args: Record<string, any>) => {
      return `Hola, ${args.name}!`
    },
  }
}
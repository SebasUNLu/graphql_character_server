import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./graphql";
import jwt from "jsonwebtoken";
import { GraphqlContext } from "./graphql/utils/contextType";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
  const server = new ApolloServer<GraphqlContext>({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  /**
   * Este middleware permite pasar un "contexto" a los resolvers.
   * En este caso, se está pasando un userId que se extrae del token jwt enviado.
   * Si no se encuentra el token o es inválido, se pasa userId = null, que luego se verifica en los resolvers. 
   */
  app.use(expressMiddleware(server, {
    context: async ({ req, res }) => {
      try {
        const secret = process.env.JWT_SECRET as string
        const token = req.headers.authorization
        if (!token)
          return { userId: null }
        const decoded = jwt.verify(
          token.slice(7),
          secret
        )
        console.log("userToken: ", decoded);

        return { userId: decoded }
      } catch (error) {
        console.log("No hubo token");
        return { userId: null }
      }
    }
  }))

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
    console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
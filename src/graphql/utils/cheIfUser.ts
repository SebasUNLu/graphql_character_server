import { AuthenticationError } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ClientError } from "../../utils/errors/ClientError";

const prisma = new PrismaClient();

export const checkIfUser = async (userId: number | null) => {
  if (!userId)
    throw new ClientError('Invalid Token', "InvalidToken")
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!foundUser)
    throw new ClientError('Invalid Token', "InvalidToken")
  return userId
}
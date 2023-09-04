import { AuthenticationError } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkIfUser = async (userId: number | null) => {
  if (!userId)
    throw new AuthenticationError('Invalid Token')
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!foundUser)
    throw new AuthenticationError('Invalid Token')
  return userId
}
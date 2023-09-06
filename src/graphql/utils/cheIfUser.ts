import { AuthenticationError } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkIfUser = async (userId: number | null) => {
  console.log(userId);
  if (!userId)
    throw new AuthenticationError('Invalid Token')
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  console.log(foundUser);
  if (!foundUser)
    throw new AuthenticationError('Invalid Token')
  return userId
}
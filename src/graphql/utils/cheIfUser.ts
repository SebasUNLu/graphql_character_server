import { PrismaClient } from "@prisma/client";
import { ThrowClientError } from "../../utils/errors/ClientError";

const prisma = new PrismaClient();

export const checkIfUser = async (userId: number | null) => {
  if (!userId)
    throw ThrowClientError('Invalid Token', "InvalidTokenError")
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!foundUser)
    throw ThrowClientError('Invalid Token', "InvalidTokenError")
  return userId
}
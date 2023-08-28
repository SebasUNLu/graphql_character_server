import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInput {
  username: string,
  password: string
}

export const createUser = async ({ password, username }: UserInput) => {
  const createdUser = await prisma.user.create({
    data: {
      username,
      passwordHash: password
    }
  })
  return createdUser
}
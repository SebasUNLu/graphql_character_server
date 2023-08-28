import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const saltRounds = 10
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET as string

interface UserInput {
  username: string,
  password: string,
  email: string
}

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' })
}

export const createUser = async ({ username, email, password }: UserInput) => {
  const passwordHash = await bcrypt.hash(password, saltRounds)
    .then(hash => {
      return hash
    })

  const createdUser = await prisma.user.create({
    data: {
      username,
      passwordHash,
      email
    }
  })

  const token = generateToken(createdUser.id)

  console.log("Usuario: ", createdUser);
  console.log("Token: ", token);

  return token
}

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

interface LoginUserInput {
  email: string,
  password: string
}

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' })
}

const hashPassword = async (password: string) => {
  const hashedPass = await bcrypt.hash(password, saltRounds)
    .then(hash => {
      return hash
    })
  return hashedPass
}

export const createUser = async ({ username, email, password }: UserInput) => {
  const passwordHash = await hashPassword(password)
  const createdUser = await prisma.user.create({
    data: {
      username,
      passwordHash,
      email
    }
  })
  const token = generateToken(createdUser.id)
  return token
}

export const loginUser = async ({ email, password }: LoginUserInput) => {
  const userFound = await prisma.user.findUnique({
    where: {
      email
    }

  })
  if (!userFound)
    throw new Error('Invalid user or password')

  const isPassValid = await bcrypt.compare(password, userFound.passwordHash)

  if (!isPassValid)
    throw new Error('Invalid user or password')

  const token = generateToken(userFound.id)
  return token
}
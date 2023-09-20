import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { ThrowClientError } from "../../utils/errors/ClientError";

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

interface UserSuccess {
  __typename: string,
  user: User,
  token: string
}

interface UserLoginError {
  __typename: string,
  message: string
}

interface UserRegisterInvalidInputError {
  __typename: string,
  message?: string,
  emailInvalidInput?: string
  passwordInvalidInput?: string
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

const validatePassword = (password: string): boolean => {
  if (password.length < 5)
    return false
  return true
}

const validateEmail = (email: string): boolean => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex))
    return false
  return true
}

// ------------------------------ Create Character ------------------------------
export const createUser = async ({ username, email, password }: UserInput): Promise<UserSuccess | UserRegisterInvalidInputError> => {
  try {
    if (!validateEmail(email))
      throw ThrowClientError('Email must be a valid email address', "InvalidEmailInputError")
    if (!validatePassword(password))
      throw ThrowClientError('Invalid password. Must be at least 5 characters long', "InvalidPasswordInputError")
    const passwordHash = await hashPassword(password)
    const createdUser = await prisma.user.create({
      data: {
        username,
        passwordHash,
        email
      }
    })
    const token = generateToken(createdUser.id)
    return {
      __typename: "UserSuccess",
      user: createdUser,
      token
    }
  } catch (error) {
    switch (true) {
      case (error instanceof Prisma.PrismaClientKnownRequestError): {
        throw ThrowClientError('An account with that mail already exists', "UniqueEmailconstraint")
      }
      default: {
        throw ThrowClientError('An error ocurred. Try again later')
      }
    }
  }
}
// ------------------------------ x ------------------------------

// ------------------------------ Login user ------------------------------
export const loginUser = async ({ email, password }: LoginUserInput): Promise<UserSuccess | UserLoginError> => {
  const userFound = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!userFound)
    throw ThrowClientError('Invalid user or password', "InvalidInputError")
  const isPassValid = await bcrypt.compare(password, userFound.passwordHash)
  if (!isPassValid)
    throw ThrowClientError('Invalid user or password', "InvalidInputError")
  const token = generateToken(userFound.id)
  return {
    __typename: "UserSuccess",
    user: userFound,
    token
  }
}
// ------------------------------ x ------------------------------

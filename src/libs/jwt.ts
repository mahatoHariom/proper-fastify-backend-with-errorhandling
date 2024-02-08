import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { env } from 'process'
// import { User } from "@/@types/user.type";

export function generateJsonWebToken({ id, name, email, role }: User) {
  return jwt.sign({ id, name, email, role }, env.JWT_SECRET as string, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES
  })
}
export function generateRefreshToken({ id, name, email, role }: User) {
  return jwt.sign({ id, name, role, email }, env.JWT_SECRET as string, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES
  })
}
const validateToken = (token: string) => {
  try {
    const userData = jwt.verify(token, env.JWT_SECRET as string)
    return userData
  } catch (e) {
    return null
  }
}

export const validateAccessToken = validateToken
// export const validateRefreshToken = validateToken;

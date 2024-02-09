/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { verify } from 'jsonwebtoken'
import { FastifyReply, FastifyRequest } from 'fastify'
// import { asyncErrorHandler } from 'http/middlewares/errorHandler'
import ApiError from 'config/ApiError'
import { User } from '@prisma/client'
import { env } from 'process'
import { prisma } from 'libs'
import { generateJsonWebToken } from '@/libs/jwt'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  const { cookies } = request
  const refreshToken = cookies?.refreshToken
  if (!refreshToken) {
    throw new ApiError('No refresh token', 401)
  }
  const userData = jwt.verify(refreshToken as string, env.JWT_SECRET as string) as User
  const user = await prisma.user.findFirst({
    where: {
      id: userData.id
    }
  })

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  verify(refreshToken, env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err || (user && user.id !== decoded.id)) {
      return reply.send({
        message: 'Something wrong with refreshToken'
      })
    }
    const accessToken = generateJsonWebToken(user)
    reply.send({ accessToken })
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { asyncErrorHandler } from 'http/middlewares/errorHandler'
import { makeGetUserProfileUseCase } from 'use-cases'
// import { asyncErrorHandler, errorHandler } from '@/config/errorHandler';

export const profile = asyncErrorHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileUseCase()

  const user = await getUserProfile.handle({
    userId: request.user.id
  })

  return reply.status(200).send({
    ...user,
    password: undefined
  })
})

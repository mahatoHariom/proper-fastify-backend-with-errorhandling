import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput } from 'schemas/auth-schemas'
import { makeRegisterUseCase } from 'use-cases'

export const register = async (request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) => {
  const { email, name, password } = request.body
  const registerUseCase = makeRegisterUseCase()
  const user = await registerUseCase.handle({ email, name, password })
  return reply.status(201).send(user)
}

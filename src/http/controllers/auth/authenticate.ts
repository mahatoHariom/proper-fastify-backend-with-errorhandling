import { FastifyReply, FastifyRequest } from 'fastify'
// import { asyncErrorHandler } from 'http/middlewares/errorHandler'
import { generateJsonWebToken, generateRefreshToken } from 'libs/jwt'
import { LoginUserInput } from 'schemas/auth-schemas'
import { makeAuthenticateUseCase } from 'use-cases'

export const authenticate = async (request: FastifyRequest<{ Body: LoginUserInput }>, reply: FastifyReply) => {
  const { email, password } = request.body

  const authenticateUseCase = makeAuthenticateUseCase()

  const { user } = await authenticateUseCase.handle({ email, password })

  const refreshToken = generateRefreshToken(user)

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({ accessToken: generateJsonWebToken(user) })
}

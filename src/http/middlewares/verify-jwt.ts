import ApiError from '@/config/ApiError'
import { validateAccessToken } from '@/libs/jwt'
import { User } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from 'libs'

// const setAuthenticateJWT = (server: FastifyInstance) => {
//   server.decorate('authenticate', async (req: FastifyRequest) => {
//     await req.jwtVerify()
//   })
// }
// export default setAuthenticateJWT

export async function isSeller(request: FastifyRequest, reply: FastifyReply) {
  const { id: authId } = request.user as { id: string }
  const authUser = await prisma.user.findUnique({
    where: {
      id: authId
    }
  })
  const role = authUser?.role
  if (role !== 'user') {
    return reply.send({
      message: `The role '${role}' is not authorized to this action`
    })
  }
}

const setAuthenticateJWT = (server: FastifyInstance) => {
  server.decorate('authenticate', async (req: FastifyRequest) => {
    const token = req.headers.authorization
    const accessToken = token?.split(' ')[1]
    if (!token) {
      throw new ApiError('Token not found', 401)
    }
    const decoded = validateAccessToken(accessToken as string)
    if (!decoded) {
      throw new ApiError('Invalid or token expired', 401)
    }
    req.user = decoded as User
  })
}

export default setAuthenticateJWT

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from 'libs'

const setAuthenticateJWT = (server: FastifyInstance) => {
  server.decorate('authenticate', async (req: FastifyRequest) => {
    await req.jwtVerify()
  })
}
export default setAuthenticateJWT

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

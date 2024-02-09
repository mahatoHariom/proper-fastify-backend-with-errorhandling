// import { User } from './user.type'
import { User } from '@prisma/client'
import { Redis } from 'ioredis'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: User
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
    redis: Redis
  }
  export interface FastifyInstance {
    authenticate: any
    readonly zod: FastifyZod<typeof models>
  }
}

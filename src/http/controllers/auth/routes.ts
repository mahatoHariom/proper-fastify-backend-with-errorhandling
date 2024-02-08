import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
// import { profile } from './profile';
import { refresh } from './refresh'
import { register } from './register'
import { profile } from './profile'
import { $ref } from 'schemas/auth-schemas'

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema')
        }
      }
    },
    register
  )
  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema')
        }
      }
    },

    authenticate
  )

  app.get('/auth/token/refresh', { onRequest: [app.authenticate] }, refresh)

  app.get('/auth/me', { onRequest: [app.authenticate] }, profile)
}

import fastify, { FastifyInstance } from 'fastify'
import loggerConfig from './config/logger'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie'
import cors from '@fastify/cors'
import fhelmet from '@fastify/helmet'
import { env } from './env'
import fSwaggerUi from '@fastify/swagger-ui'
import fSwagger from '@fastify/swagger'
import { swaggerOptions, swaggerUiOptions } from './config/swagger'
import fRateLimit from '@fastify/rate-limit'
import { userSchemas } from './schemas/auth-schemas'
import { productSchemas } from './schemas/product-schema'
import { errorHandler } from './http/middlewares/errorHandler'
import setAuthenticateJWT from './http/middlewares/verify-jwt'
import { authRoutes } from './http/controllers'
import { Redis } from './config/redis'

const createApp = async () => {
  const app: FastifyInstance = fastify({ logger: loggerConfig })

  app.addHook('onError', (request, reply, error, done) => {
    done()
  })

  // CORS
  app.register(cors, {
    credentials: true,
    origin: [env.CLIENT_ENDPOINT]
  })

  // Helmet
  app.register(fhelmet, { contentSecurityPolicy: false })

  await Redis.initialize()
  // Swagger
  app.register(fSwagger, swaggerOptions)
  app.register(fSwaggerUi, swaggerUiOptions)

  // Rate limit
  app.register(fRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  })
  // Cookies
  app.register(fastifyCookie, {
    secret: env.JWT_SECRET,
    hook: 'preHandler',
    parseOptions: {}
  } as FastifyCookieOptions)

  // register jwt
  app.register(fastifyJwt, { secret: env.JWT_SECRET })

  // adding the schema
  for (const schema of [...userSchemas, ...productSchemas]) {
    app.addSchema(schema)
  }

  // app.register(require("@fastify/redis"), { redisClient, closeClient: true });

  // await Redis.initialize()

  app.addHook('preHandler', (req, res, next) => {
    req.jwt = app.jwt
    return next()
  })

  // setting the decorator to the on request method
  setAuthenticateJWT(app)
  app.setErrorHandler(errorHandler)
  // added the prefix to the routes
  app.register(authRoutes, { prefix: '/api/v1/auth' })
  // app.register(productsRoutes, { prefix: '/api/v1/product' });
  return app
}

export default createApp

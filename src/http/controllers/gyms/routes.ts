import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
}

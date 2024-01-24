import { FastifyInstance } from 'fastify';

import { authenticate, profile, register } from './controllers';
import { verifyJwt } from './middlewares';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}

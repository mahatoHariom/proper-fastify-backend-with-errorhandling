import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares';

import { createGym } from './create-gym';
import { fetchNearbyGyms } from './fetch-nearby-gyms';
import { searchGyms } from './search-gyms';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', searchGyms);
  app.get('/gyms/nearby', fetchNearbyGyms);

  app.post('/gyms', createGym);
}

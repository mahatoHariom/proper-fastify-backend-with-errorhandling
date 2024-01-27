import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchNearbyGymsUseCase } from '@/use-cases';

export async function fetchNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = fetchNearbyGymsQuerySchema.parse(
    request.body,
  );

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}

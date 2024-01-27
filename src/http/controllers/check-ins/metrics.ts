import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserMetricsUseCase } from '@/use-cases';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.handle({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}

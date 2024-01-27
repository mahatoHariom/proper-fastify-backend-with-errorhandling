import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const user = await getUserProfile.handle({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    ...user,
    password: undefined,
  });
}

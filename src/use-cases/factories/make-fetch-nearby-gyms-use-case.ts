import { PrismaGymsRepository } from '@/repositories';

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}

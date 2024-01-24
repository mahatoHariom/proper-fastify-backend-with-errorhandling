import { PrismaGymsRepository } from '@/repositories';

import { SearchGymsUseCase } from '../search-gyms';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}

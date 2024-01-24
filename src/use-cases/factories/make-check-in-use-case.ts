import { PrismaCheckInsRepository, PrismaGymsRepository } from '@/repositories';

import { CheckInUseCase } from '../check-in';

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}

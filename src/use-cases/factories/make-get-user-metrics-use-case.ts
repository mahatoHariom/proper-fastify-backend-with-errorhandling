import { PrismaCheckInsRepository } from '@/repositories';

import { GetUserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();

  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}

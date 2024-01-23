import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories';

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    request: FetchUserCheckInsHistoryUseCaseRequest,
  ): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const { page, userId } = request;

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}

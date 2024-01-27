import { CheckInsRepository } from '@/repositories';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    request: GetUserMetricsUseCaseRequest,
  ): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = request;

    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}

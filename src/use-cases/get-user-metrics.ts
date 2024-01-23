import { CheckInsRepository } from '@/repositories';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checksInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    request: GetUserMetricsUseCaseRequest,
  ): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = request;

    const checksInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checksInsCount };
  }
}

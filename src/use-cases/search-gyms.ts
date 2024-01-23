import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories';

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(
    request: SearchGymsUseCaseRequest,
  ): Promise<SearchGymsUseCaseResponse> {
    const { page, query } = request;

    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}

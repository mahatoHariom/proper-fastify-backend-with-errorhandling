import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories';

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async handle(
    request: FetchNearbyGymsUseCaseRequest,
  ): Promise<FetchNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = request;

    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}

import { CheckInsRepository, GymsRepository } from '@/repositories';
import { getDistanceBetweenCoordinates } from '@/utils';

import { ResourceNotFoundError } from './errors';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async handle(request: CheckInUseCaseRequest) {
    const { gymId, userId, userLatitude, userLongitude } = request;

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new Error();

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) throw new Error();

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}

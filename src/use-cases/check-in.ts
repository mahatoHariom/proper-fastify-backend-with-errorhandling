import { CheckInsRepository } from '@/repositories';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(request: CheckInUseCaseRequest) {
    const { gymId, userId } = request;

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

import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories';
import { ResourceNotFoundError } from '@/use-cases';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle(
    request: ValidateCheckInUseCaseRequest,
  ): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = request;

    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

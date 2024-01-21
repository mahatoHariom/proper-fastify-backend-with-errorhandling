import { UsersRepository } from '@/repositories';

import { ResourceNotFoundError } from './errors';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async handle(request: GetUserProfileUseCaseRequest) {
    const { userId } = request;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}

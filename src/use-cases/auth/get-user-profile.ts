// import { ResourceNotFoundError } from './errors';

import ApiError from 'config/ApiError'
import { authRepository } from 'repositories/auth-repository'

interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private authRepository: authRepository) {}

  async handle(request: GetUserProfileUseCaseRequest) {
    const { userId } = request

    const user = await this.authRepository.findById(userId)

    if (!user) throw new ApiError('user not found', 400)

    return { user }
  }
}

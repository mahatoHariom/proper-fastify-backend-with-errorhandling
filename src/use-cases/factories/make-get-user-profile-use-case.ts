// import { PrismaAuthRepository } from '@/repositories'
import { PrismaAuthRepository } from 'repositories'
import { GetUserProfileUseCase } from '../auth/get-user-profile'

export function makeGetUserProfileUseCase() {
  const authRepository = new PrismaAuthRepository()

  const useCase = new GetUserProfileUseCase(authRepository)

  return useCase
}

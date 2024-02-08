// import { PrismaAuthRepository } from '@/repositories'
import { PrismaAuthRepository } from 'repositories'
import { AuthenticateUseCase } from '../auth/authenticate'

export function makeAuthenticateUseCase() {
  const authRepository = new PrismaAuthRepository()

  const useCase = new AuthenticateUseCase(authRepository)

  return useCase
}

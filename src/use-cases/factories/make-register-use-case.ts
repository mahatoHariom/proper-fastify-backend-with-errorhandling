// import { PrismaAuthRepository } from '@'

// import { PrismaAuthRepository } from '@/repositories'
import { PrismaAuthRepository } from 'repositories'
import { RegisterUseCase } from '../auth/register'

export function makeRegisterUseCase() {
  const authRepository = new PrismaAuthRepository()

  const useCase = new RegisterUseCase(authRepository)

  return useCase
}

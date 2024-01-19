import { PrismaUsersRepository } from '@/repositories';

import { AuthenticateUseCase } from '..';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

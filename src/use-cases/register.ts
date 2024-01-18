import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle(
    request: RegisterUseCaseProps,
  ): Promise<RegisterUseCaseResponse> {
    const { email, name, password } = request;

    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });

    return { user };
  }
}

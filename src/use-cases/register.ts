import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle(request: RegisterUseCaseProps) {
    const { email, name, password } = request;

    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });
  }
}

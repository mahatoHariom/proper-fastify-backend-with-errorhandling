import { compare } from 'bcryptjs';

import { UsersRepository } from '@/repositories';

import { InvalidCredentialsError } from './errors';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async handle(request: AuthenticateUseCaseRequest) {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { user };
  }
}

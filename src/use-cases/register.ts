import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';

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

    if (userWithSameEmail) throw new Error('E-mail already exists.');

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });
  }
}

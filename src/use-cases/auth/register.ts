import { hash } from 'bcryptjs'
import ApiError from 'config/ApiError'
import { authRepository } from 'repositories/auth-repository'
import { CreateUserInput, CreateUserResponse } from 'schemas/auth-schemas'
// import { UsersRepository } from '@/repositories';

export class RegisterUseCase {
  constructor(private authRepository: authRepository) {}
  async handle(request: CreateUserInput): Promise<CreateUserResponse> {
    const { email, name, password } = request

    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.authRepository.findByEmail(email)

    if (userWithSameEmail) throw new ApiError('user with same email already exists', 403)

    const user = await this.authRepository.create({
      email,
      name,
      password: passwordHash,
      role: 'user'
    })

    return user
  }
}

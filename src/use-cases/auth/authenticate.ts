import { compare } from 'bcryptjs'
import ApiError from 'config/ApiError'
import { authRepository } from 'repositories/auth-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private authRepository: authRepository) {}

  async handle(request: AuthenticateUseCaseRequest) {
    const { email, password } = request

    const user = await this.authRepository.findByEmail(email)

    if (!user) {
      throw new ApiError('User with email does not exist', 401)
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new ApiError('Password does not match', 409)
    }

    return { user }
  }
}

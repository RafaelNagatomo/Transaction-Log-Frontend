import User from '~/domain/entities/User'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

export default class LoginUserUseCase {
  constructor(private authRepositoryImpl: AuthRepositoryImpl) {}

  async execute(
    email: string,
    password: string
  ): Promise<{
    user: User
    token: string
  }> {
    return this.authRepositoryImpl.login(email, password)
  }
}

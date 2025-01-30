import User from '~/domain/entities/User'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

export default class RegisterUserUseCase {
  constructor(private authRepositoryImpl: AuthRepositoryImpl) {}

  async execute(
    name: string,
    email: string, 
    password: string
  ): Promise<User> {
    return this.authRepositoryImpl.register(
      name,
      email,
      password
    )
  }
}

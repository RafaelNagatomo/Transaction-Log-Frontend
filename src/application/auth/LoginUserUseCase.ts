import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

export default class LoginUserUseCase {
  constructor(private authRepositoryImpl: AuthRepositoryImpl) {}

  async execute(email: string, password: string): Promise<string> {
    return this.authRepositoryImpl.login(email, password)
  }
}

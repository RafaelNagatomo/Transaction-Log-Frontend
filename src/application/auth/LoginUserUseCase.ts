import User from "~/domain/entities/User"
import AuthRepositoryImpl from "~/infrastructure/repositories/AuthRepositoryImpl"

export default class LoginUseCase {
  constructor(private authRepositoryImpl: AuthRepositoryImpl) {}

  async execute(email: string, password: string): Promise<User> {
    return this.authRepositoryImpl.login(email, password)
  }
}

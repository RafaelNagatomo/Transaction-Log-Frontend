import User from "~/domain/entities/User"
import AuthRepository from "~/domain/repositories/IAuthRepository"

export default class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    return this.authRepository.register(name, email, password)
  }
}

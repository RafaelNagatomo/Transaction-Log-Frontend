import AuthRepository from '~/domain/repositories/IAuthRepository'

export default class LogoutUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout()
  }
}

import AuthRepositoryImpl from "~/infrastructure/repositories/AuthRepositoryImpl"
import LoginUseCase from "../auth/LoginUserUseCase"
import LogoutUseCase from "../auth/LogoutUseCase"
import RegisterUseCase from "../auth/RegisterUseCase"

export default class AuthService {
  private loginUseCase: LoginUseCase
  private registerUseCase: RegisterUseCase
  private logoutUseCase: LogoutUseCase

  constructor() {
    const authRepository = new AuthRepositoryImpl()
    this.loginUseCase = new LoginUseCase(authRepository)
    this.registerUseCase = new RegisterUseCase(authRepository)
    this.logoutUseCase = new LogoutUseCase(authRepository)
  }

  async login(email: string, password: string) {
    return this.loginUseCase.execute(email, password)
  }

  async register(name: string, email: string, password: string) {
    return this.registerUseCase.execute(name, email, password)
  }

  async logout() {
    return this.logoutUseCase.execute()
  }
}

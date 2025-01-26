import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'
import LoginUseCase from '../auth/LoginUserUseCase'
import LogoutUseCase from '../auth/LogoutUserUseCase'
import RegisterUseCase from '../auth/RegisterUserUseCase'

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
    const token = await this.loginUseCase.execute(email, password)
    if(token) localStorage.setItem('authToken', token)
    return token
  }

  async register(name: string, email: string, password: string) {
    return this.registerUseCase.execute(name, email, password)
  }

  async logout() {
    localStorage.removeItem('authToken')
    return this.logoutUseCase.execute()
  }
}

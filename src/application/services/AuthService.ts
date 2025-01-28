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
    const data = await this.loginUseCase.execute(email, password)

    if(data) {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('authToken', data.token)
    }
    return data
  }

  async register(name: string, email: string, password: string) {
    return this.registerUseCase.execute(name, email, password)
  }

  async logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    return this.logoutUseCase.execute()
  }
}

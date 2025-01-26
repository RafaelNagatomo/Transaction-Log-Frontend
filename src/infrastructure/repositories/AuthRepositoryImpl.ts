import IAuthRepository from '~/domain/repositories/IAuthRepository'
import User from '~/domain/entities/User'
import api from '../http/axios/AxiosHttpClient'


export default class AuthRepositoryImpl implements IAuthRepository {
  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    })
    const user = response.data

    return new User(
      user._id,
      user.name,
      user.email
    )
  }

  async login(email: string, password: string): Promise<string> {
    const response = await api.post('/auth/login', {
      email,
      password,
    })
    const token = response.data.token

    return token
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout', {})
  }
}

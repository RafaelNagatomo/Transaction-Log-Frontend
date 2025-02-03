import IAuthRepository from '~/domain/repositories/IAuthRepository'
import User from '~/domain/entities/User'
import api from '../http/axios/AxiosHttpClient'


export default class AuthRepositoryImpl implements IAuthRepository {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await api.post('/api/auth/register', {
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

  async login(
    email: string,
    password: string
  ): Promise<{
    user: User
    token: string
  }> {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    },
  )
    const token = response.data.token
    const user = response.data.user

    return { user, token }
  }

  async logout(): Promise<void> {
    await api.post('/api/auth/logout', {})
  }
}

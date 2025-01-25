import IAuthRepository from "~/domain/repositories/IAuthRepository"
import User from "~/domain/entities/User"
import api from "../http/axios/AxiosHttpClient"


export default class AuthRepositoryImpl implements IAuthRepository {
  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    })

    return new User(
      response.data.user.id,
      response.data.user.name,
      response.data.user.email,
      response.data.token
    )
  }

  async login(email: string, password: string): Promise<User> {
    console.log("email", email)
    console.log("password", password)
    const response = await api.post("/auth/login", {
      email,
      password,
    })

    return new User(
      response.data.user.id,
      response.data.user.name,
      response.data.user.email,
      response.data.token
    )
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout", {})
  }
}

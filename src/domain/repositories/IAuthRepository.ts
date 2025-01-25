import User from "../entities/User"

export default interface IAuthRepository {
  register(name: string, email: string, password: string): Promise<User>
  login(email: string, password: string): Promise<User>
  logout(): Promise<void>
}

import User from "../entities/User"

export default interface IUserRepository {
  findAllUsers(filters?: string): Promise<User[]>
}

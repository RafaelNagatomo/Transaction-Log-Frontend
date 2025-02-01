import User from "~/domain/entities/User"
import UserRepositoryImpl from "~/infrastructure/repositories/UserRepositoryImpl"

export default class FindAllActivityLogsUseCase {
  constructor(private userRepositoryImpl: UserRepositoryImpl) {}

  async execute(filters?: string | undefined): Promise<User[]> {
    return this.userRepositoryImpl.findAllUsers(filters)
  }
}

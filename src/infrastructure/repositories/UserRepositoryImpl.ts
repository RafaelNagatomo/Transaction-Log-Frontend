import User from "~/domain/entities/User"
import api from "../http/axios/AxiosHttpClient"
import IUserRepository from "~/domain/repositories/IUserRepository"

export default class UserRepositoryImpl implements IUserRepository {
  async findAllUsers(queryParams?: string): Promise<User[]> {
    const allActivityLogs = await api.get(`/users?${queryParams}`, {})
    
    return allActivityLogs.data
  }
}

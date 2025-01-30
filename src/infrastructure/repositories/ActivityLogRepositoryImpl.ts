import api from "../http/axios/AxiosHttpClient"
import ActivityLog from "~/domain/entities/ActivityLog"
import IActivityLogRepository from "~/domain/repositories/IActivityLogRepository"

export default class ActivityLogRepositoryImpl implements IActivityLogRepository {
  async findAllLogs(): Promise<ActivityLog[]> {
    const allActivityLogs = await api.get('/activitylogs', {})
    
    return allActivityLogs.data
  }
}

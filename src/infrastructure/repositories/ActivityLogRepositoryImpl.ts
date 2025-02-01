import api from "../http/axios/AxiosHttpClient"
import ActivityLog from "~/domain/entities/ActivityLog"
import IActivityLogRepository from "~/domain/repositories/IActivityLogRepository"

export default class ActivityLogRepositoryImpl implements IActivityLogRepository {
  async findAllLogs(queryParams?: string): Promise<ActivityLog[]> {
    const allActivityLogs = await api.get(`/activitylogs?${queryParams}`, {})
    
    return allActivityLogs.data
  }
}

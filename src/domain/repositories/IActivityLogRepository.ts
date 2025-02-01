import ActivityLog from "../entities/ActivityLog"

export default interface IActivityLogRepository {
  findAllLogs(filters?: string): Promise<ActivityLog[]>
}

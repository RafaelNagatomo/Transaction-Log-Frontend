import ActivityLog from "../entities/ActivityLog"

export default interface IActivityLogRepository {
  findAllLogs(): Promise<ActivityLog[]>
}

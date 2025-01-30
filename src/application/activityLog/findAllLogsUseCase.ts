import ActivityLog from "~/domain/entities/ActivityLog"
import ActivityLogRepositoryImpl from "~/infrastructure/repositories/ActivityLogRepositoryImpl"

export default class FindAllActivityLogsUseCase {
  constructor(private activityLogRepositoryImpl: ActivityLogRepositoryImpl) {}

  async execute(): Promise<ActivityLog[]> {
    return this.activityLogRepositoryImpl.findAllLogs()
  }
}

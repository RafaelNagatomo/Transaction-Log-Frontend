import { create } from "zustand"
import FindAllActivityLogsUseCase from "~/application/activityLog/findAllLogsUseCase"
import ActivityLog from "~/domain/entities/ActivityLog"
import ActivityLogRepositoryImpl from "../repositories/ActivityLogRepositoryImpl"

interface ActivityLogState {
  activityLogs: ActivityLog[]
  getAll: () => Promise<void>
}

const activityLogRepositoryImpl = new ActivityLogRepositoryImpl()
const findAllActivityLogsUseCase = new FindAllActivityLogsUseCase(activityLogRepositoryImpl)

export const useActivityLogStore = create<ActivityLogState>((set) => ({
  activityLogs: [],

  getAll: async () => {
    const activityLogs = await findAllActivityLogsUseCase.execute()
    set({ activityLogs })
  }
}))

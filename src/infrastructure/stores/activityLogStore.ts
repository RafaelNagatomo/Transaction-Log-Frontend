import { create } from "zustand"
import FindAllActivityLogsUseCase from "~/application/activityLog/findAllLogsUseCase"
import ActivityLog from "~/domain/entities/ActivityLog"
import ActivityLogRepositoryImpl from "../repositories/ActivityLogRepositoryImpl"

interface ActivityLogState {
  activityLogs: ActivityLog[]
  isLoading: boolean
  getAll: () => Promise<void>
}

const activityLogRepositoryImpl = new ActivityLogRepositoryImpl()
const findAllActivityLogsUseCase = new FindAllActivityLogsUseCase(activityLogRepositoryImpl)

export const useActivityLogStore = create<ActivityLogState>((set, get) => ({
  activityLogs: [],
  isLoading: false,

  getAll: async () => {
    if (get().activityLogs.length > 0 || get().isLoading) return
    
    set({ isLoading: true })
    const activityLogs = await findAllActivityLogsUseCase.execute()
    set({ activityLogs, isLoading: false })
  }
}))

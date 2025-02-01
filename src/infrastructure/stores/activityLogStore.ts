/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"
import FindAllActivityLogsUseCase from "~/application/activityLog/findAllLogsUseCase"
import ActivityLog from "~/domain/entities/ActivityLog"
import ActivityLogRepositoryImpl from "../repositories/ActivityLogRepositoryImpl"

interface ActivityLogState {
  activityLogs: ActivityLog[]
  isLoading: boolean
  filters: { [key: string]: any }
  setFilters: (newFilters: { [key: string]: any }) => void
  getAll: () => Promise<void>
}

const activityLogRepositoryImpl = new ActivityLogRepositoryImpl()
const findAllActivityLogsUseCase = new FindAllActivityLogsUseCase(activityLogRepositoryImpl)

export const useActivityLogStore = create<ActivityLogState>((set, get) => ({
  activityLogs: [],
  isLoading: false,
  filters: {},

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  getAll: async () => {
    if (get().activityLogs.length > 0 || get().isLoading) return
    const { filters } = get()
    const params = new URLSearchParams()
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "action") {
        params.append(key, value.toString())
      }
    })
  
    if (filters.action && typeof filters.action === "object") {
      const selectedActions = Object.entries(filters?.action)
        .filter(([, isSelected]) => isSelected)
        .map(([action]) => action)
        
        if (selectedActions.length > 0) {
          params.append("action", selectedActions.join(","))
        }
      }
      
      set({ isLoading: true })
      const activityLogs = await findAllActivityLogsUseCase.execute(params.toString())
    set({ activityLogs, isLoading: false })
  },
}))

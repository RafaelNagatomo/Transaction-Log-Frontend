import { useEffect } from 'react'
import { Stack } from '@mui/material'
import { useActivityLogStore } from '~/infrastructure/stores/activityLogStore'
import ActivityLogTable from '~/presentation/components/activityLog/ActivityLogTable'

const ActivityLogPage = () => {
  const { activityLogs, getAll, isLoading } = useActivityLogStore()

  useEffect(() => {
    getAll()
  }, [getAll])

  return (
    <>
      <Stack>
        <ActivityLogTable
          activityLogs={activityLogs}
          loading={isLoading}
        />
      </Stack>
    </>
  )
}

export default ActivityLogPage

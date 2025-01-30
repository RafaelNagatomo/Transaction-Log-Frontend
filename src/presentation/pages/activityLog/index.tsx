import { useEffect } from 'react'
import { Stack } from '@mui/material'
import { useActivityLogStore } from '~/infrastructure/stores/activityLogStore'
import ActivityLogTable from '~/presentation/components/activityLog/ActivityLogTable'
import Loading from '~/presentation/components/shared/Loading'

const ActivityLogPage = () => {
  const { activityLogs, getAll, isLoading } = useActivityLogStore()

  useEffect(() => {
    getAll()
  }, [getAll])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Stack>
      <ActivityLogTable activityLogs={activityLogs} />
    </Stack>
  )
}

export default ActivityLogPage

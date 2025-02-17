import { useEffect, useState } from 'react'
import { Drawer, Stack } from '@mui/material'
import { initialFilters, useActivityLogStore } from '~/infrastructure/stores/activityLogStore'
import ActivityLogTable from '~/presentation/components/activityLog/ActivityLogTable'
import Loading from '~/presentation/components/shared/Loading'
import ActivityLogFilter from '~/presentation/components/activityLog/ActivityLogFilter'

const ActivityLogPage = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false)
  const { activityLogs, getAll, isLoading, setFilters } = useActivityLogStore()

  useEffect(() => {
    setFilters(initialFilters)
    getAll()
  }, [getAll, setFilters])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Stack>
      <ActivityLogTable
        activityLogs={activityLogs}
        onFilter={() => setOpenFilterDrawer(true)}
      />

      <Drawer
        anchor='right'
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
      >
        <ActivityLogFilter closeDrawer={() => setOpenFilterDrawer(false)} />
      </Drawer>
    </Stack>
  )
}

export default ActivityLogPage

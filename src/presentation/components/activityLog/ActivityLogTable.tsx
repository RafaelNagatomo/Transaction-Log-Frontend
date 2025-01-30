import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material'
import Loading from '../shared/Loading'
import TableHeaderToolbar from '../shared/TableHeaderToolbar'
import ActivityLog from '~/domain/entities/ActivityLog'
import createData from './createData'
import RowRender from './RowRender'

const columnsLabel: string[] = [
  'Changed At',
  'Changed By',
  'Event Type',
  'Action',
  'Client IP',
  'User Agent'
]

interface ActivityLogTableProps {
  activityLogs: ActivityLog[]
  loading: boolean
}

export default function ActivityLogTable({
  activityLogs,
  loading
}: ActivityLogTableProps) {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(15)

  if (loading) {
    return <Loading />
  }

  return (
    <TableContainer component={Paper}>
      <TableHeaderToolbar
        title="Activity Logs"
      />
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: '#F5F5F5' }}>
          <TableRow>
            <TableCell />
            {columnsLabel.map(label => (
              <TableCell>
                <Typography>
                  {label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {activityLogs?.map((log) => (
            <RowRender
              key={log._id}
              row={createData(
                log._id,
                log.changedAt,
                log.changedBy,
                log.eventType,
                log.action,
                log?.oldData,
                log.newData,
                log.clientIp,
                JSON.stringify(log.userAgent)
              )}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[15, 30, 50]}
        component="div"
        count={activityLogs?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value)
          setPage(0)
        }}
      />
    </TableContainer>
  )
}

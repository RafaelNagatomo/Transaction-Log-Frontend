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
  onFilter?: () => void
}

export default function ActivityLogTable({
  activityLogs,
  onFilter
}: ActivityLogTableProps) {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableHeaderToolbar
        title="Activity Logs"
        filterButton
        onFilter={onFilter}
      />

      <TableContainer sx={{ maxHeight: 580 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columnsLabel.map((label, i) => (
                <TableCell key={i}>
                  <Typography>
                    {label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {activityLogs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((log) => (
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
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
    </Paper>
  )
}

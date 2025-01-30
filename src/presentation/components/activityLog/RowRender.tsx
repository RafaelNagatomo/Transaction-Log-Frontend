import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { useState } from "react"
import { getUserAgentInfo } from "~/presentation/utils/getUserAgentInfo"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import createData from "./createData"
import User from "~/domain/entities/User"

export default function RowRender(props: { row: ReturnType<typeof createData> } ) {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow
        sx={{ 
          '& > *': { borderBottom: 'unset' },
          '&:hover': { backgroundColor: '#F5F5F5' }
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.changedAt?.toString() && (
            <>
              {(() => {
                const dateString = row.changedAt.toString()
                const [date, time] = dateString.split('T')
                const formattedTime = time?.split(':').slice(0, 2).join(':')
                
                return (
                  <p>{date} at {formattedTime}</p>
                )
              })()}
            </>
          )}
        </TableCell>
        <TableCell>
          {(['_id', 'name', 'email'] as (keyof User)[]).map(label => (
            <Box
              key={label}
              display={'flex'}
              flexDirection={'row'}
            >
              <Typography
                fontWeight={600}
                fontSize={14}
                sx={{ whiteSpace: 'pre' }}
              >
                {label as string}{': '}
              </Typography>
              {JSON.stringify(row?.changedBy?.[label])}
            </Box>
          ))}
        </TableCell>
        <TableCell>{row?.eventType}</TableCell>
        <TableCell>{row?.action}</TableCell>
        <TableCell>{row?.data.clientIp}</TableCell>
        <TableCell>{getUserAgentInfo(row?.data?.userAgent)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Typography variant="h6" marginTop={2} component="div">
                Data
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography>Old Data</Typography>
                    </TableCell>
                    <TableCell colSpan={6}>
                      <Typography>New Data</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row?.data && (
                    <TableRow key={row?._id}>
                      <TableCell component="th" scope="row" colSpan={6}>
                        <pre>
                          {JSON.stringify(row?.data.oldData, null, 4)}
                        </pre>
                      </TableCell>
                      <TableCell colSpan={6}>
                        <pre>
                          {JSON.stringify(row?.data.newData, null, 4)}
                        </pre>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

import { ReactNode, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Paper,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  Typography
} from '@mui/material'
import TableHeaderToolbar from '../shared/TableHeaderToolbar'
import Transaction from '~/domain/entities/Transaction'

interface Column {
  id: 'description' | 'amount' | 'type' | 'status' | 'action' | 'createdAt'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
  date?: (value: string) => ReactNode
}

const columns: readonly Column[] = [
  {
    id: 'createdAt',
    label: 'Created date',
    minWidth: 150,
    date: (value: string) => {
      const [date, time] = value.split('T')
      const formattedTime = time?.split(':').slice(0, 2).join(':')
      return (
        <p>{date} at {formattedTime}</p>
      )
    },
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 150
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 150
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 150,
    format: (value: number) => '$' + value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 150
  },
  {
    id: 'action',
    label: '',
    minWidth: 50
  }
]

interface TransactionTableProps {
  transactions: Transaction[]
  onAdd: () => void
  onEdit?: (transaction: Transaction) => void
  onDelete?: (id: string) => void
}

export default function TransactionTable({
  transactions,
  onAdd,
  onEdit,
  onDelete
}: TransactionTableProps) {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleEdit = (row: Transaction) => {
    if(row) {
      onEdit?.(row)
    }
  }

  const handleDelete = (row: Transaction) => {
    if(row._id) {
      onDelete?.(row._id)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableHeaderToolbar
        title="Transactions"
        addButton
        onAdd={onAdd}
      />

      <TableContainer sx={{ maxHeight: 580 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography color='text-bolder'>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item) => {
                return (
                  <TableRow hover tabIndex={-1} key={item._id}>
                    {columns.map((column) => {
                      const value = item[column.id as keyof Omit<Transaction, 'action'>]
                      return (
                        <TableCell key={`${item._id}-${column.id}`} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : column.date && typeof value === 'string'
                            ? column.date(value)
                            : typeof value === 'object' && value !== null
                            ? JSON.stringify(value)
                            : value}

                          {column.id === 'action' && (
                            <>
                              <IconButton onClick={() => handleEdit(item)} aria-label="edit">
                                <EditIcon fontSize='small' color='success'/>
                              </IconButton>
                              <IconButton onClick={() => handleDelete(item)} aria-label="delete">
                                <DeleteIcon fontSize='small' color='error' />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={transactions.length}
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

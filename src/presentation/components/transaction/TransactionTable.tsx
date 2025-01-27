import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  TableHead
} from '@mui/material'
import Loading from '../shared/Loading'
import TableHeaderToolbar from './TableHeaderToolbar'
import Transaction from '~/domain/entities/Transaction'

interface Column {
  id: 'description' | 'amount' | 'type' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  {
    id: 'type',
    label: 'Type',
    minWidth: 170
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170
  }
]

interface TransactionTableProps {
  transactions: Transaction[]
  loading: boolean
  onAdd: () => void
}

export default function TransactionTable({
  transactions,
  loading,
  onAdd
}: TransactionTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableHeaderToolbar
        title="Transactions"
        filterButton
        addButton
        onAdd={onAdd}
      />

      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item) => {
                return (
                  <TableRow hover tabIndex={-1} key={item.id}>
                    {columns.map((column) => {
                      const value = item[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

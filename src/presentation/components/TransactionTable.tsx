import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useTransactionStore } from '~/infrastructure/stores/transactionStore'

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

export default function TransactionTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(true)
  const transactions = useTransactionStore((state) => state.transactions)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      useTransactionStore.getState().getAll()
      setLoading(false)
    }
    fetchTransactions()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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

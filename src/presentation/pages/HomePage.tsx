import React from 'react'
import Header from '../components/Header'
import TransactionTable from '../components/TransactionTable'
import { Stack } from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Stack spacing={2} sx={{ p: 6 }}>
        <h1>Transactions</h1>
        <TransactionTable />
      </Stack>
    </>
  )
}

export default HomePage

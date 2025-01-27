import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import TransactionTable from '../components/transaction/TransactionTable'
import { Stack } from '@mui/material'
import { useTransactionStore } from '~/infrastructure/stores/transactionStore'
import AddOrEditTransactionModal from '../components/transaction/addOrEditTransactionModal'
import Transaction from '~/domain/entities/Transaction'

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const transactions = useTransactionStore((state) => state.transactions)
  const addTransaction = useTransactionStore((state) => state.create)

  const handleAddTransaction = (newTransaction: Transaction) => {
    addTransaction(newTransaction)
  }
  
  useEffect(() => {
    const fetchTransactions = async () => {
      useTransactionStore.getState().getAll()
      setLoading(false)
    }
    fetchTransactions()
  }, [])

  return (
    <>
      <Header />
      <Stack spacing={2} sx={{ p: 6 }}>
        <TransactionTable
          transactions={transactions}
          loading={loading}
          onAdd={() => setOpenModal(true)}
        />
      </Stack>

      <AddOrEditTransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={handleAddTransaction}
      />
    </>
  )
}

export default HomePage

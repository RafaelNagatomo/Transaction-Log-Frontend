import React, { useEffect, useState } from 'react'
import Transaction from '~/domain/entities/Transaction'
import Header from '../components/layout/Header'
import TransactionTable from '../components/transaction/TransactionTable'
import ConfirmDeleteModal from '../components/transaction/ConfirmDeleteModal'
import AddOrEditTransactionModal from '../components/transaction/addOrEditTransactionModal'
import { useTransactionStore } from '~/infrastructure/stores/transactionStore'
import { Stack } from '@mui/material'

const TransactionPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editTransaction, setEditTransaction] = useState<Transaction>()
  const [confirmModalOpen, setConfirmModalOpen] = useState<string | null>(null)
  const transactions = useTransactionStore((state) => state.transactions)
  const createTransaction = useTransactionStore((state) => state.create)
  const updateTransaction = useTransactionStore((state) => state.update)
  const deleteTransaction = useTransactionStore((state) => state.delete)

  const handleAddOrEditTransaction = (
    nextTransaction: Transaction,
    edit: boolean
  ) => {
    if (!edit) {
      createTransaction(nextTransaction)
    } else {
      updateTransaction(nextTransaction)
    }
  }

  const handleOpenModal = async (editedTransaction: Transaction) => {
    setEditTransaction(editedTransaction)
    setOpenModal(true)
  }

  const handleConfirmModal = async (id: string) => {
    setConfirmModalOpen(id)
  }

  const handleDelete = async (id: string | null) => {
    if (id) {
      deleteTransaction(id)
    }
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
          onAdd={() => {
            setEditTransaction(undefined)
            setOpenModal(true)
          }}
          onEdit={handleOpenModal}
          onDelete={handleConfirmModal}
        />
      </Stack>

      <AddOrEditTransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={handleAddOrEditTransaction}
        editTransaction={editTransaction}
      />

      <ConfirmDeleteModal
        openModal={confirmModalOpen}
        setOpenModal={setConfirmModalOpen}
        deleteOk={handleDelete}
      />
    </>
  )
}

export default TransactionPage

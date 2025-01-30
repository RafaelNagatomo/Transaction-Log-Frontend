import { useEffect, useState } from 'react'
import Transaction from '~/domain/entities/Transaction'
import TransactionTable from '../../components/transaction/TransactionTable'
import ConfirmDeleteModal from '../../components/shared/ConfirmDeleteModal'
import AddOrEditTransactionModal from '../../components/transaction/AddOrEditTransactionModal'
import { useTransactionStore } from '~/infrastructure/stores/transactionStore'
import { Stack } from '@mui/material'

const TransactionPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editTransaction, setEditTransaction] = useState<Transaction>()
  const [confirmModalOpen, setConfirmModalOpen] = useState<string | null>(null)
  const { getAll, transactions, isLoading } = useTransactionStore()
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
    getAll()
  }, [getAll])

  return (
    <>
      <Stack>
        <TransactionTable
          transactions={transactions}
          loading={isLoading}
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
        title='Delete transaction'
        description='Do you really want to delete this transaction?'
        openModal={confirmModalOpen}
        setOpenModal={setConfirmModalOpen}
        deleteOk={handleDelete}
      />
    </>
  )
}

export default TransactionPage

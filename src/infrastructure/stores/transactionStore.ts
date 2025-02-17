import { create } from 'zustand'
import User from '~/domain/entities/User'
import CreateTransactionUseCase from '~/application/transaction/createTransactionUseCase'
import Transaction from '~/domain/entities/Transaction'
import TransactionRepositoryImpl from '../repositories/TransactionRepositoryImpl'
import FindAllTransactionsUseCase from '~/application/transaction/findAllTransactionsUseCase'
import UpdateTransactionUseCase from '~/application/transaction/updateTransactionUseCase'
import DeleteTransactionUseCase from '~/application/transaction/deleteTransactionUseCase'
import FindTransactionByIdUseCase from '~/application/transaction/findTransactionByIdUseCase'
import { useFeedbackStore } from './feedbackStore'

interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  create: (transaction: Transaction) => Promise<void>
  update: (updatedTransaction: Transaction) => Promise<void>
  getAll: () => Promise<void>
  getById: (id: string) => Promise<Transaction | null>
  delete: (id: string) => Promise<void>
}
const transactionRepository = new TransactionRepositoryImpl()
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository)
const findAllTransactionsUseCase = new FindAllTransactionsUseCase(transactionRepository)
const findTransactionByIdUseCase = new FindTransactionByIdUseCase(transactionRepository)
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository)

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,

  create: async (transaction) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as User

    const Transaction: Transaction = {
      createdBy: user,
      description: transaction.description || '',
      amount: transaction.amount || 0,
      type: transaction.type || 'income',
      status: transaction.status || 'pending',
      isActive: transaction.isActive || false
    }
    const newTransaction = await createTransactionUseCase.execute(Transaction)

    if (newTransaction) {
      useFeedbackStore.getState().showMessage('Transaction created successfully!', 'success')
    }

    set((state) => ({ transactions: [newTransaction, ...state.transactions] }))
  },

  update: async (updatedTransaction) => {
    const updated = await updateTransactionUseCase.execute(updatedTransaction)

    if (updated) {
      await useFeedbackStore.getState().showMessage('Transaction updated successfully!', 'success')
    }

    set((state) => ({
      transactions: state.transactions.map((t) =>
        t._id === updatedTransaction._id ? updated! : t
      ),
    }))
  },

  getAll: async () => {
    if (get().transactions.length > 0 || get().isLoading) return
    
    set({ isLoading: true })
    const transactions = await findAllTransactionsUseCase.execute()
    set({ transactions, isLoading: false })
  },

  getById: async (id) => {
    const transaction = get().transactions.find((t) => t._id === id)
    if (!transaction) {
      const fetchedTransaction = await findTransactionByIdUseCase.execute(id)
      return fetchedTransaction
    }
    return transaction
  },

  delete: async (id) => {
    const deleted = await deleteTransactionUseCase.execute(id)
  
    if (deleted) {
      await useFeedbackStore.getState().showMessage('Transaction deleted successfully!', 'success')
    }
  
    set((state) => ({
      transactions: state.transactions.filter((t) => t._id !== id),
    }))
  }
}))

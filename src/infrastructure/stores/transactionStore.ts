import { create } from 'zustand'
import CreateTransactionUseCase from '~/application/transaction/createTransactionUseCase'
import Transaction from '~/domain/entities/Transaction'
import TransactionRepositoryImpl from '../repositories/TransactionRepositoryImpl'
import FindAllTransactionsUseCase from '~/application/transaction/findAllTransactionsUseCase'
import UpdateTransactionUseCase from '~/application/transaction/updateTransactionUseCase'
import DeleteTransactionUseCase from '~/application/transaction/deleteTransactionUseCase'
import FindTransactionByIdUseCase from '~/application/transaction/findTransactionByIdUseCase'

interface TransactionState {
  transactions: Transaction[]
  create: (transaction: Transaction) => Promise<void>
  update: (updatedTransaction: Transaction) => Promise<void>
  getAll: () => Promise<void>
  getById: (id: string) => Promise<Transaction | null>
  delete: (id: string) => Promise<void>
}
const  transactionRepository = new TransactionRepositoryImpl()
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository)
const findAllTransactionsUseCase = new FindAllTransactionsUseCase(transactionRepository)
const findTransactionByIdUseCase = new FindTransactionByIdUseCase(transactionRepository)
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository)

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],

  create: async (transaction) => {
    const Transaction: Transaction = {
      description: transaction.description || '',
      amount: transaction.amount || 0,
      type: transaction.type || 'income',
      status: transaction.status || 'pending',
      isActive: transaction.isActive || false,
    }
    const newTransaction = await createTransactionUseCase.execute(Transaction)
    set((state) => ({ transactions: [...state.transactions, newTransaction] }))
  },

  update: async (updatedTransaction) => {
    const updated = await updateTransactionUseCase.execute(updatedTransaction)
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t._id === updatedTransaction._id ? updated! : t
      ),
    }))
  },

  getAll: async () => {
    const transactions = await findAllTransactionsUseCase.execute()
    set({ transactions })
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
    await deleteTransactionUseCase.execute(id)
    set((state) => ({
      transactions: state.transactions.filter((t) => t._id !== id),
    }))
  },
}))

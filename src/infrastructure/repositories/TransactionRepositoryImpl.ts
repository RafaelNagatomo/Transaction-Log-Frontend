import api from '../http/axios/AxiosHttpClient'
import User from '~/domain/entities/User'
import Transaction from '~/domain/entities/Transaction'
import ITransactionRepository from '~/domain/repositories/ITransactionRepository'


export default class TransactionRepositoryImpl implements ITransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as User
    
    const response = await api.post('/transactions/create', {
      createdBy: user,
      description: transaction.description || '',
      amount: transaction.amount || 0,
      type: transaction.type || 'income',
      status: transaction.status || 'pending',
      isActive: transaction.isActive || false
    })

    const newTransaction: Transaction = response.data

    return newTransaction
  }

  async findAllTransactions(): Promise<Transaction[]> {
    const allTransactions = await api.get('/api/transactions/', {})
    return allTransactions.data
  }

  async findTransactionById(_id: string): Promise<Transaction | null> {
    await api.get(`/api/transactions/find/${_id}`)

    return {
      _id,
      createdBy: {
        _id,
        name: '',
        email: ''
      },
      type: 'income',
      amount: 0,
      description: '',
      status: 'pending',
      isActive: false
    }
  }

  async updateTransaction(transaction: Transaction): Promise<Transaction | null> {
    await api.put(`/api/transactions/update/${transaction._id}`, transaction)

    return transaction
  }

  async deleteTransaction(_id: string): Promise<Transaction | null> {
    await api.put(`/api/transactions/delete/${_id}`, { _id })

    return {
      _id,
      createdBy: {
        _id,
        name: '',
        email: ''
      },
      type: 'income',
      amount: 0,
      description: '',
      status: 'pending',
      isActive: false
    }
  }
}

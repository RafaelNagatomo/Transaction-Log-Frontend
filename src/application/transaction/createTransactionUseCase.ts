import Transaction from "~/domain/entities/Transaction"
import TransactionRepositoryImpl from "~/infrastructure/repositories/TransactionRepositoryImpl"

export default class CreateTransactionUseCase {
  constructor(private transactionRepositoryImpl: TransactionRepositoryImpl) {}
    
  async execute(transaction: Transaction): Promise<Transaction> {
    const allTransactions = await this.transactionRepositoryImpl.findAllTransactions()
    
    const transactionAlreadyExists = allTransactions.find(t =>
      t.description === transaction.description
    )

    if (transactionAlreadyExists) {
      throw new Error('Transaction already exists')
    }

    return this.transactionRepositoryImpl.createTransaction(transaction)
  }
}

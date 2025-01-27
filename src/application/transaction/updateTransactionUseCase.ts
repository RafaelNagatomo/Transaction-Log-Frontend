import Transaction from "~/domain/entities/Transaction";
import TransactionRepositoryImpl from "~/infrastructure/repositories/TransactionRepositoryImpl";

export default class UpdateTransactionUseCase {
  constructor(private transactionRepositoryImpl: TransactionRepositoryImpl) {}

  async execute(transaction: Transaction): Promise<Transaction | null> {
    return this.transactionRepositoryImpl.updateTransaction(transaction)
  }
}
import Transaction from "~/domain/entities/Transaction";
import TransactionRepositoryImpl from "~/infrastructure/repositories/TransactionRepositoryImpl";

export default class FindAllTransactionsUseCase {
  constructor(private transactionRepositoryImpl: TransactionRepositoryImpl) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepositoryImpl.findAllTransactions()
  }
}

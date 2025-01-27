import Transaction from "~/domain/entities/Transaction"
import TransactionRepositoryImpl from "~/infrastructure/repositories/TransactionRepositoryImpl"

export default class FindTransactionByIdUseCase {
  constructor(private transactionRepositoryImpl: TransactionRepositoryImpl) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionRepositoryImpl.findTransactionById(id)
  }
}

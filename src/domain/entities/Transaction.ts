import User from "./User"

export default class Transaction {
  readonly _id?: string
  readonly user?: User
  readonly createdAt?: Date
  readonly updatedAt?: Date

  constructor(
    public type: 'income' | 'outcome',
    public amount: number,
    public description: string,
    public status: 'paid' | 'pending',
    public isActive?: boolean,
  ) {}
}

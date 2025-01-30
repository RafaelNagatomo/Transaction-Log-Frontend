import User from "./User"

export default class Transaction {
  readonly _id?: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
  
  constructor(
    public createdBy: User,
    public type: 'income' | 'outcome',
    public amount: number,
    public description: string,
    public status: 'paid' | 'pending',
    public isActive?: boolean,
  ) {}
}

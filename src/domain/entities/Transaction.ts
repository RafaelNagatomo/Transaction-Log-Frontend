export default class Transaction {
  constructor(
    public type: 'income' | 'outcome',
    public amount: number,
    public description: string,
    public status: 'paid' | 'pending',
    public isActive?: boolean,
    public id?: string,
  ) {}
}

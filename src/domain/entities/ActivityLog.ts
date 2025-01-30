import User from "./User"

export default class ActivityLog {
  readonly createdAt?: Date
  readonly updatedAt?: Date

  constructor(
    public _id: string,
    public eventType: string,
    public action: string,
    public oldData: JSON,
    public newData: JSON,
    public changedBy: User,
    public changedAt: Date,
    public clientIp: string,
    public userAgent: object
  ) {}
}

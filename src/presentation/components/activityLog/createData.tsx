import User from "~/domain/entities/User"

export default function createData(
  _id: string,
  changedAt: Date,
  changedBy: User,
  eventType: string,
  action: string,
  oldData: JSON,
  newData: JSON,
  clientIp: string,
  userAgent: string,
) {
  return {
    _id,
    changedAt,
    changedBy,
    eventType,
    action,
    data: {
      oldData: oldData,
      newData: newData,
      clientIp: clientIp,
      userAgent: userAgent
    }
  }
}

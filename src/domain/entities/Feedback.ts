export type FeedbackVariant = 'success' | 'error' | 'info' | 'warning'

export interface Feedback {
  message: string
  severity?: FeedbackVariant
  open: boolean
}

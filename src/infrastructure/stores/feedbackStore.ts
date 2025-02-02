import { AxiosError } from 'axios'
import { create } from 'zustand'
import { FeedbackService } from '~/application/services/FeedbackService'
import { Feedback, FeedbackVariant } from '~/domain/entities/Feedback'

interface FeedbackStore {
  feedback: Feedback
  showMessage: (message: string, severity: FeedbackVariant) => void
  showError: (error: AxiosError | Error) => void
  hideMessage: () => void
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedback: {
    message: '',
    severity: 'info',
    open: false
  },

  showMessage: (message: string, severity: FeedbackVariant) => {
    set({ feedback: FeedbackService.showMessage(message, severity) })
  },

  showError: (error: AxiosError | Error) => {
    set({ feedback: FeedbackService.errorMessage(error) })
  },

  hideMessage: () => {
    set({ feedback: FeedbackService.hideMessage() })
  }
}))

import { AxiosError } from "axios"
import { Feedback, FeedbackVariant } from "~/domain/entities/Feedback"

export class FeedbackService {
  static showMessage(
    message: string,
    severity: FeedbackVariant
): Feedback {
    return {
      message,
      severity,
      open: true,
    }
  }

  static errorMessage(e: AxiosError | Error): Feedback {
    let messages = ''

    if (Object.prototype.hasOwnProperty.call(e, 'response')) {
      const { response } = e as AxiosError
      const errors = response?.data as { [column: string]: Array<string> } | string

      if (errors && typeof errors === 'object') {
        try {
          messages = Object.values(errors)
            .flatMap(column =>
              column.map(error => `${error}`)
            )
            .join('\n')
        } catch {
          messages = Object.values(errors)
            .map(error => `${error}`)
            .join('\n')
        }
      } else if (typeof errors === 'string') {
        messages = errors
      } else if (response?.status && response.status !== 200) {
        messages = `serverErrorCode ${response?.status}`
      }
      return {
        message: messages,
        severity: 'error',
        open: true,
      }
    }

    return {
      message: 'unknownError',
      severity: 'error',
      open: true,
    }
  }

  static hideMessage(): Feedback {
    return {
      message: '',
      open: false,
    }
  }
}

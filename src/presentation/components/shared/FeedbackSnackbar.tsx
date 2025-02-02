import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useFeedbackStore } from '~/infrastructure/stores/feedbackStore'

export const FeedbackSnackbar: React.FC = () => {
  const { feedback, hideMessage } = useFeedbackStore()

  return (
    <Snackbar
      open={feedback.open}
      autoHideDuration={6000}
      onClose={hideMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={hideMessage}
        variant="filled"
        severity={feedback.severity}
        sx={{ width: '100%' }}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  )
}

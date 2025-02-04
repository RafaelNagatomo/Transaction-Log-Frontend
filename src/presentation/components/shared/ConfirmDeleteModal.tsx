import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDeleteModalProps {
  title: string
  description: string
  openModal: string | null
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>
  deleteOk: (id: string | null) => void
}

export default function ConfirmDeleteModal({
  title,
  description,
  openModal,
  setOpenModal,
  deleteOk
}:ConfirmDeleteModalProps ) {

  const handleOk = () => {
    deleteOk(openModal)
    setOpenModal(null)
  }

  const handleClose = () => {
    setOpenModal(null)
  }

  return (
    <React.Fragment>
      <Dialog
        open={!!openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>{description}</p>
            <p>This action is irreversible!</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='error'
            size='small'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={handleOk}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

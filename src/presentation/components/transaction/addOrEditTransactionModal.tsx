import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField
} from '@mui/material'
import { useState } from 'react'
import Transaction from '~/domain/entities/Transaction'

interface AddOrEditTransactionModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (transaction: Transaction) => void
}

export default function AddOrEditTransactionModal({
  openModal,
  setOpenModal,
  onSubmit
}: AddOrEditTransactionModalProps) {
  const [paid, setPaid] = useState<boolean>(false)
  const [type, setType] = useState<string>('outcome')

  function handleClose() {
    setOpenModal(false)
  }

  const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaid(event.target.checked)
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries((formData).entries())

    const newTransaction = new Transaction(
      type as 'income' | 'outcome',
      parseFloat(formJson.amount as string),
      formJson.description as string,
      paid ? 'paid' : 'pending'
    )

    onSubmit(newTransaction)
    handleClose()
  }

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      fullWidth
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Tipo de Transação</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={type}
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
            <FormControlLabel
              value="outcome"
              control={<Radio />}
              label="Outcome"
            />
          </RadioGroup>
        </FormControl>

        <FormLabel component="legend">Description</FormLabel>
        <TextField
          sx={{ marginBottom: 2 }}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          size='small'
          fullWidth
          required
        />

        <FormLabel component="legend">Amount</FormLabel>
        <TextField
          sx={{ marginBottom: 2 }}
          id="amount"
          name="amount"
          label="Amount"
          variant="outlined"
          type='number'
          size='small'
          fullWidth
          required
        />

        <FormControlLabel
          control={
            <Switch
              checked={paid}
              onChange={handlePaidChange}
            />
          }
          label="Pago"
          sx={{ mb: 2 }}
        />

      </DialogContent>

      <DialogActions>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

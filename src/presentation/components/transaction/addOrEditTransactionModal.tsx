import { useEffect, useState } from 'react'
import Transaction from '~/domain/entities/Transaction'
import User from '~/domain/entities/User'
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

interface AddOrEditTransactionModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (transaction: Transaction, edit: boolean) => void
  editTransaction: Transaction | undefined
}

export default function AddOrEditTransactionModal({
  openModal,
  setOpenModal,
  onSubmit,
  editTransaction
}: AddOrEditTransactionModalProps) {
  const [paid, setPaid] = useState<boolean>(false)
  const [type, setType] = useState<string>('outcome')
  const [description, setDescription] = useState<string | null>('')
  const [amount, setAmount] = useState<number | null>()
  const user = JSON.parse(localStorage.getItem('user') || '{}') as User

  function resetFields() {
    setPaid(false)
    setType('outcome')
    setDescription(null)
    setAmount(null)
  }

  function handleClose() {
    resetFields()
    setOpenModal(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries((formData).entries())

    const nextTransaction = new Transaction(
      user,
      type as 'income' | 'outcome',
      parseFloat(formJson.amount as string),
      formJson.description as string,
      paid ? 'paid' : 'pending'
    )

    if (!editTransaction) {
      onSubmit(nextTransaction, false)
    } else {
      const edited = { ...nextTransaction, _id: editTransaction._id }
      onSubmit(edited, true)
    }
    handleClose()
  }

  useEffect(() => {
    if (editTransaction) {
      setPaid(editTransaction.status === 'paid')
      setType(editTransaction.type)
      setDescription(editTransaction.description)
      setAmount(editTransaction.amount)
    } else {
      setPaid(false)
      setType('outcome')
      setDescription(null)
      setAmount(null)
    }
  }, [editTransaction])

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
      <DialogTitle>
        {!editTransaction ? 'Add' : 'Edit' } {'Transaction'}
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Tipo de Transação</FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            row
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
          value={description ?? null}
          label="Description"
          variant="outlined"
          size='small'
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
        />

        <FormLabel component="legend">Amount</FormLabel>
        <TextField
          sx={{ marginBottom: 2 }}
          id="amount"
          name="amount"
          value={amount ?? null}
          label="Amount"
          variant="outlined"
          type='number'
          size='small'
          onChange={(e) => setAmount(Number(e.target.value))}
          fullWidth
          required
        />

        <FormControlLabel
          control={
            <Switch
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}
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
          size='small'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          type="submit"
          size='small'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

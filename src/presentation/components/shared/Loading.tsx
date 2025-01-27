import { CircularProgress, Stack, Typography } from '@mui/material'
import { SiTransifex } from 'react-icons/si'

export default function Loading() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      height={550}
      spacing={5}
    >
      <Stack direction={'row'} spacing={2}>
        <SiTransifex size={38} color='#3435CE' />
        <Typography variant='h4'>TransferX</Typography>
      </Stack>
      <CircularProgress />
    </Stack>
  )
}

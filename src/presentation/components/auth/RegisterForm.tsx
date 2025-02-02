import React, { useState } from 'react'
import { SiTransifex } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/infrastructure/stores/authStore'
import { TextField, Button, Stack, Typography, Box, Divider } from '@mui/material'
import { AxiosError } from 'axios'
import { useFeedbackStore } from '~/infrastructure/stores/feedbackStore'

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { register } = useAuthStore()
  const { showMessage, showError } = useFeedbackStore()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      showMessage('Registration successful! Please login.', 'success')
      navigate('/login')
    } catch (error) {
      showError(error as AxiosError | Error)
    }
  }

  return (
    <Stack
      justifyContent='center'
      sx={{
        paddingX: 4,
        height: '100%',
      }}
    >
      <Stack
        direction={'row'}
        marginBottom={4}
        gap={2}
        alignItems={'center'}
      >
        <SiTransifex size={30} color='#3435CE'/>
        <Typography fontSize={24}>
          TransferX
        </Typography>
      </Stack>

      <Typography color='text.primary' fontSize={18} gutterBottom>
        Wellcome to TransferX! 🎉
      </Typography>
      <Typography color='text.secondary' fontSize={14} marginBottom={4}>
        Please fill this form to create an account
      </Typography>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        component='form'
        onSubmit={handleRegister}
      >
        <TextField
          label='Nome'
          variant='outlined'
          value={name}
          size='small'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label='E-mail'
          type='email'
          variant='outlined'
          value={email}
          size='small'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='Senha'
          type='password'
          variant='outlined'
          value={password}
          size='small'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
        >
          Register
        </Button>

        <Divider>
          <Typography fontSize={14}>Or</Typography>
        </Divider>

        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Typography fontSize={14}>Already have an Account?</Typography>
          <Button
            type='submit'
            variant='text'
            color='primary'
            size='small'
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default RegisterForm

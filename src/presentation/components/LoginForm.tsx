import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SiTransifex } from "react-icons/si"
import { useAuthStore } from "~/infrastructure/stores/authStore"
import { TextField, Button, Typography, Box, Stack, Divider } from '@mui/material'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login(email, password)
      console.log(response)
      console.error("Login successful!")
    } catch (error) {
      setError('Erro ao logar. Verifique seus dados.')
      console.error({Message: "Login failed", error: error})
    }
  }

  return (
    <Stack
      justifyContent="center"
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
        <SiTransifex size={30} color="#3435CE"/>
        <Typography fontSize={24}>
          TransferX
        </Typography>
      </Stack>

      <Typography color='text.primary' fontSize={18} gutterBottom>
        Wellcome to TransferX! 🎉
      </Typography>
      <Typography color='text.secondary' fontSize={14} marginBottom={4}>
        Please log-into your account and start the adventure
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
        onSubmit={handleLogin}
      >
        <TextField
          label="E-mail"
          type="email"
          variant="outlined"
          value={email}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          Login
        </Button>

        <Divider>
          <Typography fontSize={14}>Or</Typography>
        </Divider>

        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
          <Typography fontSize={14}>Already have an Account?</Typography>
          <Button
            type="submit"
            variant="text"
            color="primary"
            size="small"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default LoginForm

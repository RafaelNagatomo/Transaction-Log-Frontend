import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from '~/assets/styles/themes/defaultTheme.ts'
import { GlobalStyles } from '~/assets/styles/globalStyles'
import { useAuthStore } from './infrastructure/stores/authStore'
import LoginPage from './presentation/pages/LoginPage'
import TransactionPage from './presentation/pages/TransactionPage'
import RegisterPage from './presentation/pages/RegisterPage'

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <StyledThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route
              path='/'
              element={<Navigate to={isAuthenticated ? '/transaction' : '/login'} />}
            />
            <Route
              path='/login'
              element={!isAuthenticated ? <LoginPage /> : <Navigate to='/transaction' />}
            />
            <Route
              path='/register'
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to='/transaction' />}
            />
            <Route
              path='/transaction'
              element={isAuthenticated ? <TransactionPage /> : <Navigate to='/login' />}
            />
          </Routes>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App

import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from '~/assets/styles/themes/defaultTheme.ts'
import { GlobalStyles } from '~/assets/styles/globalStyles'
import { useAuthStore } from "./infrastructure/stores/authStore"
import LoginPage from "./presentation/pages/LoginPage"
import HomePage from "./presentation/pages/HomePage"
import RegisterPage from "./presentation/pages/RegisterPage"

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <StyledThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={!isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from '~/assets/styles/themes/defaultTheme.ts'
import { GlobalStyles } from '~/assets/styles/globalStyles'
import AppRoutes from './presentation/routes'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <StyledThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Router>
          <AppRoutes />
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App

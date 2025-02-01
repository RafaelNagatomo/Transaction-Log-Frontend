import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from '~/presentation/styles/themes/defaultTheme.ts'
import { GlobalStyles } from '~/presentation/styles/globalStyles'
import AppRoutes from './presentation/routes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <StyledThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Router>
            <AppRoutes />
          </Router>
        </LocalizationProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App

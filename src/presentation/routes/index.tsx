import { Routes, Route, Navigate } from 'react-router-dom'
import DefaultLayout from '../components/layout'
import ManageAccess from './ManageAccess'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TransactionPage from '../pages/transaction'
import ErrorPage from '../pages/error'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/transaction" />} />

      <Route path="/login" element={<ManageAccess element={<LoginPage />} path="/login" />} />
      <Route path="/register" element={<ManageAccess element={<RegisterPage />} path="/register" />} />
      <Route
        path="/transaction"
        element={
          <ManageAccess
            path="/transaction"
            element={<DefaultLayout><TransactionPage /></DefaultLayout>}
          />
        }
      />

      <Route path='/error' element={<ErrorPage />} />
      <Route path='*' element={<Navigate to={'/error'} replace />} />
    </Routes>
  )
}

export default AppRoutes

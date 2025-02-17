import { Routes, Route, Navigate } from 'react-router-dom'
import DefaultLayout from '../components/layout'
import ManageAccess from './ManageAccess'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TransactionPage from '../pages/transaction'
import ErrorPage from '../pages/error'
import ActivityLogPage from '../pages/activityLog'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/transaction" replace />} />

      <Route
        path="/login"
        element={<ManageAccess element={<LoginPage />} path="/login" />}
      />
      <Route
        path="/register"
        element={<ManageAccess element={<RegisterPage />} path="/register" />}
      />
      <Route
        path="/transaction"
        element={<ManageAccess element={<DefaultLayout><TransactionPage /></DefaultLayout>} path="/transaction" />
        }
      />
      <Route
        path="/activitylog"
        element={<ManageAccess element={<DefaultLayout><ActivityLogPage /></DefaultLayout>} path="/activitylog" />
        }
      />

      <Route path='/error' element={<ErrorPage />} />
      <Route path='*' element={<Navigate to={'/error'} replace />} />
    </Routes>
  )
}

export default AppRoutes

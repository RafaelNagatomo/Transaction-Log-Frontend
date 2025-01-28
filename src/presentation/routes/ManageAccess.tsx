import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

const ManageAccess: React.FC<{ element: ReactElement; path: string }> = ({ element, path }) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (path === '/') {
    return (
      isAuthenticated
        ? <Navigate to="/transaction" replace />
        : <Navigate to="/login" replace />
    )
  }

  if (path === '/login' || path === '/register') {
    return (
      !isAuthenticated
        ? element
        : <Navigate to="/transaction" replace />
    )
  }

  return (
    isAuthenticated
      ? element
      : <Navigate to="/login" replace />
    )
}

export default ManageAccess

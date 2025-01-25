import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./infrastructure/stores/authStore"
import LoginPage from "./presentation/pages/LoginPage"
import HomePage from "./presentation/pages/HomePage"
import RegisterPage from "./presentation/pages/RegisterPage"

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  return (
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
      </Routes>
    </Router>
  )
}

export default App

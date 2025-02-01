import axios from 'axios'
import { useAuthStore } from '~/infrastructure/stores/authStore'

const token = localStorage.getItem('authToken')

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.message) {
      useAuthStore.getState().checkTokenExpired(error)
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default api

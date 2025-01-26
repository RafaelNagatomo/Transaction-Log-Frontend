import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json'
  }
})

export default api

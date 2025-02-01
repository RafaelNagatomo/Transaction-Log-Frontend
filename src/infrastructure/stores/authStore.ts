import { AxiosError } from 'axios'
import { create } from 'zustand'
import AuthService from '~/application/services/AuthService'
import User from '~/domain/entities/User'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkTokenExpired: (error: AxiosError) => Promise<boolean>
}

const authService = new AuthService()

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: !!localStorage.getItem('authToken'),

  login: async (email, password) => {
    const data = await authService.login(email, password)
    set({ token: data.token, user: data.user, isAuthenticated: true })
  },

  register: async (name, email, password) => {
    await authService.register(name, email, password)
  },

  logout: () => {
    authService.logout()
    set({ user: null, token: null, isAuthenticated: false })
  },

  checkTokenExpired(error: AxiosError): Promise<boolean> {
    const { response } = error
    const status = response?.status
    const data = response?.data as { message?: string }

    const isAuthorizaded =
      status !== 403 && data?.message === 'Expired token'

      console.log(isAuthorizaded)
  
    if (!isAuthorizaded) return Promise.resolve(false)

    get().logout()
    return Promise.resolve(true)
  }
}))

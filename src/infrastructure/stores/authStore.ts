import { create } from "zustand"
import AuthService from "~/application/services/AuthService"
import User from "~/domain/entities/User"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const authService = new AuthService()

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const user = await authService.login(email, password)
    set({ user, token: user.token, isAuthenticated: true })
  },

  register: async (name, email, password) => {
    await authService.register(name, email, password)
  },

  logout: () => {
    authService.logout()
    set({ user: null, token: null, isAuthenticated: false })
  },
}))

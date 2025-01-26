import LoginUserUseCase from '~/application/auth/LoginUserUseCase'
import LogoutUserUseCase from '~/application/auth/LogoutUserUseCase'
import RegisterUserUseCase from '~/application/auth/RegisterUserUseCase'
import AuthService from '~/application/services/AuthService'
import User from '~/domain/entities/User'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

jest.mock('~/application/auth/LoginUserUseCase')
jest.mock('~/application/auth/RegisterUserUseCase')
jest.mock('~/application/auth/LogoutUserUseCase')

describe('AuthService', () => {
  let authService: AuthService
  let mockLoginUseCase: jest.Mocked<LoginUserUseCase>
  let mockRegisterUseCase: jest.Mocked<RegisterUserUseCase>
  let mockLogoutUseCase: jest.Mocked<LogoutUserUseCase>

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()

    mockLoginUseCase = new LoginUserUseCase({} as AuthRepositoryImpl) as jest.Mocked<LoginUserUseCase>
    mockRegisterUseCase = new RegisterUserUseCase({} as AuthRepositoryImpl) as jest.Mocked<RegisterUserUseCase>
    mockLogoutUseCase = new LogoutUserUseCase({} as AuthRepositoryImpl) as jest.Mocked<LogoutUserUseCase>

    ;(LoginUserUseCase as jest.Mock).mockImplementation(() => mockLoginUseCase)
    ;(RegisterUserUseCase as jest.Mock).mockImplementation(() => mockRegisterUseCase)
    ;(LogoutUserUseCase as jest.Mock).mockImplementation(() => mockLogoutUseCase)

    authService = new AuthService()
  })

  describe('login', () => {
    it('should call LoginUseCase and save the token in localStorage', async () => {
      const email = 'john.doe@example.com'
      const password = 'password123'
      const mockToken = 'mock-token'

      mockLoginUseCase.execute.mockResolvedValue(mockToken)
      const result = await authService.login(email, password)

      expect(mockLoginUseCase.execute).toHaveBeenCalledWith(email, password)
      expect(localStorage.getItem('authToken')).toBe(mockToken)
      expect(result).toBe(mockToken)
    })
  })

  describe('register', () => {
    it('should call RegisterUseCase with the correct parameters', async () => {
      const name = 'John Doe'
      const email = 'john.doe@example.com'
      const password = 'password123'
      const mockUser: User = {
        id: '1',
        name,
        email,
      }

      mockRegisterUseCase.execute.mockResolvedValue(mockUser)
      const result = await authService.register(name, email, password)

      expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(name, email, password)
      expect(result).toEqual(mockUser)
    })
  })

  describe('logout', () => {
    it('should call LogoutUseCase and remove the token from localStorage', async () => {
      localStorage.setItem('authToken', 'mock-token')
      mockLogoutUseCase.execute.mockResolvedValue(undefined)
      await authService.logout()

      expect(mockLogoutUseCase.execute).toHaveBeenCalled()
      expect(localStorage.getItem('authToken')).toBeNull()
    })
  })
})

import IAuthRepository from '~/domain/repositories/IAuthRepository'
import User from '~/domain/entities/User'

describe('IAuthRepository', () => {
  let mockAuthRepository: jest.Mocked<IAuthRepository>

  beforeEach(() => {
    mockAuthRepository = {
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    }
  })

  describe('register', () => {
    it('should call the register method with the correct parameters and return a User', async () => {
      const name = 'John Doe'
      const email = 'john.doe@example.com'
      const password = 'password123'

      const mockUser: User = new User('1', name, email)
      mockAuthRepository.register.mockResolvedValue(mockUser)
      const result = await mockAuthRepository.register(name, email, password)

      expect(mockAuthRepository.register).toHaveBeenCalledWith(name, email, password)
      expect(result).toEqual(mockUser)
    })
  })

  describe('login', () => {
    it('should call the login method with the correct parameters and return a token', async () => {
      const email = 'john.doe@example.com'
      const password = 'password123'
      const mockToken = 'mock-token'

      mockAuthRepository.login.mockResolvedValue(mockToken)
      const result = await mockAuthRepository.login(email, password)

      expect(mockAuthRepository.login).toHaveBeenCalledWith(email, password)
      expect(result).toBe(mockToken)
    })
  })

  describe('logout', () => {
    it('should call the logout method and return void', async () => {
      mockAuthRepository.logout.mockResolvedValue(undefined)
      const result = await mockAuthRepository.logout()

      expect(mockAuthRepository.logout).toHaveBeenCalled()
      expect(result).toBeUndefined()
    })
  })
})

import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'
// import IAuthRepository from '~/domain/repositories/IAuthRepository'
import User from '~/domain/entities/User'
import api from '~/infrastructure/http/axios/AxiosHttpClient'

jest.mock('~/infrastructure/http/axios/AxiosHttpClient')

describe('AuthRepositoryImpl', () => {
  let authRepositoryImpl: AuthRepositoryImpl

  beforeEach(() => {
    jest.clearAllMocks()

    authRepositoryImpl = new AuthRepositoryImpl()
  })

  describe('register', () => {
    it('should call the registration API and return a User', async () => {
      const name = 'John Doe'
      const email = 'john.doe@example.com'
      const password = 'password123'

      const mockApiResponse = {
        data: {
          _id: '1',
          name,
          email,
        },
      }
      ;(api.post as jest.Mock).mockResolvedValue(mockApiResponse)

      const result = await authRepositoryImpl.register(name, email, password)

      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        name,
        email,
        password,
      })

      expect(result).toBeInstanceOf(User)
      expect(result.id).toBe(mockApiResponse.data._id)
      expect(result.name).toBe(mockApiResponse.data.name)
      expect(result.email).toBe(mockApiResponse.data.email)
    })
  })

  describe('login', () => {
    it('should call the login API and return a token', async () => {
      const email = 'john.doe@example.com'
      const password = 'password123'
      const mockToken = 'mock-token'

      const mockApiResponse = {
        data: {
          token: mockToken,
        },
      }
      ;(api.post as jest.Mock).mockResolvedValue(mockApiResponse)

      const result = await authRepositoryImpl.login(email, password)

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email,
        password,
      })
      expect(result).toBe(mockToken)
    })
  })

  describe('logout', () => {
    it('should call the logout API', async () => {
      ;(api.post as jest.Mock).mockResolvedValue({})

      await authRepositoryImpl.logout()

      expect(api.post).toHaveBeenCalledWith('/auth/logout', {})
    })
  })
})

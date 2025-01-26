import LoginUserUseCase from '~/application/auth/LoginUserUseCase'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

jest.mock('~/infrastructure/repositories/AuthRepositoryImpl')

describe('LoginUseCase', () => {
  let loginUseCase: LoginUserUseCase
  let mockAuthRepositoryImpl: jest.Mocked<AuthRepositoryImpl>

  beforeEach(() => {
    mockAuthRepositoryImpl = new AuthRepositoryImpl() as jest.Mocked<AuthRepositoryImpl>
    loginUseCase = new LoginUserUseCase(mockAuthRepositoryImpl)
  })

  it('should call the login method of AuthRepositoryImpl with the correct parameters', async () => {
    const email = 'test@example.com'
    const password = 'password123'

    mockAuthRepositoryImpl.login.mockResolvedValue('token123')
    const result = await loginUseCase.execute(email, password)

    expect(mockAuthRepositoryImpl.login).toHaveBeenCalledWith(email, password)
    expect(result).toBe('token123')
  })

  it('should throw an error if the login method of AuthRepositoryImpl fails', async () => {
    const email = 'test@example.com'
    const password = 'password123'

    mockAuthRepositoryImpl.login.mockRejectedValue(new Error('Login failed'))
    await expect(loginUseCase.execute(email, password)).rejects.toThrow('Login failed')
  })
})

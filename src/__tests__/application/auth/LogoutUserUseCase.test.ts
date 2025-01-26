import User from '~/domain/entities/User'
import LogoutUserUseCase from '~/application/auth/LogoutUserUseCase'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'

describe('LogoutUserUseCase', () => {
  let logoutUserUseCase: LogoutUserUseCase
  let mockAuthRepositoryImpl: jest.Mocked<AuthRepositoryImpl>

  beforeEach(() => {
    mockAuthRepositoryImpl = {
      logout: jest.fn().mockResolvedValue(undefined),
      register: jest.fn().mockResolvedValue({} as User),
      login: jest.fn().mockResolvedValue('mock-token'),
    } as jest.Mocked<AuthRepositoryImpl>

    logoutUserUseCase = new LogoutUserUseCase(mockAuthRepositoryImpl)
  })

  it('sohuld call the logout method of the AuthRepository', async () => {
    await logoutUserUseCase.execute()

    expect(mockAuthRepositoryImpl.logout).toHaveBeenCalled()
  })

  it('should return void (nothing) after execution', async () => {
    const result = await logoutUserUseCase.execute()
    expect(result).toBeUndefined()
  })
})

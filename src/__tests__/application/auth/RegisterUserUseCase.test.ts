import RegisterUserUseCase from '~/application/auth/RegisterUserUseCase'
import AuthRepositoryImpl from '~/infrastructure/repositories/AuthRepositoryImpl'
import User from '~/domain/entities/User'

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase
  let mockAuthRepositoryImpl: jest.Mocked<AuthRepositoryImpl>

  beforeEach(() => {
    mockAuthRepositoryImpl = {
      logout: jest.fn().mockResolvedValue(undefined),
      register: jest.fn().mockResolvedValue({} as User),
      login: jest.fn().mockResolvedValue('mock-token'),
    } as jest.Mocked<AuthRepositoryImpl>

    registerUserUseCase = new RegisterUserUseCase(mockAuthRepositoryImpl)
  })

  it('should call the register method of AuthRepositoryImpl with the correct parameters', async () => {
    const name = 'John Doe'
    const email = 'john.doe@example.com'
    const password = 'password123'

    const mockUser: User = {
      id: '1',
      name,
      email,
    }
    mockAuthRepositoryImpl.register.mockResolvedValue(mockUser)
    const result = await registerUserUseCase.execute(name, email, password)

    expect(mockAuthRepositoryImpl.register).toHaveBeenCalledWith(
      name,
      email,
      password
    )

    expect(result).toEqual(mockUser)
  })

  it('should return the registered user', async () => {
    const name = 'Jane Doe'
    const email = 'jane.doe@example.com'
    const password = 'password456'

    const mockUser: User = {
      id: '2',
      name,
      email,
    }
    mockAuthRepositoryImpl.register.mockResolvedValue(mockUser)
    const result = await registerUserUseCase.execute(name, email, password)
    
    expect(result).toEqual(mockUser)
  })
})
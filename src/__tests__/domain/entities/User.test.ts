import User from '~/domain/entities/User'

describe('User', () => {
  it('should create a User instance with the correct properties', () => {
    const id = '1'
    const name = 'John Doe'
    const email = 'john.doe@example.com'

    const user = new User(id, name, email)

    expect(user.id).toBe(id)
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
  })

  it('should allow the creation of a User instance with empty values', () => {
    const id = ''
    const name = ''
    const email = ''

    const user = new User(id, name, email)

    expect(user.id).toBe(id)
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
  })
})

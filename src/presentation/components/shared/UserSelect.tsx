import { useEffect, useState } from 'react'
import {
  Box,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import FindAllUsersUseCase from '~/application/user/findAllUsersUseCase'
import UserRepositoryImpl from '~/infrastructure/repositories/UserRepositoryImpl'
import User from '~/domain/entities/User'

interface userSelectProps {
  filters?: [key: string]
  setFilters: (newFilters: {[key: string]: string}) => void
}

const userRepositoryImpl = new UserRepositoryImpl()
const findAllUsersUseCase = new FindAllUsersUseCase(userRepositoryImpl)

const UserSelect: React.FC<userSelectProps> = ({
  setFilters
}) => {
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await findAllUsersUseCase.execute()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <Box>
      <Typography mb={1}>User</Typography>
      <Select
        fullWidth
        size="small"
        value={users}
        onChange={(event) => setFilters({
          changedBy: event.target.value as string
        })}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select User
        </MenuItem>
        {users?.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default UserSelect

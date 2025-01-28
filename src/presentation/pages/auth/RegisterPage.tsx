import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import { CardMedia, Grid2 } from '@mui/material'
import auth_page from '~/assets/media/auth_page.jpg'

const RegisterPage: React.FC = () => {
  return (
    <Grid2 container direction='row'>
      <Grid2 size={8}>
        <CardMedia
          component='img'
          image={auth_page}
          alt={'auth_page_img'}
          sx={{
            height: '100vh'
          }}
        />
      </Grid2>
      <Grid2 size={4}>
        <RegisterForm />
      </Grid2>
    </Grid2>
  )
}

export default RegisterPage

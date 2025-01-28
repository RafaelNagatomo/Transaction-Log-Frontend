import { Button, CardMedia, Grid2, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import error_img from '~/assets/media/error_not_found404.jpg'

const ErrorPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Grid2
      sx={{ height: '100vh', backgroundColor: 'white' }}
      size={8} 
      container 
      justifyContent="center" 
      alignItems="center" 
    >
      <Grid2
        size={4}
        container
        justifyContent="center" 
        alignItems="center" 
      >
        <Stack justifyContent="center" alignItems="center" >
          <Typography fontWeight={800} fontSize={75}>Oops!</Typography>
          <Typography>Something went wrong here</Typography>
          <Button
            sx={{ marginTop: 10 }}
            variant='contained'
            color='primary'
            onClick={() => navigate('/')}
          >
            Back to home
          </Button>
        </Stack>
      </Grid2>
      <CardMedia
        component='img'
        image={error_img}
        alt={'error_not_found404_img'}
        sx={{
          width: '60%'
        }}
      />
    </Grid2>
  )
}

export default ErrorPage

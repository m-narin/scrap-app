import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
// import CreateIcon from '@mui/icons-material/Create';

export const Header = () => {
  const router = useRouter()

  return (
    <AppBar position="static" color="inherit" component="div">
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            color: '#1976d2',
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          onClick={() => {
            router.push('/')
          }}
        >
          Scrap
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Button
          variant="contained"
          color="primary"
          // startIcon={<CreateIcon />}
          onClick={() => {
            router.push('/scraps/new')
          }}
        >
          Add New
        </Button>
      </Toolbar>
    </AppBar>
  )
}

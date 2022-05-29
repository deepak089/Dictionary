import { Stack, IconButton, Typography, Box } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'

const Bookmarks = ({ bookmarks }) => {
  return (
    <>
      <Stack sx={{ mb: 2 }} direction="row" alignItems="center">
        <IconButton to="/" component={Link} sx={{ color: 'black', mr: 1 }}>
          <ArrowBackIcon sx={{
            color: '#fff',
            height: '40px',
            width: '40px',
            p: '2',
            marginRight: '10px',
          }} />
        </IconButton>
        <Typography variant="h5">
          Bookmarks</Typography>
      </Stack>



     <div class="container-fluids col-xs-3 col-lg-10 col-md-10 col-sm-10 text-center shadow px-5 py-5 mx-5 my-5 bg-light">
        {/* as it is object  */}
        {
          !!Object.keys(bookmarks).length ?
            Object.keys(bookmarks).map(b =>
              // redirecting to that definition
              <Box key={b} to={`/search/${b}`} component={Link} sx={{
                p: 2,
                backgroundColor: 'blue',
                cursor: 'pointer',
                backgroundColor: 'white',
                borderRadius: 1,
                textTransform: 'capitalize',
                mb: 2,
                fontWeight: 800,
                display: 'block',
                color: 'black',
                textDecoration: 'none'
              }}>
                {b}
              </Box>)

            : <Typography sx={{ mt: 5 }} align="center">No Bookmarks</Typography>
        }
        </div>

    </>
  )
}

export default Bookmarks
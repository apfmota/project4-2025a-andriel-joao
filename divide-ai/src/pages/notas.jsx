import { useEffect, useState } from 'react'
import { backendServerUrl } from '../config/backendIntegration';
import Purchases from '../componentes/purchases';
import axios from 'axios';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import Sidebar from '../util/sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Notas = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios.get(backendServerUrl + '/purchase', {withCredentials: true})
      .then((response) => {
        console.log(response.data);
        setPurchases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });
  }, [])

  return (
    <>
      <CssBaseline />
    
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundImage: "url(/login-background-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <AppBar position="fixed" sx={{ backgroundColor: "#006bff" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              fontFamily={"'Jersey 15'"}
              fontSize={32}
            >
              Notas
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <Purchases purchases={purchases} />
      </Box>
    </>
  )
}

export default Notas
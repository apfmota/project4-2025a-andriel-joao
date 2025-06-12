import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, CssBaseline, Fab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../util/sidebar';
import { backendServerUrl } from '../config/backendIntegration';
import Purchases from '../componentes/purchases';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(backendServerUrl + '/purchase', { withCredentials: true })
      .then(res => {
        if (Array.isArray(res.data)) {
          setNotas(res.data);
        } else {
          console.warn("Resposta inesperada da API, usando array vazio.");
          setNotas([]);
        }
      })
      .catch(err => {
        console.error("Erro ao buscar notas:", err);
        setNotas([]);
      });
    }, 
  []);
  
  return (
    <>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#006bff' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{fontSize: 32}}/>
          </IconButton>
          <Typography variant="h6" noWrap fontFamily={"'Jersey 15'"} fontSize={32}>
            divide ai!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      
      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />      {/* Conteúdo com lista scrollável */}
      
      <Purchases purchases={notas} />


      {/* Botão flutuante */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#006bff',
          color: 'white',
          '&:hover': {
            backgroundColor: '#0050cc',
          },
        }}
        onClick={() => navigate('/qrcode')}
      >
        <QrCodeScannerIcon />
      </Fab>
    </>
  );
};

export default Home;

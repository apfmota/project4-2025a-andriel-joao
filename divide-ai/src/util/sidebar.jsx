import React, { useState, useEffect } from 'react';
import {
  Typography, SwipeableDrawer, Box, List,
  Button,
  ThemeProvider,
  createTheme
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HomeIcon from '@mui/icons-material/Home';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import AttributionIcon from '@mui/icons-material/Attribution';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BorderAllOutlined } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { backendServerUrl } from '../config/backendIntegration';

const botaoEstilo = {
  justifyContent: "flex-start",
  textTransform: 'none',
  px: 2,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',

}

const theme = createTheme({
  palette: {
    botaoprimario: {
      main: 'rgb(255, 255, 255)',
      contrastText:"#006bff",
    },
  },
});

const Sidebar = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  return (
    <SwipeableDrawer
      anchor="left"
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#006bff",
          width: 250,
        }
      }}
    >
      <Box sx={{paddingInline: 2, paddingTop: 2, display: "flex", justifyContent: "space-between", bgcolor: "" }}>
        <Typography variant="h4" fontFamily={"'Jersey 15'"} color='white'>Menu</Typography>
        <Button onClick={() => navigate('/profile')} endIcon={<AccountCircleIcon sx={{ color: "white", height: 32, width: 32 }} />} />
      </Box>
      <Box
        component="hr"
        sx={{
          border: 0,
          height: '1px',
          backgroundColor: 'white',
          my: 2, // margem vertical
        }}
      />
      <ThemeProvider theme={theme}>
        <Box sx={{ position: 'relative', height: '100%' }}>
          <List sx={{ display: "grid", gap: 3, px: 2 }}>
            <Button
              variant='outlined'
              color='botaoprimario'
              size='large'
              sx={botaoEstilo}
              onClick={() => navigate('/home')}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>

            <Button
              onClick={() => navigate('/qrcode')}
              variant='outlined'
              color='botaoprimario'
              size='large'
              sx={botaoEstilo}
              BorderAllOutlined
              startIcon={<QrCodeScannerIcon />}
            >
              Ler QR Code
            </Button>

            <Button
              variant='outlined'
              color='botaoprimario'
              size='large'
              sx={botaoEstilo}
              BorderAllOutlined
              onClick={() => navigate('/notas')}
              startIcon={<PlagiarismIcon />}
            >
              Ver Notas
            </Button>

            <Button
              variant='outlined'
              color='botaoprimario'
              size='large'
              sx={botaoEstilo}
              BorderAllOutlined
              onClick={() => navigate('/credits')}
              startIcon={<AttributionIcon />}
            >
              Créditos
            </Button>
          </List>
          
          <Button
            onClick={() => {
              axios.get(backendServerUrl + "/logout", { withCredentials: true });
              navigate('/');
            }}
            color='error'
            size='large'
            variant='contained'
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              textTransform: 'none',
              px: 2,
              width: 100,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
            }}
            startIcon={<ArrowBackIcon />}
            BorderAllOutlined
          >
            
            Sair
          </Button>
        </Box>
      </ThemeProvider>
    </SwipeableDrawer>
  );
};


export default Sidebar
import React, { useState, useRef } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import {
  Box,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TimerWithCircularProgress from '../util/circularprogress';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { backendServerUrl } from '../config/backendIntegration';
import axios from 'axios';

const theme = createTheme({
  palette: {
    botaoprimario: {
      main: 'rgb(255, 255, 255)',
      contrastText: '#006bff',
    },
  },
});

const QrCodeScanner = () => {
  const [data, setData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null); 
  const navigate = useNavigate();

  const handleQrCodeReaded = async (err, result) => {
    if (result?.text) {
      const url = result.text;

      // timerRef.current?.stopTimer(); // para o timer
      setData(url);
      setLoading(true);

      try {
        const response = await axios.post(backendServerUrl + '/purchase', { url }, { withCredentials: true });
        const purchaseData = response.data;
        navigate('/table', { state: { url, purchaseData, classifyItems: true } });
      } catch (error) {
        console.error('Erro ao validar QR Code:', error);
        setData('QR Code inválido ou erro na extração da nota.');
        setOpenModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <BarcodeScanner width={500} height={500} onUpdate={handleQrCodeReaded} />
      )}

      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontFamily: "'Jersey 15'", fontSize: 32, color: 'white' }}>
          {data || 'Buscando...'}
        </p>
        <TimerWithCircularProgress ref={timerRef} onTimeEnd={() => setOpenModal(true)} />
      </Box>

      <Dialog
        PaperProps={{
          sx: {
            backgroundColor: '#006bff',
            color: 'white',
          },
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle sx={{ display: 'flex', gap: 1 }}>
          <p style={{ fontFamily: "'Jersey 15'", fontSize: 32, color: 'white' }}>Tempo Esgotado</p>
          <img src="/caution.png" height={32} width={32} style={{ marginTop: 7 }} />
        </DialogTitle>
        <DialogContent>
          <p style={{ fontFamily: "'Roboto'", color: 'white' }}>
            Não foi possível identificar um QR Code no tempo estimado ou a nota fiscal é inválida.
          </p>
          <br />
          <p style={{ fontFamily: "'Roboto'", color: 'white' }}>Deseja tentar novamente?</p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <ButtonGroup sx={{ gap: 10, mb: 1 }}>
            <ThemeProvider theme={theme}>
              <Button href="/home" variant="outlined" sx={{ width: 100 }} color="botaoprimario">
                Não
              </Button>
              <Button variant="contained" sx={{ width: 100 }} color="botaoprimario" onClick={handleTryAgain}>
                Sim
              </Button>
            </ThemeProvider>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QrCodeScanner;

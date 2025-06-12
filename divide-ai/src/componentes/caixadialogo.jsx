import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    botaoprimario: {
      main: 'rgb(255, 255, 255)',
      contrastText: '#006bff',
    },
  },
});

const CustomDialog = ({
  open,
  onClose,
  title,
  iconSrc,
  content,
  customContent,         // novo: conteúdo JSX opcional
  actions                // agora aceita elementos JSX também
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          backgroundColor: '#006bff',
          color: 'white',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <p style={{ fontFamily: "'Jersey 15'", fontSize: 32, color: "white" }}>{title}</p>
        {iconSrc && <img src={iconSrc} height={32} width={32} alt="icon" style={{ marginTop: 7 }} />}
      </DialogTitle>

      <DialogContent>
        {customContent ? (
          customContent
        ) : (
          content?.split('\n').map((line, idx) => (
            <p key={idx} style={{ fontFamily: "Roboto", color: "white", margin: 0 }}>
              {line}
            </p>
          ))
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <ButtonGroup sx={{ gap: 10, mb: 1 }}>
          <ThemeProvider theme={theme}>
            {actions.map((action, idx) => (
              <React.Fragment key={idx}>{action}</React.Fragment>
            ))}
          </ThemeProvider>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;

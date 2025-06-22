import {
  Button,
  ThemeProvider,
  Container,
  Paper,
  Box,
  TextField,
  createTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { backendServerUrl } from "../config/backendIntegration";

const theme = createTheme({
  palette: {
    botaoprimario: {
      main: "rgb(255, 255, 255)",
      contrastText: "#006bff",
    },
  },
});

const CssTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& input": {
    color: "#fff",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const GoogleRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    await axios.post(
      backendServerUrl + "/google-register",
      { email, username },
      { withCredentials: true }
    );
    navigate("/home");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/login-background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs" sx={{ pb: 12 }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            backgroundColor: "transparent",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <h1
              style={{
                fontFamily: "'Jersey 15'",
                color: "white",
                fontSize: 40,
              }}
            >
              cadastro
            </h1>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              mt: 2,
            }}
          >
            <CssTextField
              label="username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <CssTextField
              inputProps={{ readOnly: true }}
              value={email}
              type="email"
              fullWidth
            />
            <ThemeProvider theme={theme}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="botaoprimario"
                >
                  Cadastrar
                </Button>
              </Box>
            </ThemeProvider>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GoogleRegister;

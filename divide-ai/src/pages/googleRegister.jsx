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
import CustomDialog from "../componentes/caixadialogo";
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
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    title: "",
    content: "",
    iconSrc: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post(
        backendServerUrl + "/google-register",
        { email, username },
        { withCredentials: true }
      );
      navigate("/home");
    } catch (error) {
      setFeedbackDialog({
        open: true,
        title: "Erro ao cadastrar",
        content:
          "Não foi possível completar o cadastro. Por favor, tente novamente.",
        iconSrc: "/caution.png",
      });
    }
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
      <CustomDialog
        open={feedbackDialog.open}
        onClose={() => setFeedbackDialog({ ...feedbackDialog, open: false })}
        title={feedbackDialog.title}
        content={feedbackDialog.content}
        iconSrc={feedbackDialog.iconSrc}
        actions={[
          <Button
            onClick={() =>
              setFeedbackDialog({ ...feedbackDialog, open: false })
            }
            variant="contained"
            sx={{ backgroundColor: "white" }}
          >
            <p style={{ color: "#006bff", fontFamily: "'Roboto'", margin: 0 }}>
              OK
            </p>
          </Button>,
        ]}
      />
    </Box>
  );
};

export default GoogleRegister;

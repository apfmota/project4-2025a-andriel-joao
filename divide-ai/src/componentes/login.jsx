import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomDialog from "./caixadialogo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, ButtonGroup, colors } from "@mui/material";
import { backendServerUrl } from "../config/backendIntegration";
import axios from "axios";

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
    color: "#fff", // texto digitado
  },
  "& label.Mui-focused": {
    color: "white",
    borderBottomColor: "white",
    borderColor: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
    borderColor: "white",
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

const Login = ({ navigate }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [feedbackDialog, setFeedbackDialog] = React.useState({
    open: false,
    title: "",
    content: "",
    iconSrc: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formValues = {
      email: email,
      password: password,
    };

    const { data: response } = await axios.post(
      backendServerUrl + "/login",
      formValues,
      { withCredentials: true }
    );
    if (response.type === "Success") {
      navigate("/home");
    } else {
      setFeedbackDialog({
        open: true,
        title: "Erro",
        content:
          "Falha ao fazer login. Aguarde uns instantes e tente novamente.",
        iconSrc: "/caution.png",
      });
    }

    console.log("logando... 🔍");
    setLoading(false);
  };

  return (
    <Box>
      <header>
        <h1 style={{ fontFamily: "'Jersey 15'", color: "white", fontSize: 40 }}>
          login
        </h1>
      </header>
      <form onSubmit={handleSubmit}>
        <Box id="main" sx={{ display: "grid", gap: 2, mt: 2 }}>
          <CssTextField
            label="insira seu email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <CssTextField
            label="insira sua senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                fullWidth
                color="botaoprimario"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </ThemeProvider>
          </ButtonGroup>
          <Box
            id="other-actions"
            sx={{ alignItems: "center", textAlign: "center", mb: 3 }}
          >
            <p
              style={{
                color: "white",
                fontFamily: "'Jersey 15'",
                fontSize: 20,
              }}
            >
              {" "}
              <a>esqueceu a senha?</a>
            </p>
          </Box>
        </Box>
      </form>
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

export default Login;

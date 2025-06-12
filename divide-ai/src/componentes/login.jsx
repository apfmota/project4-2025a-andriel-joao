import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import GoogleIcon from "@mui/icons-material/Google";
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
      alert(response.message);
    }

    console.log("logando... 🔍");
    setLoading(false);
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    //lidar login etc
    console.log("googlogando... 🔍");
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
              <Button
                onClick={handleGoogleLogin}
                variant="outlined"
                sx={{ borderColor: "white", color: "white" }}
                endIcon={<GoogleIcon sx={{ color: "white" }} />}
              />
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
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import { Box, Button, Slide, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { backendServerUrl } from "../config/backendIntegration";
import CustomDialog from "./caixadialogo";

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

const Cadastro = ({ navigate }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [feedbackDialog, setFeedbackDialog] = React.useState({
    open: false,
    title: "",
    content: "",
    iconSrc: "",
  });

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //lidar cadastro etc
    setLoading(true);
    const { data: response } = await axios.post(
      backendServerUrl + "/register",
      formData
    );
    console.log(response);
    console.log("cadastrando... 🔍");
    if (response.type === "Success") {
      setFeedbackDialog({
        open: true,
        title: "Cadastrado com sucesso!",
        content:
          "Falha ao fazer login. Aguarde uns instantes e tente novamente.",
        iconSrc: "/verified.png",
      });
      window.location.reload();
    } else {
      setFeedbackDialog({
        open: true,
        title: "Falha ao cadastrar",
        content:
          response.message ||
          "Falha ao cadastrar. Aguarde uns instantes e tente novamente.",
        iconSrc: "/caution.png",
      });
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Box>
      <header>
        <h1 style={{ fontFamily: "'Jersey 15'", color: "white", fontSize: 40 }}>
          cadastro
        </h1>
      </header>
      <form onSubmit={handleSubmit}>
        <Box
          id="main"
          sx={{
            position: "relative",
            minHeight: 200,
            overflow: "hidden",
            mt: 2,
          }}
        >
          <TransitionGroup>
            <Slide
              key={step}
              direction={step === 0 ? "right" : "left"}
              in
              mountOnEnter
              unmountOnExit
              timeout={500}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  display: "grid",
                  gap: 2,
                }}
              >
                {step === 0 ? (
                  <>
                    <CssTextField
                      label="username"
                      fullWidth
                      value={formData.username}
                      onChange={handleChange("username")}
                    />
                    <CssTextField
                      label="email"
                      type="email"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange("email")}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="botaoprimario"
                          onClick={handleNext}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Próximo
                        </Button>
                      </ThemeProvider>
                    </Box>
                  </>
                ) : (
                  <>
                    <CssTextField
                      label="senha"
                      type="password"
                      fullWidth
                      value={formData.password}
                      onChange={handleChange("password")}
                    />
                    <CssTextField
                      label="repetir senha"
                      type="password"
                      fullWidth
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                    />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="outlined"
                          color="botaoprimario"
                          onClick={handleBack}
                          startIcon={<ArrowBackIcon />}
                        >
                          Anterior
                        </Button>
                        <Button
                          type="submit"
                          color="botaoprimario"
                          variant="contained"
                          disabled={loading}
                        >
                          {loading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                      </ThemeProvider>
                    </Box>
                  </>
                )}
              </Box>
            </Slide>
          </TransitionGroup>
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

export default Cadastro;

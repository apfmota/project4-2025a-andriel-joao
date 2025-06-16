import React, { useState } from 'react';
import { Box, Container, Button, Paper } from '@mui/material';
import Cadastro from '../componentes/cadastro';
import Login from '../componentes/login';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { backendServerUrl } from '../config/backendIntegration';
const AuthPage = () => {

  const navigate = useNavigate();

  const [etapa, setEtapa] = useState("inicio"); // "inicio" | "login" | "cadastro"
  const [direction, setDirection] = useState("left");

  const handleEscolha = (escolha) => {
    setDirection("left");
    setEtapa(escolha);
  };

  const handleVoltar = () => {
    setDirection("right");
    setEtapa("inicio");
  };

  const renderConteudo = () => {
    if (etapa === "inicio") {
      return (
        <Box
          key="inicio"
          className={direction === "left" ? "fade-slide-left" : "fade-slide-right"}
          sx={{ height: 200 }}
        >
          <h1 style={{ fontFamily: "'Jersey 15'", color: "white", fontSize: 40 }}>divide ai!</h1>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white" }}
            onClick={() => handleEscolha("login")}
          >
            <p style={{ color: "#006bff", fontFamily: "'Roboto'" }}>Login</p>
          </Button>
          <h1
            style={{
              fontFamily: "'Jersey 15'",
              color: "white",
              fontSize: 40,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            ou
          </h1>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderColor: "white", color: "white"}}
            onClick={() => handleEscolha("cadastro")}
          >
            <p style={{ color: "white", fontFamily: "'Roboto'" }}>Cadastrar</p>
          </Button>
          <GoogleLogin
            onSuccess={async credentialResponse => {
              const googleAuthResponse = await axios.post(backendServerUrl + "/google-auth", {
                token: credentialResponse.credential
              }, { withCredentials: true});
              if (googleAuthResponse.data.userExists) {
                navigate("/home");
              } else {
                navigate("/google-register", { state: { email: googleAuthResponse.data.email } })
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </Box>
      );
    }

    return (
      <Box
        key={etapa}
        className={direction === "left" ? "fade-slide-left" : "fade-slide-right"}
      >
        {etapa === "login" ? <Login navigate={navigate} /> : <Cadastro navigate={navigate} />}
        <Button variant="text" sx={{ color: "white" }} onClick={handleVoltar} endIcon={<KeyboardReturnIcon/>}>
          Home
        </Button>
      </Box>
    );
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
      <Container maxWidth="xs" sx={{pb: 12}}>
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
          {renderConteudo()}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;

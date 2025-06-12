import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "../util/sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import axios from "axios";
import { backendServerUrl } from "../config/backendIntegration";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006bff",
      contrastText: "#ffffff",
    },
  },
});

const Profile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [senhaErro, setSenhaErro] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get(backendServerUrl + "/user", { withCredentials: true });
      const data = response?.data || {};
      setUserData({
        username: data.username || "",
        email: data.email || "",
        senha: "",
        confirmarSenha: "",
      });
    } catch (error) {
      console.warn("Erro ao carregar dados. Campos iniciam vazios.");
      setUserData({
        username: "",
        email: "",
        senha: "",
        confirmarSenha: "",
      });
    }
  };

  const handleSaveChanges = async () => {
    if (
      !userData.username ||
      !userData.email ||
      !userData.senha ||
      !userData.confirmarSenha
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (userData.senha !== userData.confirmarSenha) {
      setSenhaErro(true);
      return;
    }

    setSenhaErro(false);
    try {
      await axios.post(backendServerUrl +  "/user", {
        username: userData.username,
        email: userData.email,
        password: userData.senha,
      }, { withCredentials: true });
      alert("Dados atualizados com sucesso!");
      setUserData({ ...userData, senha: "", confirmarSenha: "" });
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert("Erro ao atualizar os dados.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação é irreversível."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/usuario");
      alert("Conta excluída com sucesso!");
      setUserData({
        username: "",
        email: "",
        senha: "",
        confirmarSenha: "",
      });
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppBar position="fixed" sx={{ backgroundColor: "#006bff" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              fontFamily={"'Jersey 15'"}
              fontSize={32}
            >
              configurar perfil
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <Box
          id="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 2,
            width: "100%",
            maxWidth: { xs: "100%", sm: 600 },
            mx: "auto",
            mt: 10,
            pb: 5,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <AccountCircleIcon
              sx={{ color: "#006bff", height: 64, width: 64 }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: "'Jersey 15'",
                  fontSize: 24,
                  color: "#006bff",
                }}
              >
                Nome de usuário
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Digite seu nome de usuário"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: "'Jersey 15'",
                fontSize: 24,
                color: "#006bff",
              }}
            >
              Email
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Digite seu email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: "'Jersey 15'",
                fontSize: 24,
                color: "#006bff",
              }}
            >
              Nova senha
            </Typography>
            <TextField
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Digite sua nova senha"
              value={userData.senha}
              onChange={(e) =>
                setUserData({ ...userData, senha: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: "'Jersey 15'",
                fontSize: 24,
                color: "#006bff",
              }}
            >
              Confirmar nova senha
            </Typography>
            <TextField
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Repita a nova senha"
              error={senhaErro}
              helperText={senhaErro ? "As senhas não coincidem." : ""}
              value={userData.confirmarSenha}
              onChange={(e) =>
                setUserData({ ...userData, confirmarSenha: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Salvar Alterações
            </Button>
            <Button
              startIcon={<PersonRemoveIcon />}
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
            >
              Excluir Conta
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 5 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="primary"
              onClick={() => window.history.back()}
            >
              Voltar
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;

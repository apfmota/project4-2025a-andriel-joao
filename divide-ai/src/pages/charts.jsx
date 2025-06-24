import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Fab,
} from "@mui/material";
import Sidebar from "../util/sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { getPayingItems, getPayingPurchases } from "../util/APIFunctions";
import { backendServerUrl } from "../config/backendIntegration";
import axios from "axios";
const Charts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [payingItems, setPayingItems] = useState([]);
  const [payingPurchases, setPayingPurchases] = useState([]);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const hasData = payingItems.length > 0 || payingPurchases.length > 0;
  const meVeTudoAi = () => {
    getPayingItems().then((items) => {
      setPayingItems(items);
      console.log("estou devendo", items);
    });
    getPayingPurchases().then((purchases) => {
      setPayingPurchases(purchases);
      console.log("estou pagando", purchases);
    });
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendServerUrl + "/user", {
        withCredentials: true,
      });
      const data = response?.data || {};
      setUserData({
        username: data.username || "",
        email: data.email || "",
        senha: "",
        confirmarSenha: "",
      });
    } catch (error) {
      console.warn("Erro ao carregar dados.", error);
      setUserData({
        username: "",
        email: "",
        senha: "",
        confirmarSenha: "",
      });
    }
  };

  const groupItemsByCategory = (items, type = "count", key = "value") => {
    const categoryMap = {};

    items.forEach((item) => {
      const payers = item.payers || [];

      // Só considera o item se o usuário estiver entre os pagadores
      if (!payers.includes(userData.username)) return;

      const rawCategory = item.category || "Sem categoria";
      const normalizedCategory = rawCategory.split(" ")[0];

      if (!categoryMap[normalizedCategory]) {
        categoryMap[normalizedCategory] = 0;
      }

      if (type === "sum") {
        // Soma proporcional ao número de pagadores
        categoryMap[normalizedCategory] += (item[key] || 0) / payers.length;
      } else {
        // Contagem simples, 1 item = 1
        categoryMap[normalizedCategory] += 1;
      }
    });

    return Object.entries(categoryMap).map(([label, value], id) => ({
      id,
      label,
      value: Number(value.toFixed(2)),
    }));
  };
  //quantidade de itens devidos por categoria
  const getPayingItemsCountByCategory = () =>
    groupItemsByCategory(payingItems, "count");

  // total de gastos por categoria
  const getSpendingByItemCategory = () =>
    groupItemsByCategory(payingItems, "sum");

  const getSpendingCountByStore = () => {
    const storeTotals = {};

    payingPurchases.forEach((purchase) => {
      const store = purchase.storeName || "Loja desconhecida";

      purchase.items.forEach((item) => {
        const payers = item.payers || [];

        if (payers.includes(userData.username)) {
          const splitValue = item.value / payers.length;
          storeTotals[store] = (storeTotals[store] || 0) + splitValue;
        }
      });
    });

    return Object.entries(storeTotals).map(([label, value], id) => ({
      id,
      label,
      value: Number(value.toFixed(2)),
    }));
  };

  // listas as quais fui incluido com devedor
  const getItemCountFromPurchases = () => {
    const categoryCounts = {};

    payingPurchases.forEach((purchase) => {
      purchase.items.forEach((item) => {
        let rawCategory = item.category || "Sem categoria";

        const normalizedCategory = rawCategory.split(" ")[0];

        categoryCounts[normalizedCategory] =
          (categoryCounts[normalizedCategory] || 0) + 1;
      });
    });

    return Object.entries(categoryCounts).map(([label, value], id) => ({
      id,
      label,
      value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
      meVeTudoAi();
    };

    fetchData();
  }, []);
  return (
    <>
      <CssBaseline />
      {/* AppBar */}
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
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
              gráficos & estatísticas
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        {/* condição */}
        {hasData ? (
          <>
            <Box
              sx={{
                mt: 8,
                px: { xs: 2, sm: 4, md: 10 },
                width: "100%",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%", // importante
                  whiteSpace: "normal", // permite quebra
                  wordBreak: "break-word", // quebra palavras longas
                  overflowWrap: "break-word", // quebra palavras compostas
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#006bff",
                    fontFamily: "'Jersey 15'",
                    mb: 2,
                  }}
                >
                  Quantidade de itens devidos por categoria
                </Typography>
              </Box>

              <Box sx={{ width: "100%", maxWidth: 350, mx: "auto" }}>
                <PieChart
                  series={[{ data: getPayingItemsCountByCategory() }]}
                  width={300}
                  height={300}
                />
              </Box>

              <Typography
                variant="h4"
                color="#006bff"
                fontFamily="'Jersey 15'"
                mt={2}
                sx={{
                  whiteSpace: "normal",
                }}
              >
                Total itens: {payingItems.length}
              </Typography>
            </Box>

            <Box sx={{ px: { xs: 2, sm: 4, md: 10 }, py: 4, width: "100%" }}>
              <Box
                sx={{
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#006bff",
                    fontFamily: "'Jersey 15'",
                    mb: 2,
                  }}
                >
                  Total de gastos por categoria (itens devidos)
                </Typography>
              </Box>

              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <BarChart
                  layout="horizontal"
                  yAxis={[
                    {
                      scaleType: "band",
                      categoryGapRatio: 0.5,
                      data: getSpendingByItemCategory().map((c) => c.label),
                    },
                  ]}
                  xAxis={[
                    {
                      scaleType: "linear", // eixo numérico
                      tickCount: 6, // define quantidade de ticks no eixo
                    },
                  ]}
                  series={[
                    {
                      data: getSpendingByItemCategory().map((c) => c.value),
                      valueFormatter: (value) =>
                        `${value.toFixed(2).replace(".", ",")} R$`,
                      color: "#006bff",
                    },
                  ]}
                  width={Math.max(getSpendingByItemCategory().length * 60, 400)}
                  height={400}
                  barLabel="value"
                />
              </Box>
              <Box sx={{ width: "100%", overflowX: "auto", mt: 4 }}>
                <Typography
                  variant="h4"
                  color="#006bff"
                  fontFamily={"'Jersey 15'"}
                  mb={2}
                >
                  Gasto por estabelecimento (somente itens devidos)
                </Typography>
                <BarChart
                  layout="horizontal"
                  yAxis={[
                    {
                      scaleType: "band",
                      categoryGapRatio: 0.8,
                      data: getSpendingCountByStore().map((c) => c.label),
                    },
                  ]}
                  xAxis={[
                    {
                      scaleType: "linear",
                      tickFormat: (value) => value.toFixed(2).replace(".", ","),
                    },
                  ]}
                  series={[
                    {
                      data: getSpendingCountByStore().map((c) => c.value),
                      valueFormatter: (value) =>
                        `${value.toFixed(2).replace(".", ",")} R$`,
                      color: "#0099ff",
                    },
                  ]}
                  width={Math.max(getSpendingCountByStore().length * 80, 400)}
                  height={Math.max(getSpendingCountByStore().length * 80, 300)}
                  barLabel="value"
                />
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              mt: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#666",
            }}
          >
            <Typography
              variant="h6"
              fontSize={32}
              fontFamily={"'Jersey 15'"}
              color="#006bff"
            >
              Nada aqui ainda...
            </Typography>
            <Typography
              variant="body2"
              fontSize={20}
              fontFamily={"'Jersey 15'"}
              color="#006bff"
            >
              Adicione uma Nota Fiscal!
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Charts;

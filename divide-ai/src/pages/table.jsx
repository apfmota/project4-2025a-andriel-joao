import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

import Sidebar from "../util/sidebar";
import NFCDataGrid from "../componentes/nfcgrid";
import PeopleInputDialog from "../componentes/dialogs/peopleinputdialog";
import CustomDialog from "../componentes/caixadialogo";
import { backendServerUrl } from "../config/backendIntegration";

const Table = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    title: "",
    content: "",
    iconSrc: null,
  });

  const { purchaseData, classifyItems } = location.state || {};

  const handleDialogClose = () => {
    // Não fecha sem submissão
  };

  const handleDialogSubmit = async (peopleNames) => {
    setPeople(peopleNames);
    setDialogOpen(false);

    if (!purchaseData?.purchaseId) {
      setFeedbackDialog({
        open: true,
        title: "Erro",
        content: "ID da compra não encontrado.",
        iconSrc: "/caution.png", 
      });
      return;
    }

    try {
      await axios.put(backendServerUrl + "/purchase", {
        id: purchaseData.purchaseId,
        payers: peopleNames,
      }, { withCredentials: true });

      const itemsData = await axios.get(backendServerUrl + "/purchase?id=" + purchaseData.purchaseId, { withCredentials: true }) 
      setItems(itemsData.data.items);
      console.log(itemsData.data.items);

      setFeedbackDialog({
        open: true,
        title: "Sucesso",
        content: "Pagadores registrados com sucesso!",
        iconSrc: "/verified.png",
      });
    } catch (error) {
      console.error(error);
      setFeedbackDialog({
        open: true,
        title: "Erro",
        content: "Falha ao registrar pagadores.",
        iconSrc: "/caution.png",
      });
    }
  };

  return (
    <Box>
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
            tabela
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <PeopleInputDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />

      <Box sx={{ mt: 10, px: 2}}>
        {purchaseData != null && Array.isArray(people) && people.length > 0  && items.length > 0 ? (
          <NFCDataGrid
            data={items}
            totalValue={purchaseData.nfcData.totalValue}
            numPeople={people.length}
            peopleNames={people}
            classifyItems={classifyItems}
          />
        ) : (
          <Box
            sx={{
              mt: 50,
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
              Nenhum dado carregado.
            </Typography>
          </Box>
        )}
      </Box>

      <CustomDialog
        open={feedbackDialog.open}
        onClose={() => setFeedbackDialog({ ...feedbackDialog, open: false })}
        title={feedbackDialog.title}
        content={feedbackDialog.content}
        iconSrc={feedbackDialog.iconSrc}
        actions={[
          <Button onClick={() => setFeedbackDialog({ ...feedbackDialog, open: false })} variant="contained" sx={{ backgroundColor: "white" }}>
            <p style={{ color: "#006bff", fontFamily: "'Roboto'", margin: 0 }}>OK</p>
          </Button>
        ]}
      />
    </Box>
  );
};

export default Table;

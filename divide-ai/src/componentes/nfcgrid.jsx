import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DropdownCheckboxes from "../util/menudropdown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { backendServerUrl } from "../config/backendIntegration";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getItemsClasses from "../AI/itemClassifier";
import CustomDialog from "../componentes/caixadialogo";

const paragraph_style = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 19,
  color: "#006bff",
};

const getInitialClasses = (items) => {
  const initialClasses = {};
  items.forEach((item) => {
    initialClasses[String(item.id)] = item.category;
  });
  return initialClasses;
};

const NFCDataGrid = ({
  data,
  totalValue,
  numPeople,
  peopleNames,
  classifyItems = false,
}) => {
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    title: "",
    content: "",
    iconSrc: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const updateItems = async (items, selected) => {
    setIsSaving(true);
    try {
      let row = 0;
      for (let item of items) {
        const selectedPeople = [];
        for (let i = 0; i < selected.length; i++) {
          if (selected[row][i]) {
            selectedPeople.push(peopleNames[i]);
          }
        }
        await axios.put(
          backendServerUrl + "/item",
          {
            id: item.id,
            payers: selectedPeople,
          },
          { withCredentials: true }
        );
        row++;
      }
      setFeedbackDialog({
        open: true,
        title: "Sucesso",
        content: "Lista salva com sucesso!",
        iconSrc: "/verified.png",
      });
    } catch (error) {
      console.error(error);
      setFeedbackDialog({
        open: true,
        title: "Erro",
        content: "Falha ao salvar lista.",
        iconSrc: "/caution.png",
      });
    } finally {
      setIsSaving(false); // fim do loading
    }
  };

  const [selected, setSelected] = useState(
    data.map((item) =>
      peopleNames.map((person) => item.payers.includes(person))
    )
  );
  const [items, setItems] = useState(data);
  const [allChecked, setAllChecked] = useState(
    data.map((item) => item.payers.length === peopleNames.length)
  );
  const [itemClasses, setItemClasses] = useState(getInitialClasses(data));

  const handleCheckboxChange = (rowIndex, personIndex) => {
    const newSelected = [...selected];
    newSelected[rowIndex][personIndex] = !newSelected[rowIndex][personIndex];
    setSelected(newSelected);
  };

  const handleAllChange = (rowIndex) => {
    const newAllChecked = [...allChecked];
    newAllChecked[rowIndex] = !newAllChecked[rowIndex];
    setAllChecked(newAllChecked);

    const newSelected = [...selected];
    // Atualizar todos os checkboxes da linha quando "Todos" for clicado
    newSelected[rowIndex] = newSelected[rowIndex].map(
      () => newAllChecked[rowIndex]
    );
    setSelected(newSelected);
  };

  const calculateTotals = () => {
    const totals = peopleNames.map(() => 0);

    items.forEach((item, index) => {
      const itemTotal = item.value;
      // Verificar se há pessoas selecionadas
      const checkedPeople = [];
      for (let i = 0; i < peopleNames.length; i++) {
        if (selected[index][i]) {
          checkedPeople.push(i);
        }
      }

      // Se não houver pessoas selecionadas, ignore este item
      if (checkedPeople.length === 0) {
        return;
      }
      // Dividir o valor total igualmente entre as pessoas selecionadas
      const share = itemTotal / checkedPeople.length;
      // Atualizar o total para cada pessoa
      checkedPeople.forEach((personIndex) => {
        totals[personIndex] += share;
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  useEffect(() => {
    const effect = async () => {
      if (classifyItems) {
        let newItemsClasses = {};
        const obtainedClasses = await getItemsClasses(
          items.map((item) => ({ id: item.id, name: item.name }))
        );
        for (const itemClass of obtainedClasses) {
          axios.post(
            backendServerUrl + "/item-category",
            {
              itemId: itemClass.id,
              category: itemClass.category,
            },
            { withCredentials: true }
          );
          newItemsClasses[String(itemClass.id)] = itemClass.category;
        }
        setItemClasses(newItemsClasses);
      }
    };
    effect();
  }, []);

  const displayCategory = (item) => {
    return (
      <Paper
        sx={{
          padding: "5px",
          backgroundColor: "#64adec",
          borderRadius: "5px",
          color: "#005eb0",
        }}
      >
        {itemClasses[String(item.id)] != undefined ? (
          <span>{itemClasses[String(item.id)]}</span>
        ) : (
          <span style={{ color: "red" }}>Aguardando classificação...</span>
        )}
      </Paper>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      <List
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          paddingBottom: "200px",
        }}
      >
        {data.map((item, index) => (
          <ListItem key={index}>
            <Accordion
              sx={{
                width: 400,
                backgroundColor: selected[index].some(Boolean)
                  ? "#0045A4"
                  : "#006bff",
                transition: "background-color 0.3s ease",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <strong style={{ fontFamily: "'Roboto'", color: "white" }}>
                  {item.name}
                  {displayCategory(item)}
                </strong>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
                <Stack direction="column" spacing={2} alignItems="center">
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", mr: 4 }}>
                      <p style={paragraph_style}>
                        Preço Un/Kg: <strong>{item.value} R$</strong>
                      </p>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <p style={paragraph_style}>
                        Quantidade: <strong>{item.quantity}</strong>
                      </p>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", mr: 5 }}>
                      <Checkbox
                        sx={{
                          color: "#006bff",
                          "&.Mui-checked": {
                            color: "#006bff",
                          },
                        }}
                        checked={allChecked[index] || false}
                        onChange={() => handleAllChange(index)}
                      />
                      <Box sx={{ mt: 1.3 }}>
                        <p style={paragraph_style}>Todos pagam</p>
                      </Box>
                    </Box>
                    <DropdownCheckboxes
                      rowIndex={index}
                      selected={selected}
                      onChange={handleCheckboxChange}
                      peopleNames={peopleNames}
                    />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>

      {/* Accordion fixo fora da lista */}
      <Box
        sx={{
          position: "fixed",
          bottom: "env(safe-area-inset-bottom)",
          left: 0,
          right: 0,
          zIndex: 1300,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box sx={{ width: 400, pointerEvents: "auto" }}>
          <Accordion
            sx={{
              backgroundColor: "#006bff",
              transition: "background-color 0.3s ease",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <p
                style={{
                  fontFamily: "'Jersey 15'",
                  fontSize: 30,
                  color: "white",
                }}
              >
                divisao final
              </p>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
              <div>
                <p style={paragraph_style}>
                  <strong>VALOR TOTAL GASTO: R$ {totalValue}</strong>
                </p>
                <p style={paragraph_style}>
                  <strong>NÚMERO DE PESSOAS: {numPeople}</strong>
                </p>
                {totals.map((total, index) => (
                  <p style={paragraph_style} key={index}>
                    <strong>
                      {peopleNames[index]} DEVE: R$ {total.toFixed(2)}
                    </strong>
                  </p>
                ))}
              </div>
              <div style={{ textAlign: "end" }}>
                <Button
                  startIcon={<SaveIcon />}
                  size="medium"
                  variant="contained"
                  disabled={isSaving}
                  sx={{
                    textTransform: "none",
                    color: "white",
                    backgroundColor: isSaving ? "#9e9e9e" : "#006bff",
                  }}
                  onClick={() => updateItems(items, selected)}
                >
                  {isSaving ? "SALVANDO..." : "SALVAR LISTA"}{" "}
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

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

export default NFCDataGrid;

import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const paragraph_style = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 19,
  color: "#006bff",
};

const NFCDataGrid = ({ data, totalValue, numPeople, peopleNames }) => {
  const updateItems = (items, selected) => {
    let row = 0;
    for (let item of items) {
      const selectedPeople = [];
      for (let i = 0; i < selected.length; i++) {
        if (selected[row][i]) {
          selectedPeople.push(peopleNames[i]);
        }
      }
      axios.put(
        backendServerUrl + "/item",
        {
          id: item.id,
          payers: selectedPeople,
        },
        { withCredentials: true }
      );
      row++;
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

  return (
    <div>
      <List sx={{ maxHeight: "100vh", overflowY: "auto" }}>
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
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "white"}}/> } >
                <strong style={{ fontFamily: "'Roboto'", color: "white" }}>
                  {item.name}
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
        <ListItem
          sx={{ position: "sticky", bottom: 70, backgroundColor: "#006bff" }}
        >
          <Accordion
            sx={{
              width: 400,
              backgroundColor: "#006bff",
              transition: "background-color 0.3s ease",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}>
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
                <div style={{ marginBottom: 10 }}>
                  <p style={paragraph_style}>
                    <strong>VALOR TOTAL GASTO: R$ {totalValue}</strong>
                  </p>
                </div>
                <div style={{ marginBottom: 10, display: "column", gap: 10 }}>
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
              </div>
              <div style={{textAlign: "end"}}>
                <Button startIcon={<SaveIcon />} size="medium" variant="contained" sx={{ textTransform: "none", color: "white", backgroundColor: "#006bff" }} onClick={() => updateItems(items, selected)}>
                  SALVAR ITEM
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      </List>
    </div>
  );
};
export default NFCDataGrid;

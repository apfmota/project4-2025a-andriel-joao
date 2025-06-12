// components/TotalsAccordion.js
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const TotalsAccordion = ({ totalValue, numPeople, totals, peopleNames }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "#0045A4",
      }}
    >
      <Accordion
        sx={{
          backgroundColor: "#0045A4",
          color: "white",
        }}
      >
        <AccordionSummary expandIcon={<ExpandLessIcon sx={{ color: "white" }} />}>
          <Typography sx={{ fontWeight: "bold", fontFamily: "Roboto" }}>
            Ver totais dos devedores
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "#0045A4" }}>
          <p>Valor total: R$ {totalValue.toFixed(2)}</p>
          <p>Número de Pessoas: {numPeople}</p>
          {totals.map((total, index) => (
            <p key={index}>
              {peopleNames[index]} deve: R$ {total.toFixed(2)}
            </p>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TotalsAccordion;

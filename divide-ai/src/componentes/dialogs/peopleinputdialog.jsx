import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { getAvaibleUsers } from "../../util/APIFunctions";
const PeopleInputDialog = ({ open, onClose, onSubmit }) => {
  const [names, setNames] = useState("");
  const [nameList, setNameList] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]); // lista do backend
  const [invalidNames, setInvalidNames] = useState([]); // nomes inválidos
  // Regex: aceita somente se começa e termina com letra ou número
  const startsAndEndsWithAlphaNum =
    /^[a-zA-Z0-9áàâãéèêíïóôõöúçÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ].*[a-zA-Z0-9áàâãéèêíïóôõöúçÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ]$/;

  useEffect(() => {
    if (open) {
      getAvaibleUsers()
        .then(setAvailableUsers)
        .catch(() => setAvailableUsers([]));
    }
  }, [open]);

  useEffect(() => {
    const cleanedInput = names.trim();
    const list = cleanedInput
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    setNameList(list);

    const invalid = list.filter((name) => !availableUsers.includes(name));
    setInvalidNames(invalid);
  }, [names, availableUsers]);

  const handleConfirm = () => {
    const cleanedInput = names.trim();

    if (!startsAndEndsWithAlphaNum.test(cleanedInput)) {
      alert("A lista de nomes deve começar e terminar com letra ou número.");
      return;
    }

    if (nameList.length === 0) {
      alert("Por favor, insira pelo menos um nome válido.");
      return;
    }

    if (invalidNames.length > 0) {
      alert(
        "Os seguintes nomes não existem no sistema: " + invalidNames.join(", ")
      );
      return;
    }

    onSubmit(nameList);
    setNames("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#006bff",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: "'Jersey 15'", fontSize: 28 }}>
        Informações dos Devedores
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Insira os nomes (separados por vírgula)"
            fullWidth
            value={names}
            multiline
            rows={4}
            onChange={(e) => setNames(e.target.value)}
            error={invalidNames.length > 0}
            helperText={
              invalidNames.length > 0
                ? `Nomes inválidos: ${invalidNames.join(", ")}`
                : "Separe os nomes por vírgula. Ex: João, Maria, Ana"
            }
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              color: "white",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-error fieldset": { borderColor: "#ff5252" }, // borda vermelha em erro
              },
              "& .MuiFormHelperText-root": {
                color: invalidNames.length > 0 ? "#ffb3b3" : "white",
                fontStyle: invalidNames.length > 0 ? "normal" : "italic",
              },
            }}
            placeholder="Ex: João, Maria, Ana"
          />

          {/* Contador de nomes */}
          <Typography
            variant="body2"
            sx={{ color: "white", fontStyle: "italic", mt: -1 }}
          >
            {nameList.length} {nameList.length === 1 ? "pessoa" : "pessoas"}{" "}
            listada{nameList.length !== 1 ? "s" : ""}.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-around", mb: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          href="/home"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{ backgroundColor: "white" }}
        >
          <p style={{ color: "#006bff", fontFamily: "'Roboto'", margin: 0 }}>
            Confirmar
          </p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PeopleInputDialog;

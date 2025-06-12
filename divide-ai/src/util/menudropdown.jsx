import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const getRandomColor = () => { //meramente estetico, pega uma cor numa lista de cores
  const colors = ["#ff4081", "#00e676", "#ffd600", "#7c4dff", "#ff6d00"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const DropdownCheckboxes = ({ rowIndex, selected, onChange, peopleNames }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //garante que cada pessoa tenha uma cor fixa
  const [checkboxColors] = useState(
    peopleNames.map(() => getRandomColor())
  );

  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleClick}
        sx={{ textTransform: "none", color: "#006bff" }}
        startIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        <p style={{ fontFamily: "'Roboto'" }}>Devedores</p>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 300,
            width: 180,
            bgcolor: "#006bff",
            color: "white",
          },
        }}
      >
        {peopleNames.map((name, indexCheck) => (
          <MenuItem key={indexCheck} dense disableRipple>
            <Checkbox
              sx={{
                color: checkboxColors[indexCheck],
                "&.Mui-checked": {
                  color: checkboxColors[indexCheck],
                },
              }}
              checked={selected[rowIndex][indexCheck]}
              onChange={() => onChange(rowIndex, indexCheck)}
            />
            <p style={{fontFamily: "'Roboto'", fontSize: 15, color: "white"}}>{name}</p>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownCheckboxes;

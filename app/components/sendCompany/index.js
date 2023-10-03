"use client"
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SendCompany(){
    const [stringInput, setStringInput] = useState("");
    const [numberInput, setNumberInput] = useState(0);

    

  const handleSubmit = () => {
    console.log("String Input:", stringInput);
    console.log("Number Input:", numberInput);
  };


    return(
        <>
        <TextField
        label="Texto"
        variant="outlined"
        fullWidth
        value={stringInput}
        onChange={(e) => setStringInput(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Limite"
        variant="outlined"
        fullWidth
        type="number"
        value={numberInput}
        onChange={(e) => setNumberInput(e.target.value)}
        inputProps={{ min: 0 }}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Criar empresa
      </Button>
      </>
    )
}
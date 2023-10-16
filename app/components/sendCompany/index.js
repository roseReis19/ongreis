"use client"
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SendCompany({setCompany, company}){
    const [stringInput, setStringInput] = useState("");
    const [numberInput, setNumberInput] = useState(0);

    

  const handleSubmit = async () => {
    console.log("String Input:", stringInput);
    console.log("Number Input:", numberInput);

    if(numberInput === 0){
      setNumberInput(null)
    }

    if(stringInput === ''){
      return
    }

    try {
      const response = await fetch(`/api/empresa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name : stringInput,
          limit: Number(numberInput)
        }) 
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json(); 
      console.log('POST request succeeded:', responseData);

      setCompany([...company, responseData])
      setNumberInput('0')
      setStringInput('')

    } catch (error) {
      console.log(error)
    }
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
"use client"
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { NotificationManager } from "react-notifications";
import exportFromJSON from 'export-from-json'


export default function Dados() {

  const [company, setCompany] = useState('')

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };


  async function getData(){
    try {
      const response = await fetch(
        "http://localhost:3000/api/dados",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
          }
        }
      );

      if (!response.ok) {
        NotificationManager.error('error message', 'Dado nao obtenido');
        throw new Error('Network response was not ok');
      }
      const dados = await response.json()
      const fileName = 'download'
      const exportType =  exportFromJSON.types.csv
      const send = dados.results
      exportFromJSON({ send, fileName, exportType })
      NotificationManager.success('success message', 'Dados obtenidos');
    } catch (error) {
      console.log(error)
      NotificationManager.error('error message', 'Dado nao obtenido');
    }
  }

  async function getDataCompany(){
    try {
      const response = await fetch(
        "http://localhost:3000/api/dados/company",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            company: company
          }) 
        }
      );

      if (!response.ok) {
        NotificationManager.error('error message', 'Dado nao obtenido');
        throw new Error('Network response was not ok');
      }
      const dados = await response.json()
      const fileName = 'download'
      const exportType =  exportFromJSON.types.csv
      const send = dados.results
      exportFromJSON({ send, fileName, exportType })
      NotificationManager.success('success message', 'Dados obtenidos');
    } catch (error) {
      console.log(error)
      NotificationManager.error('error message', 'Dado nao obtenido');
    }
  }


  return (
    <Container style={{ marginTop: "100px", cursor: "pointer" }}>
      <Typography style={{ marginBottom: 20 }}>Baixar Dados</Typography>
      <Button variant="outlined" onClick={getData}>Baixar</Button>

      <Divider style={{ margin: "20px 0" }} />

      <TextField
        id="outlined-basic"
        label="Digite empresa"
        variant="outlined"
        fullWidth
        name="company"
        value={company}
        onChange={handleCompanyChange}
      />
      <Button
        variant="outlined"
        style={{ marginTop: "20px" }}
        fullWidth
        onClick={getDataCompany}
      >
        Dados de empresa
      </Button>
    </Container>
  );
}

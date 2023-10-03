import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

export default function Dados() {
  return (
    <Container style={{ marginTop: "100px", cursor: "pointer" }}>
      <Typography style={{ marginBottom: 20 }}>Baixar Dados</Typography>
      <Button variant="outlined">Baixar</Button>

      <Divider style={{ margin: "20px 0" }} />

      <TextField
        id="outlined-basic"
        label="Digite empresa"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="outlined"
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Dados de empresa
      </Button>
    </Container>
  );
}

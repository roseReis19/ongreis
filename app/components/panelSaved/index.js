"use client"
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PanelSaved() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedAction, setSelectedAction] = useState(""); // "delete" o "edit"

  const handleActionClick = (id, name, action) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedAction(action);
    setOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedAction === "delete") {
      // Lógica para eliminar el cuestionario con el ID selectedId
      console.log(`Eliminando cuestionario con ID ${selectedId}`);
    } else if (selectedAction === "edit") {
      // Lógica para editar el cuestionario con el ID selectedId
      console.log(`Editando cuestionario con ID ${selectedId}`);
    }

    // Cerrar el diálogo de confirmación
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedId(null);
    setSelectedName("");
    setSelectedAction("");
    setOpen(false);
  };

  // Ejemplo de datos de cuestionarios
  const questionnaires = [
    { id: 1, name: "Cuestionario 1" },
    { id: 2, name: "Cuestionario 2" },
    { id: 3, name: "Cuestionario 3" },
    { id: 4, name: "Cuestionario 4" },
    // Agrega más cuestionarios según sea necesario
  ];

  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        {questionnaires.map((questionnaire) => (
          <Grid item xs={12} sm={6} md={4} key={questionnaire.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {questionnaire.name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleActionClick(questionnaire.id, questionnaire.name, "delete")}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleActionClick(questionnaire.id, questionnaire.name, "edit")}
                >
                  Editar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas {selectedAction === "delete" ? "eliminar" : "editar"} el cuestionario "{selectedName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmAction} color={selectedAction === "delete" ? "error" : "primary"}>
            {selectedAction === "delete" ? "Eliminar" : "Editar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

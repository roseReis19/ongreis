"use client"
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

export default function PanelSaved() {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedAction, setSelectedAction] = useState(""); 
  const [questionnaires, setQuestionnaires] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const storedQuestionnaires = JSON.parse(localStorage.getItem("questionnaires")) || [];
    setQuestionnaires(storedQuestionnaires);
  }, []);

  const handleActionClick = (name, action) => {
    setSelectedName(name);
    setSelectedAction(action);
    setOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedAction === "delete") {
      const newValues = questionnaires.filter(e => e.name !== selectedName)
      localStorage.setItem('questionnaires', JSON.stringify(newValues));
      setQuestionnaires(newValues)
      console.log(`Eliminando cuestionario con ID ${selectedName}`);
    } else if (selectedAction === "edit") {
      router.push("/panel/guardados/"+ selectedName)
      console.log(`Editando cuestionario con ID ${selectedName}`);
    }

    // Cerrar el diálogo de confirmación
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedName("");
    setSelectedAction("");
    setOpen(false);
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        {questionnaires.map((questionnaire) => (
          <Grid item xs={12} sm={6} md={4} key={questionnaire.name}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {questionnaire.name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleActionClick(questionnaire.name, "delete")}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleActionClick(questionnaire.name, "edit")}
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

"use client";
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
import { NotificationManager } from "react-notifications";

export default function PanelHome() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await fetch(`/api/cuestionario`);

        const data = await response.json();
        setData(data);
        setLoading(true);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    apiRequest();
  }, []);

  const handleDeleteClick = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoadingDelete(true)
      const response = await fetch(`/api/cuestionario/${selectedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        NotificationManager.error("error message", "Dados não excluídos");
        throw new Error("Network response was not ok");
      }

      const newData = data.filter((item) => item.id !== selectedId);
      setData(newData);
      NotificationManager.success("Success message", "Dados excluídos");
      setLoadingDelete(false)
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setOpen(false);
  };

  const handleClose = () => {
    setSelectedId(null);
    setSelectedName("");
    setOpen(false);
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      {loading && data.length >= 1 ? (
        <Grid container spacing={2}>
          {data.map((questionnaire) => (
            <Grid item xs={12} sm={6} md={4} key={questionnaire.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {questionnaire.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleDeleteClick(questionnaire.id, questionnaire.name)
                    }
                  >
                    Apagar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" component="div">
          Não tem dados
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Tem certeza de que deseja excluir o questionário {selectedName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={loadingDelete}>
            {!loadingDelete?"Apagar":"Apagando..."}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

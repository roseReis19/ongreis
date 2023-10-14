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
import {NotificationManager} from 'react-notifications';

export default function PanelHome() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const apiRequest = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cuestionario');
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setData(data);
        setLoading(true)
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    apiRequest()
    
  }, [])

  const handleDeleteClick = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setOpen(true);
  };

  const handleConfirmDelete = async() => {
      try {
        const response = await fetch('http://localhost:3000/api/cuestionario/' + selectedId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', 
          },
        }        
        );
    
        if (!response.ok) {
          NotificationManager.error('error message', 'Dada nao apagado');
          throw new Error('Network response was not ok');
        }

        const newData = data.filter(item => item.id !== selectedId);
        setData(newData)
        NotificationManager.success('Success message', 'Dado apagado');
        
      } catch (error) {
        console.error('Fetch error:', error);
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
     {loading&& <Grid container spacing={2}>
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
                  onClick={() => handleDeleteClick(questionnaire.id, questionnaire.name)}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el cuestionario "{selectedName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import SendCompany from "../sendCompany";
import {NotificationManager} from 'react-notifications';
import { Button } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


export default function TableAdmin() {
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); 

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/empresa`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteData(id)
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDeleteData(null)
  };

  const deleteCompany = async () => {
    try{
    const response = await fetch(`/api/empresa/${deleteData}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      }
    });

    if (!response.ok) {
      NotificationManager.error('error message', 'Dados não excluídos');
      throw new Error('Network response was not ok'); 
    }

    const responseData = await response.json(); 
    NotificationManager.success('Success message', 'Dados excluídos');
    const newData = data.filter(e => e.id !== deleteData)
    setData(newData)
  } catch (error) {
    console.error('POST request error:', error);
    }
  }

  const handleCopyClick = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        NotificationManager.success('Success message', 'Senha copiada');
      })
      .catch((error) => {
        console.error('Error ao copiar no portapapel', error);
      });
  };

  return (
    <>
      {loading ? (
        <Typography>Não tem datos</Typography>
      ) : (
        <TableContainer component={Paper} style={{width: '100%', maxHeight: 200}}>
          <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Empresa/Usuarios</TableCell>
                <TableCell>Limite</TableCell>
                <TableCell>Usuarios</TableCell>
                <TableCell>Senha</TableCell>
                <TableCell align="right">Apagar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.limit}</TableCell>
                  <TableCell>{row.users}</TableCell>
                  <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ContentPasteIcon />}
                    onClick={() =>handleCopyClick(row.id)}
                  >
                    Copiar
                  </Button>
                    
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      disabled={row.name === "admin"}
                      onClick={() => openDeleteConfirmation(row.id)}
                    >
                      Apagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Divider style={{ margin: "20px 0" }} />
      <SendCompany setCompany={setData} company={data}/>

      {deleteConfirmationOpen && (
        <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza de que deseja excluir esta empresa?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteConfirmation} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                deleteCompany();
                closeDeleteConfirmation();
              }}
              color="secondary"
            >
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
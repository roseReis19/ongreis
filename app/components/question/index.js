"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import useCuestionario from "@/app/hooks/useQuestionario";
import { useState } from "react";

export default function QuestionarioForm({ data }) {
  const cuestionarioData = data;
  const [opcoe, setOpcoe] = useState({});
  const [
    retrocederPregunta,
    avanzarPregunta,
    preguntaActual,
    handleSeleccionarOpcion,
    loading
  ] = useCuestionario(cuestionarioData);

  return (
    <>
    {!loading &&<Box sx={{ height: "100vh" }}>
      <SentimentSatisfiedAltIcon style={{ fontSize: 55, marginBottom: 15 }} />
      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {preguntaActual.enunciado}
          </Typography>
          {preguntaActual.item !== "" && preguntaActual.item !== null && (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ marginTop: 20 }}
            >
              {"- " + preguntaActual.item}
            </Typography>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 25,
            }}
          >
            {preguntaActual.opcoes.map((e) => {
              return (
                <Button
                  variant={e.texto === opcoe.texto ? "contained" : "outlined"}
                  style={{ width: 240, marginBottom: 10 }}
                  key={e.id}
                  onClick={() =>
                    setOpcoe({
                      id: preguntaActual.id,
                      pontuacao: e.pontuacao,
                      texto: e.texto,
                    })
                  }
                >
                  {e.texto}
                </Button>
              );
            })}
          </div>
          <Divider style={{ marginTop: 10 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 15,
            }}
          >
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                console.log("here")
                retrocederPregunta(opcoe);
                setOpcoe({});
              }}
    
            >
              Anterior
            </Button>
            {/*<Button color="success" variant="contained">
                Guardar
            </Button>*/}
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                avanzarPregunta();
                handleSeleccionarOpcion(opcoe);
                setOpcoe({});
              }}
              disabled={Object.keys(opcoe).length === 0}
            >
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>}
    </>
  );
}

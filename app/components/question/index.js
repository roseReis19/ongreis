"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import useCuestionario from "@/app/hooks/useQuestionario";
import { useState } from "react";

export default function QuestionarioForm({ data, prueba = false }) {
  const cuestionarioData = data;
  const [opcoe, setOpcoe] = useState({});
  const [disableBottom, setdisableBottom] = useState(false);
  const [
    retrocederPregunta,
    avanzarPregunta,
    preguntaActual,
    handleSeleccionarOpcion,
    loading
  ] = useCuestionario(cuestionarioData, prueba, setdisableBottom)

  console.log(cuestionarioData)
  const progreso = 20

  return (
    <>
    {!loading &&<Box sx={{ height: "100vh" }}>
    <LinearProgress variant="determinate" value={progreso} sx={{ marginTop: 10 }} />
      <SentimentSatisfiedAltIcon style={{ fontSize: 55, marginBottom: 15 }} />
      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {preguntaActual.statement}
          </Typography>
          {preguntaActual.item !== "" && preguntaActual.item !== null && preguntaActual.item !== undefined &&(
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
            {preguntaActual.options.map((e) => {
              return (
                <Button
                  variant={e.text === opcoe.text ? "contained" : "outlined"}
                  style={{ width: 240, marginBottom: 10 }}
                  key={e.text}
                  onClick={() =>
                    setOpcoe({
                      id: preguntaActual.id,
                      score: e.score,
                      text: e.text,
                    })
                  }
                >
                  {e.text}
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
                retrocederPregunta(opcoe);
                setOpcoe({});
              }}
              disabled={disableBottom}
            >
              Anterior
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                avanzarPregunta();
                handleSeleccionarOpcion(opcoe);
                setOpcoe({});
              }}
              disabled={Object.keys(opcoe).length === 0 || disableBottom}
            >
             {!disableBottom? 'Próximo': 'Mandando Dados'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>}
    </>
  );
}

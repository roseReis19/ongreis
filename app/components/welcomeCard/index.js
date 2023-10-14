"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";

function WelcomeCard() {
  const [puntuacion, setPuntuacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storedPuntuacion = localStorage.getItem("Prueba_results");
    setPuntuacion(JSON.parse(storedPuntuacion));
    setLoading(true);
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const buttonStyle = {
    marginTop: "16px",
    width: "100%",
  };

  const cardStyle = {
    backgroundColor: "rgba(246, 244, 242, 0.6)",
    width: 500,
  };

  return (
    <Container maxWidth="xs" style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h4">Bemvidos</Typography>
          <Typography variant="h6" color="secundary">
            Nosso aplicativo pode medir seus níveis de felicidade, experimente o
            botão abaixo
          </Typography>
          {loading && (
            <Button variant="contained" color="primary" style={buttonStyle}
              onClick={() => {
                if(puntuacion !== null){
                 router.push("/login")
                }else{
                  router.push("/experimente")
                }
              }}
            >
              {puntuacion !== null
                ? "Ingressa a nossa plataforma"
                : "Experimente"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default WelcomeCard;
